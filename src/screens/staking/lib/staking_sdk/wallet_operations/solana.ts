import {
  Authorized,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
} from "@solana/web3.js";
import Solflare from "@solflare-wallet/sdk";

import type { TStakingContext } from "../context";
import { fetchAccountData, setUserWallet } from "../context/actions";
import type { Account } from "../core";
import { ENABLE_TESTNETS, StakingNetworkId, WalletId } from "../core/base";
import { solanaNetworks } from "../core/solana";
import { stakingClient } from "../staking_client";
import { normaliseCoin } from "../utils/coins";
import { addToConnectedWallets } from "../utils/storage";
import { StakeError, UnstakeError } from "./base";
import type { StakeOpts, UnstakeAmount, WalletOperationResult } from "./base";

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

export const tryToConnectSolflare = async (
  context: TStakingContext,
): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    let resolvedItems = 0;

    const hasMainnetWallet = solanaNetworks.has(StakingNetworkId.Solana);

    const hasTestnetWallet =
      ENABLE_TESTNETS && solanaNetworks.has(StakingNetworkId.SolanaTestnet);

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
            wallet: WalletId.Solflare,
          };

          setUserWallet(context, WalletId.Solflare, {
            name: "Test", // @TODO
            networks: {
              ...context.state.wallets[WalletId.Solflare]?.networks,
              [networkId]: {
                accounts: [account],
                networkId,
              },
            },
            wallet: WalletId.Solflare,
          });

          addToConnectedWallets(WalletId.Solflare);

          resolvedItems += 1;

          const totalItems = [hasMainnetWallet, hasTestnetWallet].filter(
            Boolean,
          ).length;

          if (resolvedItems === totalItems) {
            resolve(true);
          }
        } catch (error) {
          reject(error);
        }
      };

    if (hasMainnetWallet) {
      if (connectListenerMainnet) {
        mainnetWallet.off("connect", connectListenerMainnet);
      }

      connectListenerMainnet = getListener(
        mainnetWallet,
        StakingNetworkId.Solana,
      );

      mainnetWallet.on("connect", connectListenerMainnet);
    }

    if (hasTestnetWallet) {
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
      hasMainnetWallet ? mainnetWallet.connect() : Promise.resolve(),
      hasTestnetWallet ? testnetWallet.connect() : Promise.resolve(),
    ]);
  });

export const tryToConnectPhantom = async (
  context: TStakingContext,
  openLinkIfMissing?: boolean,
) => {
  const { phantom } = window as any;
  const provider = phantom?.solana;

  if (provider?.isPhantom) {
    const resp = await provider.connect();

    const publicKey = resp.publicKey.toString();

    return [StakingNetworkId.Solana]
      .concat(
        ENABLE_TESTNETS
          ? [StakingNetworkId.SolanaTestnet, StakingNetworkId.SolanaDevnet]
          : [],
      )
      .filter((networkId) => solanaNetworks.has(networkId))
      .reduce(async (promise, networkId) => {
        await promise;

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
          wallet: WalletId.Phantom,
        };

        setUserWallet(context, WalletId.Phantom, {
          name: "Test", // @TODO
          networks: {
            ...context.state.wallets[WalletId.Phantom]?.networks,
            [networkId]: {
              accounts: [account],
              networkId,
            },
          },
          wallet: WalletId.Phantom,
        });

        addToConnectedWallets(WalletId.Phantom);

        return true;
      }, Promise.resolve(false));
  } else if (openLinkIfMissing) {
    window.open("https://phantom.app/", "_blank");
  }
};

const minimumStakeAmount: { [key in StakingNetworkId]?: number } = {
  // In testnet it is not possible to stake less than 1 SOL, Solflare will disable the button
  [StakingNetworkId.SolanaTestnet]: LAMPORTS_PER_SOL * 1,
};

type WalletApi = {
  signAndSendTransaction: any;
};

const getWalletApi = (account: Account): WalletApi => {
  if (account.wallet === WalletId.Phantom) {
    const { phantom } = window as any;

    return {
      signAndSendTransaction: phantom.solana.signAndSendTransaction.bind(
        phantom.solana,
      ),
    };
  }

  return account.networkId === StakingNetworkId.SolanaTestnet
    ? testnetWallet
    : mainnetWallet;
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
      const wallet = getWalletApi(account);

      const stakeKeyPair = Keypair.generate();

      const amountToStake = Number(amount) * LAMPORTS_PER_SOL;
      const minimumAmount = minimumStakeAmount[account.networkId] || 0;

      if (amountToStake < minimumAmount) {
        return {
          coin: normaliseCoin({
            amount: minimumAmount.toString(),
            denom: "LAMPORTS",
          }),
          error: StakeError.MinimumAmount,
          success: false,
        };
      }

      const newTx = StakeProgram.createAccount({
        authorized: new Authorized(accountKey, accountKey),
        fromPubkey: accountKey,
        lamports: amountToStake,
        stakePubkey: stakeKeyPair.publicKey,
      });

      newTx.recentBlockhash = (info as any).blockhash;
      newTx.feePayer = accountKey;

      newTx.sign(stakeKeyPair);

      const stakeAccountResult = await wallet.signAndSendTransaction(newTx);

      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: result", stakeAccountResult);

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const newInfo = await stakingClient.stake(
        account.networkId,
        account.address,
        amount,
      );

      const newTx2 = StakeProgram.delegate({
        authorizedPubkey: accountKey,
        stakePubkey: stakeKeyPair.publicKey,
        votePubkey: new PublicKey(validatorAddress),
      });

      newTx2.recentBlockhash = (newInfo as any).blockhash;
      newTx2.feePayer = accountKey;

      // newTx2.sign(stakeKeyPair);

      const stakeAccountResult2 = await wallet.signAndSendTransaction(newTx2);

      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: result", stakeAccountResult2);

      return { success: true } as const;
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

export const unstakeSolana = async ({
  account,
  amount,
  stakeAccount,
}: UnstakeAmount): Promise<WalletOperationResult<UnstakeError>> =>
  stakingClient
    .unstake(account.networkId, account.address, amount)
    .then(async (info) => {
      if (!stakeAccount) {
        return {
          error: UnstakeError.Unknown,
          success: false,
        };
      }

      const accountKey = new PublicKey(account.address);

      const wallet = getWalletApi(account);

      const stakePubkey = new PublicKey(stakeAccount.address);

      const newTx = new Transaction().add(
        StakeProgram.deactivate({
          authorizedPubkey: accountKey,
          stakePubkey,
        }),
      );

      newTx.recentBlockhash = (info as any).blockhash;
      newTx.feePayer = accountKey;

      await wallet.signAndSendTransaction(newTx);

      return {
        success: true,
      } as const;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: error", error);

      if (error.message?.includes("Transaction cancelled")) {
        return {
          error: UnstakeError.None,
          success: false,
        };
      }

      return {
        error: UnstakeError.Unknown,
        success: false,
      };
    });

export const disconnectSolflare = async (networks: StakingNetworkId[]) => {
  // @TODO
  // eslint-disable-next-line no-console
  console.log("debug: solana.ts: disconnectSolana", networks);
};

export const disconnectPhantom = async () => {
  const { phantom } = window as any;
  const provider = phantom?.solana;

  if (provider?.isPhantom) {
    await provider.disconnect();
  }
};
