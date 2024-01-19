import type {
  Coin,
  MsgDelegateEncodeObject,
  MsgUndelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  StdFee,
} from "@cosmjs/stargate";
import { SigningStargateClient } from "@cosmjs/stargate";
import type { AccountData } from "@keplr-wallet/types";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import {
  MsgDelegate,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";

import { toastSuccess } from "@src/components/notification";
import { IS_E2E } from "@src/utils/e2e";

import { setUserWallet } from "./context";
import type {
  Account,
  SetState,
  StakingNetworkId,
  State,
  TStakingContext,
  Wallet,
} from "./core";
import { WalletId, keplrNetworks, networksWithStaking } from "./core";
import { stakingClient } from "./staking_client";
import { addToConnectedWallets, getConnectedWallets } from "./utils/storage";

export const MAX_MEMO = 256;

const handleKeplrSignError = (err: Error) => {
  // eslint-disable-next-line no-console
  console.log("debug: index.tsx: err", err);

  return {
    hasError: !err?.message?.includes("rejected"),
    success: false,
  };
};

type WalletOperationResult =
  | {
      hasError: boolean;
      success: false;
    }
  | {
      success: true;
    };

type StakeOpts = {
  account: Account;
  amount: string;
  memo: string;
};

export const stakeAmount = ({
  account,
  amount,
  memo,
}: StakeOpts): Promise<WalletOperationResult> =>
  stakingClient
    .stake(account.networkId, account.address, amount)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return { hasError: true, success: false };

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

      const fee: StdFee = {
        amount: info.tx.authInfo.fee.amount,
        gas: info.tx.authInfo.fee.gas_limit,
      };

      const offlineSigner = window.keplr?.getOfflineSignerOnlyAmino(
        account.networkId,
      );

      if (!offlineSigner) {
        throw new Error("Can't get offline signer");
      }

      const client = await SigningStargateClient.connectWithSigner(
        networkInfo.rpc,
        offlineSigner,
      );

      return client
        .signAndBroadcast(account.address, [msgAny], fee, memo)
        .then(() => ({ success: true }) as const)
        .catch(handleKeplrSignError);
    });

type ClaimOpts = {
  address: string;
  networkId: StakingNetworkId;
};

export const claimRewards = async (
  opts: ClaimOpts,
): Promise<WalletOperationResult> =>
  stakingClient
    .claimRewards(opts.networkId, opts.address)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return { hasError: true, success: false };

      const networkInfo = await stakingClient.getStakingInfo(opts.networkId);

      const msg = MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: message.delegator_address,
        validatorAddress: message.validator_address,
      });

      const msgAny: MsgWithdrawDelegatorRewardEncodeObject = {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: msg,
      };

      const fee: StdFee = {
        amount: info.tx.authInfo.fee.amount,
        gas: info.tx.authInfo.fee.gas_limit,
      };

      const offlineSigner = window.keplr?.getOfflineSignerOnlyAmino(
        opts.networkId,
      );

      if (!offlineSigner) {
        throw new Error("Can't get offline signer");
      }

      const client = await SigningStargateClient.connectWithSigner(
        networkInfo.rpc,
        offlineSigner,
      );

      return client
        .signAndBroadcast(opts.address, [msgAny], fee)
        .then(() => ({ success: true }) as const)
        .catch(handleKeplrSignError);
    });

export const getClaimRewardsFee = async (
  opts: ClaimOpts,
): Promise<Coin | null> =>
  stakingClient.claimRewards(opts.networkId, opts.address).then((info) => {
    const [message] = info.tx.body.messages;

    if (!message) return null;

    return info.tx.authInfo.fee.amount?.[0] ?? null;
  });

type UnstakeAmount = {
  account: Account;
  amount: string;
};

export const unstake = async (
  opts: UnstakeAmount,
): Promise<WalletOperationResult> =>
  stakingClient
    .unstake(opts.account.networkId, opts.account.address, opts.amount)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return { hasError: true, success: false };

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

      const fee: StdFee = {
        amount: info.tx.authInfo.fee.amount,
        gas: info.tx.authInfo.fee.gas_limit,
      };

      const offlineSigner = window.keplr?.getOfflineSignerOnlyAmino(
        opts.account.networkId,
      );

      if (!offlineSigner) {
        throw new Error("Can't get offline signer");
      }

      const client = await SigningStargateClient.connectWithSigner(
        networkInfo.rpc,
        offlineSigner,
      );

      return client
        .signAndBroadcast(opts.account.address, [msgAny], fee, "")
        .then(() => ({ success: true }) as const)
        .catch(handleKeplrSignError);
    });

export const tryToConnectWallets = async (
  stakingState: State,
  setStakingState: SetState,
  walletsIds: WalletId[],
) => {
  if (walletsIds.includes(WalletId.Keplr)) {
    if (window.keplr) {
      const chainsToConnect = Array.from(keplrNetworks);

      await window.keplr.enable(chainsToConnect);

      try {
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
                  stakingClient.getAddressInfo(networkId, account.address),
                  stakingClient.getRewardsInfo(networkId, account.address),
                  window.keplr!.getKey(networkId),
                ]).then(([info, rewards, key]) => {
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
          stakingState,
          setStakingState,
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
    }
  }
};

export const disconnecKeplr = async (networks: StakingNetworkId[]) => {
  await window.keplr?.disable(networks).catch((err) => {
    // eslint-disable-next-line no-console
    console.log("Disable Error", err);
  });
};

export const useWalletsListeners = (contextValue: TStakingContext) => {
  const { t } = useTranslation("staking");

  useEffect(() => {
    const listener = () => {
      const connectedWallets = getConnectedWallets();

      if (connectedWallets.includes(WalletId.Keplr)) {
        toastSuccess({
          title: t("keplrWalletUpdate"),
        });

        tryToConnectWallets(contextValue.state, contextValue.setState, [
          WalletId.Keplr,
        ]);
      }
    };

    window.addEventListener("keplr_keystorechange", listener);

    if (IS_E2E || process.env.NODE_ENV === "development") {
      (window as any).stakingContext = contextValue;
    }

    return () => {
      window.removeEventListener("keplr_keystorechange", listener);
    };
  }, [contextValue, t]);
};

export const getCanStakeToAnyWallet = () =>
  typeof window !== "undefined" && (!!window.keplr || IS_E2E);
