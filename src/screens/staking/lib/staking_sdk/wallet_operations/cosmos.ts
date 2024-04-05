import { makeSignDoc } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import type { EncodeObject, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { Registry, makeAuthInfoBytes } from "@cosmjs/proto-signing";
import {
  AminoTypes,
  QueryClient,
  SigningStargateClient,
  createDefaultAminoConverters,
  defaultRegistryTypes,
  setupTxExtension,
} from "@cosmjs/stargate";
import type {
  MsgDelegateEncodeObject,
  MsgUndelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  StdFee,
  Event as TxEvent,
} from "@cosmjs/stargate";
import { connectComet } from "@cosmjs/tendermint-rpc";
import { EthermintChainIdHelper } from "@keplr-wallet/cosmos";
import { ExtensionOptionsWeb3Tx } from "@keplr-wallet/proto-types/ethermint/types/v1/web3";
import type {
  AccountData,
  BroadcastMode,
  StdSignDoc,
  StdSignature,
} from "@keplr-wallet/types";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import {
  MsgDelegate,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxBody, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";

import { toastError, toastSuccess } from "@src/components/notification";

import type { TStakingContext } from "../context";
import { fetchAccountData, setUserWallet } from "../context/actions";
import { getHasConnectedWallet } from "../context/selectors";
import type { Account, Wallet } from "../core";
import { networksWithStaking } from "../core";
import type { Coin } from "../core/base";
import { StakingNetworkId, WalletId } from "../core/base";
import {
  ethermintNetworks,
  keplrNetworks,
  keplrNonNativeChains,
  leapNetworks,
} from "../core/cosmos";
import { stakingClient } from "../staking_client";
import { addToConnectedWallets, getConnectedWallets } from "../utils/storage";
import type {
  ClaimOpts,
  StakeOpts,
  UnstakeAmount,
  WalletErrorMap,
  WalletOperationResult,
} from "./base";
import { ClaimRewardsError, StakeError, UnstakeError } from "./base";

type TxEventType = "delegate" | "unbond" | "withdraw_rewards";

const verifyEvent = (eventName: TxEventType) => (events?: readonly TxEvent[]) =>
  !!events?.find((ev) => ev.type === eventName);

const verifyDelegate = verifyEvent("delegate");
const verifyWithdraw = verifyEvent("withdraw_rewards");
const verifyUnbond = verifyEvent("unbond");

type FeeOpts = {
  account: Account;
  amount: Coin[];
  client: SigningStargateClient;
  gasLimit: string;
  memo: string;
  msgs: EncodeObject[];
};

const getCosmosFee = async ({
  account,
  amount,
  client,
  gasLimit,
  memo,
  msgs,
}: FeeOpts) => {
  const gasEstimate = ethermintNetworks.has(account.networkId)
    ? 0
    : await client.simulate(account.address, msgs, memo).catch((err) => {
        // eslint-disable-next-line no-console
        console.log("debug: wallet_operations.ts: Estimate error", err);

        return 0;
      });

  // This is a factor to increase the gas fee, since the estimate can be a
  // bit short in some cases (especially for the last events)
  const gasFeeFactor = 1.2;

  const fee: StdFee = {
    amount,
    gas: gasEstimate ? (gasEstimate * gasFeeFactor).toString() : gasLimit,
  };

  return fee;
};

const getEIP712DataStructure = (signDoc: StdSignDoc) => {
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
      chainId: `0x${(1100).toString(16)}`,
      // TODO: Check if the name is correct.
      name: "Dymension",
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
        {
          name: "name",
          type: "string",
        },
        {
          name: "version",
          type: "string",
        },
        {
          name: "chainId",
          type: "uint256",
        },
        {
          name: "verifyingContract",
          type: "string",
        },
        {
          name: "salt",
          type: "string",
        },
      ],
      Fee: [
        {
          name: "amount",
          type: "Coin[]",
        },
        {
          name: "gas",
          type: "string",
        },
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
        {
          name: "timeout_height",
          type: "string",
        },
      ],
      ...messagesStructure,
    },
  };
};

enum CosmosError {
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Success = "Success",
  Unknown = "Unknown",
}

