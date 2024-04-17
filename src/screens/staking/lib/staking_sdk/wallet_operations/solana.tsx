import {
  Authorized,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
} from "@solana/web3.js";
import Solflare from "@solflare-wallet/sdk";
import BigNumber from "bignumber.js";
import Trans from "next-translate/Trans";

import { toastError, toastInfo } from "@src/components/notification";

import type { TStakingContext } from "../context";
import { fetchAccountData, setUserWallet } from "../context/actions";
import type { Account } from "../core";
import type { Coin } from "../core/base";
import { ENABLE_TESTNETS, StakingNetworkId, WalletId } from "../core/base";
import { solanaNetworks } from "../core/solana";
import { stakingClient } from "../staking_client";
import { normaliseCoin } from "../utils/coins";
import {
  addToConnectedWallets,
  getSolflareCloseNotified,
  setSolflareCloseNotified,
} from "../utils/storage";
import type {
  StakeOpts,
  UnstakeAmount,
  WalletErrorMap,
  WalletOperationResult,
  WithdrawUnstakedOpts,
} from "./base";
import { StakeError, UnstakeError, WithdrawUnstakedError } from "./base";

const mainnetWallet = new Solflare({});
const devnetWallet = new Solflare({ network: "devnet" });

let connectListenerMainnet: (() => void) | undefined;
let connectListenerDevnet: (() => void) | undefined;

const isCloseError = (error: Error) =>
  error.message?.includes("Transaction cancelled") ||
  error.message?.includes("User rejected the request");

export const tryToConnectSolflare = async (
  context: TStakingContext,
  openLinkIfMissing: boolean,
): Promise<boolean> => {
  if (!window.solflare?.isSolflare) {
    if (openLinkIfMissing) {
      window.open("https://solflare.com/", "_blank");
    }

    return false;
  }

  return new Promise(async (resolve, reject) => {
    let resolvedItems = 0;

    const hasMainnetWallet = solanaNetworks.has(StakingNetworkId.Solana);

    const hasDevnetWallet =
      ENABLE_TESTNETS && solanaNetworks.has(StakingNetworkId.SolanaDevnet);

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
            name: "Solflare Wallet",
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

          const totalItems = [hasMainnetWallet, hasDevnetWallet].filter(
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

    if (hasDevnetWallet) {
      if (connectListenerDevnet)
        devnetWallet.off("connect", connectListenerDevnet);

      connectListenerDevnet = getListener(
        devnetWallet,
        StakingNetworkId.SolanaDevnet,
      );

      devnetWallet.on("connect", connectListenerDevnet);
    }

    await Promise.all([
      hasMainnetWallet ? mainnetWallet.connect() : Promise.resolve(),
      hasDevnetWallet ? devnetWallet.connect() : Promise.resolve(),
    ]).catch((err) => {
      if (!err) {
        // This means that the user closed the popup or rejected the connection
        resolve(false);
      }

      reject(err);
    });
  });
};

export const tryToConnectPhantom = async (
  context: TStakingContext,
  openLinkIfMissing: boolean,
  walletErrorMap: WalletErrorMap = {},
) => {
  const { phantom } = window;
  const provider = phantom?.solana;

  if (provider?.isPhantom) {
    let publicKey: string;

    try {
      // https://docs.phantom.app/solana/establishing-a-connection
      const resp = await provider.connect();

      publicKey = resp.publicKey.toString();
    } catch (error: any) {
      if (error?.message?.includes("User rejected the request")) {
        return false;
      }

      toastError({
        title: walletErrorMap.phantomCreateWallet,
      });

      return false;
    }

    return [StakingNetworkId.Solana]
      .concat(ENABLE_TESTNETS ? [StakingNetworkId.SolanaDevnet] : [])
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
          name: "Phantom Wallet",
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

// In mainnet less than 0.01 SOL it gives an error from the wallet estimation.
export const minimumSolanaStakeAmount: { [key in StakingNetworkId]?: Coin } = {
  [StakingNetworkId.Solana]: {
    amount: "0.01",
    denom: "SOL",
  },
  [StakingNetworkId.SolanaDevnet]: {
    amount: "0.001",
    denom: "SOL",
  },
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

  const wallet = {
    [StakingNetworkId.Solana]: mainnetWallet,
    [StakingNetworkId.SolanaDevnet]: devnetWallet,
  }[account.networkId as string];

  if (!wallet) throw new Error("Unexpected wallet");

  return wallet;
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

      const minimumAmount = minimumSolanaStakeAmount[account.networkId] || {
        amount: "0",
        denom: "SOL",
      };

      const amountBN = new BigNumber(amount);

      if (amountBN.lt(normaliseCoin(minimumAmount).amount)) {
        return {
          coin: minimumAmount,
          error: StakeError.MinimumAmount,
          success: false,
        };
      }

      const amountToStake = amountBN.times(LAMPORTS_PER_SOL).toNumber();

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

      if (isCloseError(error)) {
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

      if (isCloseError(error)) {
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

export const withdrawnUnstakedSolana = async ({
  account,
  stakeAccountAddress,
}: WithdrawUnstakedOpts): Promise<
  WalletOperationResult<WithdrawUnstakedError>
> =>
  stakingClient
    // It sends and incorrect amount of 10, which is not used
    .stake(account.networkId, account.address, "10")
    .then(async (info) => {
      const accountKey = new PublicKey(account.address);
      const stakeAccountKey = new PublicKey(stakeAccountAddress);

      const stakeAccount = account.info?.stakeAccounts?.find(
        (item) => item.address === stakeAccountAddress,
      );

      if (!stakeAccount) {
        return {
          error: WithdrawUnstakedError.Unknown,
          success: false,
        };
      }

      const wallet = getWalletApi(account);

      const tx = StakeProgram.withdraw({
        authorizedPubkey: accountKey,
        lamports: Number(stakeAccount.amount),
        stakePubkey: stakeAccountKey,
        toPubkey: accountKey,
      });

      tx.recentBlockhash = (info as any).blockhash;
      tx.feePayer = accountKey;

      const stakeAccountResult = await wallet.signAndSendTransaction(tx);

      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: result", stakeAccountResult);

      return { success: true } as const;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("debug: solana.ts: error", error);

      if (error instanceof Error && isCloseError(error)) {
        return {
          error: WithdrawUnstakedError.None,
          success: false,
        };
      }

      return {
        error: WithdrawUnstakedError.Unknown,
        success: false,
      };
    });

export const disconnectSolflare = async () => {
  (
    [
      [mainnetWallet, connectListenerMainnet],
      [devnetWallet, connectListenerDevnet],
    ] as const
  ).forEach(([wallet, listener]) => {
    if (listener) {
      wallet.off("connect", listener);
      wallet.disconnect();
    }
  });
};

export const disconnectPhantom = async () => {
  const { phantom } = window as any;
  const provider = phantom?.solana;

  if (provider?.isPhantom) {
    await provider.disconnect();
  }
};

// Haven't found a way to detect if the user is using Ledger when staking with
// Solflare. This displays a message when detecting that the modal was closed
// without staking (at most once per day).
export const handleSolflareClose = () => {
  if (getSolflareCloseNotified()) return;

  setSolflareCloseNotified();

  toastInfo({
    title: (
      <Trans
        components={[
          // No content here since it is added by the i18n library
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          <a
            href="https://support.ledger.com/hc/en-us/articles/4499092909085-Allowing-blind-signing-in-the-Solana-SOL-app?docs=true"
            key="0"
            rel="noopener noreferrer"
            target="_blank"
          />,
        ]}
        i18nKey="solflareCloseMsg"
        ns="staking"
      />
    ),
  });
};
