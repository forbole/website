import { makeSignDoc } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import type { EncodeObject, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Registry, makeAuthInfoBytes } from "@cosmjs/proto-signing";
import type { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import {
  AminoTypes,
  QueryClient,
  createDefaultAminoConverters,
  defaultRegistryTypes,
  setupTxExtension,
} from "@cosmjs/stargate";
import { connectComet } from "@cosmjs/tendermint-rpc";
import { EthermintChainIdHelper } from "@keplr-wallet/cosmos";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import { ExtensionOptionsWeb3Tx } from "@keplr-wallet/proto-types/ethermint/types/v1/web3";
import type {
  BroadcastMode,
  StdSignDoc,
  StdSignature,
} from "@keplr-wallet/types";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { TxBody, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import type { Account } from "../../core";
import { StakingNetworkId, WalletId } from "../../core/base";

type PollTxOpts = {
  rpc: string;
  timeout?: number;
  txHash: string;
};

const pollTx = async ({ rpc, timeout, txHash }: PollTxOpts) => {
  const tmClient = await connectComet(rpc);

  const queryClient = QueryClient.withExtensions(tmClient, setupTxExtension);

  let elapsed = 0;

  while (true) {
    try {
      const tx = await queryClient.tx.getTx(txHash);

      return tx;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("debug: cosmos.ts: err", err);
    }

    const toWait = 5000;

    elapsed += toWait;

    if (timeout && elapsed >= timeout) {
      throw new Error("Timeout");
    }

    await new Promise((resolve) => setTimeout(resolve, toWait));
  }
};

// This is extracted from the Keplr wallet, from
// `packages/stores/src/account/utils.ts`
const getEIP712DataStructure = (
  signDoc: StdSignDoc,
  networkId: StakingNetworkId,
) => {
  const messages = signDoc.msgs;

  const messagesStructure = messages
    .map((msg) => {
      // Amino type for the MsgDelegate.
      if (
        msg.type === "cosmos-sdk/MsgDelegate" ||
        msg.type === "cosmos-sdk/MsgUndelegate"
      ) {
        return {
          MsgValue: [
            {
              name: "delegator_address",
              type: "string",
            },
            {
              name: "validator_address",
              type: "string",
            },
            {
              name: "amount",
              type: "TypeAmount",
            },
          ],
          TypeAmount: [
            {
              name: "denom",
              type: "string",
            },
            {
              name: "amount",
              type: "string",
            },
          ],
        };
      } else if (msg.type === "cosmos-sdk/MsgWithdrawDelegationReward") {
        return {
          MsgValue: [
            {
              name: "delegator_address",
              type: "string",
            },
            {
              name: "validator_address",
              type: "string",
            },
          ],
        };
      }

      // Throw an error if a message is not supported.
      throw new Error(`Unsupported message type: ${msg.type}`);
    })
    .reduce(
      (acc, curr) => ({
        ...acc,
        ...curr,
      }),
      {},
    );

  let domain: Record<string, string>;

  if (signDoc.chain_id === StakingNetworkId.Injective) {
    domain = {
      chainId: "0x1",
      name: "Injective Web3",
      salt: "0",
      verifyingContract: "cosmos",
      version: "1.0.0",
    };
  } else if (signDoc.chain_id === StakingNetworkId.Dymension) {
    domain = {
      chainId: EthermintChainIdHelper.parse(networkId).ethChainId.toString(),
      name: "Cosmos Web3",
      salt: "0",
      verifyingContract: "cosmos",
      version: "1.0.0",
    };
  } else if (signDoc.chain_id === StakingNetworkId.IslamicCoin) {
    domain = {
      // Got chain id from:
      // https://github.com/haqq-network/haqq/blob/03bba90ecacd8ecf49921be4196a2805f35f1ce8/app/app.go#L195C25-L195C30
      chainId: `0x${(11235).toString(16)}`,
      // Got the other domain info from:
      // https://github.com/haqq-network/haqq/blob/master/ethereum/eip712/domain.go
      name: "Cosmos Web3",
      salt: "0",
      verifyingContract: "cosmos",
      version: "1.0.0",
    };
  } else {
    throw new Error(`Unsupported chain id: ${signDoc.chain_id}`);
  }

  const isInjective = networkId === StakingNetworkId.Injective;

  return {
    domain,
    primaryType: "Tx",
    types: {
      Coin: [
        {
          name: "denom",
          type: "string",
        },
        {
          name: "amount",
          type: "string",
        },
      ],
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "string" },
        { name: "salt", type: "string" },
      ],
      Fee: [
        ...(!isInjective ? [{ name: "feePayer", type: "string" }] : []),
        { name: "amount", type: "Coin[]" },
        { name: "gas", type: "string" },
      ],
      Msg: [
        {
          name: "type",
          type: "string",
        },
        {
          name: "value",
          type: "MsgValue",
        },
      ],
      Tx: [
        {
          name: "account_number",
          type: "string",
        },
        {
          name: "chain_id",
          type: "string",
        },
        {
          name: "fee",
          type: "Fee",
        },
        {
          name: "memo",
          type: "string",
        },
        {
          name: "msgs",
          type: "Msg[]",
        },
        {
          name: "sequence",
          type: "string",
        },
        ...(isInjective
          ? [
              {
                name: "timeout_height",
                type: "string",
              },
            ]
          : []),
      ],
      ...messagesStructure,
    },
  };
};

type AccountInfo = {
  account_number: string;
  sequence: number;
};