const getCosmosError = (err: Error): CosmosError => {
  // eslint-disable-next-line no-console
  console.log("debug: index.tsx: err", err);

  if (err?.message?.includes("transaction indexing is disabled")) {
    return CosmosError.Success;
  }

  if (
    err?.message?.includes("out of gas in") ||
    err?.message?.includes("insufficient fee")
  ) {
    return CosmosError.NotEnoughGas;
  }

  // This appears to be fine, since the transaction is still broadcasted
  return (
    // Keplr message
    !err?.message?.includes("rejected") &&
      // Leap message
      !err?.message?.includes("declined")
      ? CosmosError.Unknown
      : CosmosError.None
  );
};

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

type AccountInfo = {
  account_number: string;
  sequence: number;
};

const signAndBroadcastEthermint = async (
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

  // Create the amino signDoc.
  const signDoc = makeSignDoc(
    aminoMessages,
    fee,
    account.networkId,
    memo,
    accountNumber,
    sequence,
    // TODO: Set a proper offset for the timeout height.
    // Currently 500 is enough to allow the user to sign and
    // broadcast the transaction on Injective but I don't know
    // how this behaves on other chains.
    BigInt(currentHeight) + BigInt(500),
  );

  let signed: StdSignDoc;
  let signature: StdSignature;

  if (account.wallet === WalletId.Keplr) {
    const signResponse = await window.keplr!.experimentalSignEIP712CosmosTx_v0(
      account.networkId,
      account.address,
      getEIP712DataStructure(signDoc),
      signDoc,
    );

    ({ signature, signed } = signResponse);
  } else if (account.wallet === WalletId.Leap) {
    // @TODO: Implement EIP712CosmosTx sign for Leap.
    throw new Error("Not implemented");
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
      undefined,
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

  // @TODO
  // @ts-expect-error: `account.wallet` is always Keplr here because of the error above
  return (account.wallet === WalletId.Leap ? window.leap! : window.keplr!)
    ?.sendTx(account.networkId, tx, "async" as BroadcastMode.Block)
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

export const stakeAmountCosmos = ({
  account,
  amount,
  memo,
}: StakeOpts): Promise<WalletOperationResult<StakeError>> =>
  stakingClient
    .stake(account.networkId, account.address, amount)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return { error: StakeError.Unknown, success: false };

      const networkInfo = await stakingClient.getStakingInfo(account.networkId);

      const msg = MsgDelegate.fromPartial({
        amount: message.amount,
        delegatorAddress: message.delegator_address,
        validatorAddress: message.validator_address,
      });

      const msgAny: MsgDelegateEncodeObject = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msg,
      };

      const offlineSigner =
        account.wallet === WalletId.Leap
          ? window.leap?.getOfflineSignerOnlyAmino(account.networkId)
          : window.keplr?.getOfflineSignerOnlyAmino(account.networkId);

      if (!offlineSigner) {
        throw new Error("Can't get offline signer");
      }

      const client = await SigningStargateClient.connectWithSigner(
        networkInfo.rpc,
        offlineSigner,
      );

      const fee = await getCosmosFee({
        account,
        amount: info.tx.authInfo.fee.amount,
        client,
        gasLimit: info.tx.authInfo.fee.gas_limit,
        memo,
        msgs: [msgAny],
      });

      const handleSuccess = (events?: readonly TxEvent[]) => {
        const hasDelegated = verifyDelegate(events);

        return hasDelegated
          ? ({ success: true } as const)
          : { error: StakeError.NotEnoughGas, success: false };
      };

      const handleError = (err: Error) =>
        (
          ({
            [CosmosError.None]: { error: StakeError.None, success: false },
            [CosmosError.NotEnoughGas]: {
              error: StakeError.NotEnoughGas,
              success: false,
            },
            [CosmosError.Success]: { success: true },
            [CosmosError.Unknown]: {
              error: StakeError.Unknown,
              success: false,
            },
          }) satisfies Record<CosmosError, WalletOperationResult<StakeError>>
        )[getCosmosError(err)];

      if (ethermintNetworks.has(account.networkId) && info.ethAccount) {
        return signAndBroadcastEthermint(
          networkInfo.rpc,
          account,
          info.ethAccount,
          client,
          [msgAny],
          fee,
          memo,
        )
          .then(handleSuccess)
          .catch(handleError);
      }

      return client
        .signAndBroadcast(account.address, [msgAny], fee, memo)
        .then((result) => handleSuccess(result?.events))
        .catch(handleError);
    });

