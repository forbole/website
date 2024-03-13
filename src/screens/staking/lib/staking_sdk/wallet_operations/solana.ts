import {
  Authorized,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import Solflare from "@solflare-wallet/sdk";

import type { TStakingContext } from "../context";
import { fetchAccountData, setUserWallet } from "../context/actions";
import type { Account } from "../core";
import { ENABLE_TESTNETS, StakingNetworkId, WalletId } from "../core/base";
import { stakingClient } from "../staking_client";
import { normaliseCoin } from "../utils/coins";
import { addToConnectedWallets } from "../utils/storage";
import { StakeError } from "./base";
import type { StakeOpts, WalletOperationResult } from "./base";

const mainnetWallet = new Solflare({});
const testnetWallet = new Solflare({ network: "testnet" });

if (ENABLE_TESTNETS) {
  mainnetWallet.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log("disconnected");
  });
}

testnetWallet.on("disconnect", () => {
  // eslint-disable-next-line no-console
  console.log("disconnected");
});

let connectListenerMainnet: (() => void) | undefined;
let connectListenerTestnet: (() => void) | undefined;

export const tryToConnectSolana = async (
  context: TStakingContext,
): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    let resolvedItems = 0;

    const getListener =
      (wallet: typeof mainnetWallet, networkId: StakingNetworkId) =>
      async () => {
        try {
          const publicKey = wallet.publicKey?.toBase58();

          if (!publicKey) {
            reject(`No public key: ${networkId}`);

            return;
          }

          const accountData = await fetchAccountData(
            context,
            publicKey,
            networkId,
            true,
          );

          const account: Account = {
            address: publicKey,
            info: accountData.info,
            networkId,
            rewards: accountData.rewards,
            wallet: WalletId.SolanaGroup,
          };

          setUserWallet(context, WalletId.SolanaGroup, {
            name: "Test", // @TODO
            networks: {
              ...context.state.wallets[WalletId.SolanaGroup]?.networks,
              [networkId]: {
                accounts: [account],
                networkId,
              },
            },
            wallet: WalletId.SolanaGroup,
          });

          addToConnectedWallets(WalletId.SolanaGroup);

          resolvedItems += 1;

          if (resolvedItems === (ENABLE_TESTNETS ? 2 : 1)) {
            resolve(true);
          }
        } catch (error) {
          reject(error);
        }
      };

    if (connectListenerMainnet) {
      mainnetWallet.off("connect", connectListenerMainnet);
    }

    connectListenerMainnet = getListener(
      mainnetWallet,
      StakingNetworkId.Solana,
    );

    mainnetWallet.on("connect", connectListenerMainnet);

    if (ENABLE_TESTNETS) {
      if (connectListenerTestnet) {
        testnetWallet.off("connect", connectListenerTestnet);
      }

      connectListenerTestnet = getListener(
        testnetWallet,
        StakingNetworkId.SolanaTestnet,
      );

      testnetWallet.on("connect", connectListenerTestnet);
    }

    await Promise.all([
      mainnetWallet.connect(),
      ENABLE_TESTNETS ? testnetWallet.connect() : Promise.resolve(),
    ]);
  });

const minimumStakeAmount: { [key in StakingNetworkId]?: number } = {
  // In testnet it is not possible to stake less than 1 SOL, Solflare will disable the button
  [StakingNetworkId.SolanaTestnet]: LAMPORTS_PER_SOL * 1,
};

// https://solanacookbook.com/references/staking.html
export const stakeAmountSolana = async ({
  account,
  amount,
}: StakeOpts): Promise<WalletOperationResult<StakeError>> =>
  stakingClient
    .stake(account.networkId, account.address, amount)
    .then(async (info) => {
      const validatorAddress = (info as any).validator_address;

      const accountKey = new PublicKey(account.address);

      const wallet =
        account.networkId === StakingNetworkId.SolanaTestnet
          ? testnetWallet
          : mainnetWallet;

      const stakeAccount = (account.info?.stakeAccounts || []).find(
        (a) => a.validator_address === validatorAddress,
      );

      if (!stakeAccount) {
        const stakeKeyPair = Keypair.generate();

        const amountToStake = Number(amount) * LAMPORTS_PER_SOL;
        const minimumAmount = minimumStakeAmount[account.networkId] || 0;

        if (amountToStake < minimumAmount) {
          return {
            data: normaliseCoin({
              amount: minimumAmount.toString(),
              denom: "LAMPORTS",
            }),
            error: StakeError.MinimumAmount,
            success: false,
          };
        }

        const newTx = new Transaction()
          .add(
            StakeProgram.createAccount({
              authorized: new Authorized(accountKey, accountKey),
              fromPubkey: accountKey,
              lamports: amountToStake,
              stakePubkey: stakeKeyPair.publicKey,
            }),
          )
          .add(
            StakeProgram.delegate({
              authorizedPubkey: accountKey,
              stakePubkey: stakeKeyPair.publicKey,
              votePubkey: new PublicKey(validatorAddress),
            }),
          );

        newTx.recentBlockhash = (info as any).blockhash;
        newTx.feePayer = accountKey;

        newTx.sign(stakeKeyPair);

        const stakeAccountResult = await wallet.signAndSendTransaction(newTx);

        // eslint-disable-next-line no-console
        console.log("debug: solana.ts: result", stakeAccountResult);

        return { success: true } as const;
      }

      const stakePubKey = new PublicKey(stakeAccount.address);

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: accountKey,
          lamports: LAMPORTS_PER_SOL * Number(amount),
          toPubkey: stakePubKey,
        }),
      );

      tx.recentBlockhash = (info as any).blockhash;
      tx.feePayer = accountKey;

      const result = await wallet.signAndSendTransaction(tx);

      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: result", result);

      return {
        success: true,
      } as const;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: error", error);

      if (error.message?.includes("Transaction cancelled")) {
        return {
          error: StakeError.None,
          success: false,
        };
      }

      return {
        error: StakeError.Unknown,
        success: false,
      };
    });

export const disconnectSolana = async (networks: StakingNetworkId[]) => {
  // eslint-disable-next-line no-console
  console.log("debug: solana.ts: disconnectSolana", networks);
};