// To be able to support ledger with ethermint chains (related to Ethereum), it
// can't use Protobuf messages, and it requires using Amino messages for
// enconding. It also needs to use EIP712CosmosTx for signing from Keplr.
export const signAndBroadcastEthermint = async (
  rpc: string,
  account: Account,
  latestAccountInfo: AccountInfo,
  client: SigningStargateClient,
  messages: EncodeObject[],
  fee: StdFee,
  memo: string,
) => {
  const signer = (account.wallet === WalletId.Leap
    ? window.leap!.getOfflineSigner(account.networkId)
    : window.keplr!.getOfflineSigner(
        account.networkId,
      )) as unknown as OfflineDirectSigner;

  const currentHeight = await client.getHeight();

  const { account_number: accountNumber, sequence } = latestAccountInfo;

  // The `sequence` can be `0` here if the account is new. But check that both
  // values are set in case the types are not valid.
  if (typeof sequence !== "number" || !accountNumber) {
    throw new Error("Account number or sequence is missing");
  }

  const accountFromSigner = (await signer.getAccounts()).find(
    (acc) => acc.address === account.address,
  );

  if (!accountFromSigner) {
    throw new Error("Failed to retrieve account from signer");
  }

  const pubkeyTypeUrl = (() => {
    if (account.networkId === StakingNetworkId.Injective) {
      return "/injective.crypto.v1beta1.ethsecp256k1.PubKey";
    }

    return "/ethermint.crypto.v1.ethsecp256k1.PubKey";
  })();

  // Create the instance that will take care of converting an EncodeObject
  // into an amino encoded message.
  const aminoTypes = new AminoTypes(createDefaultAminoConverters());
  /// Create the instance that will take care of converting an EncodeObject
  // into an direct encoded message.
  const directRegistry = new Registry(defaultRegistryTypes);
  // Convert the EncodeObjects into amino encoded messages
  const aminoMessages = messages.map((m) => aminoTypes.toAmino(m));

  const isInjective = account.networkId === StakingNetworkId.Injective;

  const timeoutHeight = isInjective
    ? BigInt(currentHeight) + BigInt(500)
    : undefined;

  const parsedFee = {
    ...fee,
    ...(!isInjective ? { feePayer: account.address } : {}),
  };

  // Create the amino signDoc.
  const signDoc = makeSignDoc(
    aminoMessages,
    parsedFee,
    account.networkId,
    memo,
    accountNumber,
    sequence,
    timeoutHeight,
  );

  let signed: StdSignDoc;
  let signature: StdSignature;

  if (account.wallet === WalletId.Keplr || account.wallet === WalletId.Leap) {
    const signResponse = await (
      account.wallet === WalletId.Keplr ? window.keplr : window.leap
    )!.experimentalSignEIP712CosmosTx_v0(
      account.networkId,
      account.address,
      getEIP712DataStructure(signDoc, account.networkId),
      signDoc,
    );

    ({ signature, signed } = signResponse);
  } else {
    throw new Error(`Unsupported account wallet: ${account.wallet}`);
  }

  const extensionOption = (() => {
    const typeUrl =
      account.networkId === StakingNetworkId.Injective
        ? "/injective.types.v1beta1.ExtensionOptionsWeb3Tx"
        : "/ethermint.types.v1.ExtensionOptionsWeb3Tx";

    return {
      typeUrl,
      value: ExtensionOptionsWeb3Tx.encode(
        ExtensionOptionsWeb3Tx.fromPartial({
          feePayerSig: fromBase64(signature.signature),
          typedDataChainId: EthermintChainIdHelper.parse(
            signed.chain_id,
          ).ethChainId.toString(),
        }),
      ).finish(),
    };
  })();

  // Convert the EncodeObjects into direct encoded messages.
  const directMessages = messages.map((m) => directRegistry.encodeAsAny(m));

  const txRaw = TxRaw.fromPartial({
    authInfoBytes: makeAuthInfoBytes(
      [
        {
          pubkey: {
            typeUrl: pubkeyTypeUrl,
            value: PubKey.encode({
              key: fromBase64(signature.pub_key.value),
            }).finish(),
          },
          sequence,
        },
      ],
      signed.fee.amount,
      Number(signed.fee.gas),
      undefined,
      signed.fee.feePayer,
      SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
    ),
    bodyBytes: TxBody.encode(
      TxBody.fromPartial({
        extensionOptions: [extensionOption],
        memo: signed.memo,
        messages: directMessages,
        timeoutHeight: signed.timeout_height
          ? BigInt(signed.timeout_height)
          : undefined,
      }),
    ).finish(),
    signatures: [fromBase64(signature.signature)],
  });

  const tx = TxRaw.encode(txRaw).finish();

  return (account.wallet === WalletId.Leap ? window.leap! : window.keplr!)
    ?.sendTx(account.networkId, tx, "sync" as BroadcastMode.Block)
    .then(async (res) => {
      const txHash = Buffer.from(res).toString("hex").toUpperCase();

      if (!txHash) {
        throw new Error("Failed to broadcast transaction");
      }

      const txResult = await pollTx({
        rpc,
        // Three minutes, since some transactions (e.g. for Injective) can take
        // a long time
        timeout: 1000 * 60 * 3,
        txHash,
      });

      // eslint-disable-next-line no-console
      console.log("debug: cosmos.ts: txResult", txResult);

      return txResult.txResponse?.events;
    });
};