export const claimRewardsCosmos = async ({
  account,
}: ClaimOpts): Promise<WalletOperationResult<ClaimRewardsError>> =>
  stakingClient
    .claimRewards(account.networkId, account.address)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return { error: ClaimRewardsError.Unknown, success: false };

      const networkInfo = await stakingClient.getStakingInfo(account.networkId);

      const msg = MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: message.delegator_address,
        validatorAddress: message.validator_address,
      });

      const msgAny: MsgWithdrawDelegatorRewardEncodeObject = {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: msg,
      };

      const offlineSigner =
        account.wallet === WalletId.Leap
          ? window.leap?.getOfflineSignerOnlyAmino(account.networkId)
          : window.keplr?.getOfflineSignerOnlyAmino(account.networkId);

      if (!offlineSigner) {
        throw new Error("Can't get offline signer");
      }

      const client = await SigningStargateClient.connectWithSigner(
        networkInfo.rpc,
        offlineSigner,
      );

      const fee = await getCosmosFee({
        account,
        amount: info.tx.authInfo.fee.amount,
        client,
        gasLimit: info.tx.authInfo.fee.gas_limit,
        memo: "",
        msgs: [msgAny],
      });

      const handleSuccess = (events?: readonly TxEvent[]) => {
        const hasClaimed = !!verifyWithdraw(events);

        return hasClaimed
          ? ({ success: true } as const)
          : { error: ClaimRewardsError.NotEnoughGas, success: false };
      };

      const handleError = (err: Error) =>
        (
          ({
            [CosmosError.None]: {
              error: ClaimRewardsError.None,
              success: false,
            },
            [CosmosError.NotEnoughGas]: {
              error: ClaimRewardsError.NotEnoughGas,
              success: false,
            },
            [CosmosError.Success]: { success: true },
            [CosmosError.Unknown]: {
              error: ClaimRewardsError.Unknown,
              success: false,
            },
          }) satisfies Record<
            CosmosError,
            WalletOperationResult<ClaimRewardsError>
          >
        )[getCosmosError(err)];

      if (ethermintNetworks.has(account.networkId) && info.ethAccount) {
        return signAndBroadcastEthermint(
          networkInfo.rpc,
          account,
          info.ethAccount,
          client,
          [msgAny],
          fee,
          "",
        )
          .then(handleSuccess)
          .catch(handleError);
      }

      return client
        .signAndBroadcast(account.address, [msgAny], fee)
        .then((result) => handleSuccess(result?.events))
        .catch(handleError);
    });

export const getCosmosClaimRewardsFee = async ({
  account,
}: ClaimOpts): Promise<Coin | null> =>
  stakingClient
    .claimRewards(account.networkId, account.address)
    .then((info) => {
      const [message] = info.tx.body.messages;

      if (!message) return null;

      return info.tx.authInfo.fee.amount?.[0] ?? null;
    });

