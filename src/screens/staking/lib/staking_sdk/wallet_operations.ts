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

import type { TStakingContext } from "./context";
import { setUserWallet } from "./context/actions";
import type { Account, StakingNetworkId, Wallet } from "./core";
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

const tryToConnectKeplr = async (
  context: TStakingContext,
  openLinkIfMissing: boolean,
) => {
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

export const tryToConnectWallets = async (
  context: TStakingContext,
  walletsIds: WalletId[],
  openLinkIfMissing = false,
) => {
  let connected = true as boolean | undefined;

  for (const walletId of walletsIds) {
    switch (walletId) {
      case WalletId.Keplr:
        connected = await tryToConnectKeplr(context, openLinkIfMissing);
        break;

      default: {
        walletId satisfies never;
      }
    }
  }

  return connected;
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

        tryToConnectWallets(contextValue, [WalletId.Keplr]);
      }
    };

    window.addEventListener("keplr_keystorechange", listener);

    return () => {
      window.removeEventListener("keplr_keystorechange", listener);
    };
  }, [contextValue, t]);
};

export const doesWalletSupportNetwork = (
  wallet: WalletId,
  networkId: string,
) => {
  switch (wallet) {
    case WalletId.Keplr:
      return keplrNetworks.has(networkId as StakingNetworkId);

    default: {
      wallet satisfies never;

      return false;
    }
  }
};