export const unstakeCosmos = async (
  opts: UnstakeAmount,
): Promise<WalletOperationResult<UnstakeError>> =>
  stakingClient
    .unstake(opts.account.networkId, opts.account.address, opts.amount)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return { error: UnstakeError.Unknown, success: false };

      const networkInfo = await stakingClient.getStakingInfo(
        opts.account.networkId,
      );

      const msg = MsgUndelegate.fromPartial({
        amount: message.amount,
        delegatorAddress: message.delegator_address,
        validatorAddress: message.validator_address,
      });

      const msgAny: MsgUndelegateEncodeObject = {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: msg,
      };

      const offlineSigner =
        opts.account.wallet === WalletId.Leap
          ? window.leap?.getOfflineSignerOnlyAmino(opts.account.networkId)
          : window.keplr?.getOfflineSignerOnlyAmino(opts.account.networkId);

      if (!offlineSigner) {
        throw new Error("Can't get offline signer");
      }

      const client = await SigningStargateClient.connectWithSigner(
        networkInfo.rpc,
        offlineSigner,
      );

      const fee = await getCosmosFee({
        account: opts.account,
        amount: info.tx.authInfo.fee.amount,
        client,
        gasLimit: info.tx.authInfo.fee.gas_limit,
        memo: opts.memo,
        msgs: [msgAny],
      });

      const handleSuccess = (events?: readonly TxEvent[]) => {
        const hasUnbonded = verifyUnbond(events);

        return hasUnbonded
          ? ({ success: true } as const)
          : {
              error: UnstakeError.NotEnoughGas,
              success: false,
            };
      };

      const handleError = (err: Error) =>
        (
          ({
            [CosmosError.None]: {
              error: UnstakeError.None,
              success: false,
            },
            [CosmosError.NotEnoughGas]: {
              error: UnstakeError.NotEnoughGas,
              success: false,
            },
            [CosmosError.Success]: { success: true },
            [CosmosError.Unknown]: {
              error: UnstakeError.Unknown,
              success: false,
            },
          }) satisfies Record<CosmosError, WalletOperationResult<UnstakeError>>
        )[getCosmosError(err)];

      if (ethermintNetworks.has(opts.account.networkId) && info.ethAccount) {
        return signAndBroadcastEthermint(
          networkInfo.rpc,
          opts.account,
          info.ethAccount,
          client,
          [msgAny],
          fee,
          opts.memo,
        )
          .then(handleSuccess)
          .catch(handleError);
      }

      return client
        .signAndBroadcast(opts.account.address, [msgAny], fee, opts.memo)
        .then((result) => handleSuccess(result?.events))
        .catch(handleError);
    });

export const tryToConnectKeplr = async (
  context: TStakingContext,
  openLinkIfMissing: boolean,
) => {
  const { keplr } = window;

  if (keplr) {
    const chainsToConnect = Array.from(keplrNetworks).filter(
      (n) => !keplrNonNativeChains.has(n),
    );

    const nonNativeChains = Array.from(keplrNonNativeChains);

    if (!chainsToConnect.length || !nonNativeChains.length) {
      return;
    }

    try {
      await keplr.enable(chainsToConnect);

      await nonNativeChains.reduce(async (acc, network) => {
        await acc;

        // Try non-native chains one by one, since it will throw if not already
        // added
        await keplr.enable([network]).catch(() => null);
      }, Promise.resolve());

      const handleError = (err: unknown) => {
        // eslint-disable-next-line no-console
        console.log("debug: index.tsx: err", err);

        return [] as Account[];
      };

      let walletName = "";

      const parseAccounts =
        (networkId: StakingNetworkId) =>
        (accounts: readonly AccountData[]): Promise<Account[]> =>
          Promise.all(
            accounts.map((account) =>
              Promise.all([
                fetchAccountData(context, account.address, networkId, true),
                window.keplr!.getKey(networkId),
              ]).then(([{ info, rewards }, key]) => {
                if (key?.name) {
                  walletName = key.name;
                }

                return {
                  address: account.address,
                  info,
                  networkId,
                  rewards,
                  wallet: WalletId.Keplr,
                };
              }),
            ),
          );

      const keplrAccounts = await Promise.all(
        Array.from(keplrNetworks).map(async (network) => {
          if (networksWithStaking.has(network)) {
            const accounts = await window
              .keplr!.getOfflineSigner(network)
              .getAccounts()
              .then(parseAccounts(network))
              .catch(handleError);

            return {
              accounts,
              networkId: network,
            };
          }
        }),
      );

      addToConnectedWallets(WalletId.Keplr);

      setUserWallet(
        context,
        WalletId.Keplr,
        keplrAccounts.reduce(
          (acc, networkObj) => {
            if (networkObj) {
              acc.networks[networkObj.networkId] = {
                accounts: networkObj.accounts,
                networkId: networkObj.networkId,
              };
            }

            return acc;
          },
          {
            name: walletName,
            networks: {},
            wallet: WalletId.Keplr,
          } as Wallet,
        ),
      );

      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("tryToConnectWallets", error);
    }
  } else if (openLinkIfMissing) {
    if (/Chrome/.test(navigator.userAgent)) {
      window.open(
        "https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
        "_blank",
      );

      return;
    }

    window.open("https://wallet.keplr.app/#/dashboard", "_blank");
  }
};

export const tryToConnectLeap = async (
  context: TStakingContext,
  openLinkIfMissing: boolean,
  walletErrorMap: WalletErrorMap = {},
) => {
  if (window.leap) {
    const chainsToConnect = Array.from(leapNetworks);

    try {
      await window.leap.enable(chainsToConnect);

      const handleError = (err: unknown) => {
        // eslint-disable-next-line no-console
        console.log("debug: index.tsx: err", err);

        return [] as Account[];
      };

      let walletName = "";

      const parseAccounts =
        (networkId: StakingNetworkId) =>
        (accounts: readonly AccountData[]): Promise<Account[]> =>
          Promise.all(
            accounts.map((account) =>
              Promise.all([
                fetchAccountData(context, account.address, networkId, true),
                window.leap!.getKey(networkId),
              ]).then(([{ info, rewards }, key]) => {
                if (key?.name) {
                  walletName = key.name;
                }

                return {
                  address: account.address,
                  info,
                  networkId,
                  rewards,
                  wallet: WalletId.Leap,
                };
              }),
            ),
          );

      const leapAccounts = await Promise.all(
        Array.from(leapNetworks).map(async (network) => {
          if (networksWithStaking.has(network)) {
            const accounts = await window
              .leap!.getOfflineSigner(network)
              .getAccounts()
              .then(parseAccounts(network))
              .catch(handleError);

            return {
              accounts,
              networkId: network,
            };
          }
        }),
      );

      addToConnectedWallets(WalletId.Leap);

      setUserWallet(
        context,
        WalletId.Leap,
        leapAccounts.reduce(
          (acc, networkObj) => {
            if (networkObj) {
              acc.networks[networkObj.networkId] = {
                accounts: networkObj.accounts,
                networkId: networkObj.networkId,
              };
            }

            return acc;
          },
          {
            name: walletName,
            networks: {},
            wallet: WalletId.Leap,
          } as Wallet,
        ),
      );

      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("tryToConnectWallets", error);

      if (
        (error as Error)?.message?.includes("No wallet exists") &&
        !!walletErrorMap.leapCreateWallet
      ) {
        toastError({
          title: walletErrorMap.leapCreateWallet,
        });
      }
    }
  } else if (openLinkIfMissing) {
    if (/Chrome/.test(navigator.userAgent)) {
      window.open(
        "https://chromewebstore.google.com/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg",
        "_blank",
      );

      return;
    }

    window.open("https://www.leapwallet.io/download", "_blank");
  }
};

export const disconnecKeplr = async (networks: StakingNetworkId[]) => {
  await window.keplr?.disable(networks).catch((err) => {
    // eslint-disable-next-line no-console
    console.log("Disable Error", err);
  });
};

export const disconnectLeap = async (networks: StakingNetworkId[]) => {
  await (window.leap as any).disconnect(networks).catch((err: any) => {
    // eslint-disable-next-line no-console
    console.log("Disable Error", err);
  });
};

export const useCosmosWalletsListeners = (contextValue: TStakingContext) => {
  const { t } = useTranslation("staking");

  useEffect(() => {
    const listenerKeplr = () => {
      const connectedWallets = getConnectedWallets();

      if (connectedWallets.includes(WalletId.Keplr)) {
        toastSuccess({
          title: t("keplrWalletUpdate"),
        });

        tryToConnectKeplr(contextValue, false);
      }
    };

    const listenerLeap = () => {
      const connectedWallets = getConnectedWallets();

      if (connectedWallets.includes(WalletId.Leap)) {
        toastSuccess({
          title: t("leapWalletUpdate"),
        });

        tryToConnectLeap(contextValue, false);
      }
    };

    window.addEventListener("keplr_keystorechange", listenerKeplr);
    window.addEventListener("leap_keystorechange", listenerLeap);

    return () => {
      window.removeEventListener("keplr_keystorechange", listenerKeplr);
      window.removeEventListener("leap_keystorechange", listenerLeap);
    };
  }, [contextValue, t]);
};

export const suggestAddCosmosWalletNetwork = (
  context: TStakingContext,
  networkId: StakingNetworkId,
) => {
  if (
    getHasConnectedWallet(context.state, WalletId.Keplr) &&
    keplrNonNativeChains.has(networkId)
  ) {
    window.open("https://chains.keplr.app/");
  }
};
