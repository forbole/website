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
import {
  WalletId,
  keplrNetworks,
  leapNetworks,
  networksWithStaking,
} from "./core";
import { stakingClient } from "./staking_client";
import { addToConnectedWallets, getConnectedWallets } from "./utils/storage";

export const MAX_MEMO = 256;

const getIsCosmosError = (err: Error): boolean | null => {
  // eslint-disable-next-line no-console
  console.log("debug: index.tsx: err", err);

  if (err?.message?.includes("transaction indexing is disabled")) {
    return null;
  }

  // This appears to be fine, since the transaction is still broadcasted
  return (
    // Keplr message
    !err?.message?.includes("rejected") &&
    // Leap message
    !err?.message?.includes("declined")
  );
};

type WalletOperationResult<ErrorType> =
  | {
      error: ErrorType;
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

export enum StakeError {
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Unknown = "Unknown",
}

export const stakeAmount = ({
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

      const fee: StdFee = {
        amount: info.tx.authInfo.fee.amount,
        gas: info.tx.authInfo.fee.gas_limit,
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

      return client
        .signAndBroadcast(account.address, [msgAny], fee, memo)
        .then((result) => {
          const hasDelegated = !!result?.events?.find(
            (ev) => ev.type === "delegate",
          );

          return hasDelegated
            ? ({ success: true } as const)
            : { error: StakeError.NotEnoughGas, success: false };
        })
        .catch((err) => {
          const isCosmosError = getIsCosmosError(err);

          if (isCosmosError === null) {
            return { success: true };
          }

          return {
            error: isCosmosError ? StakeError.Unknown : StakeError.None,
            success: false,
          };
        });
    });

type ClaimOpts = {
  account: Account;
};

export enum ClaimRewardsError {
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Unknown = "Unknown",
}

export const claimRewards = async ({
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

      const fee: StdFee = {
        amount: info.tx.authInfo.fee.amount,
        gas: info.tx.authInfo.fee.gas_limit,
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

      return client
        .signAndBroadcast(account.address, [msgAny], fee)
        .then((result) => {
          const hasClaimed = !!result?.events?.find(
            (ev) => ev.type === "withdraw_rewards",
          );

          return hasClaimed
            ? ({ success: true } as const)
            : { error: ClaimRewardsError.NotEnoughGas, success: false };
        })
        .catch((err) => {
          const isCosmosError = getIsCosmosError(err);

          if (isCosmosError === null) {
            return { success: true };
          }

          return {
            error: isCosmosError
              ? ClaimRewardsError.Unknown
              : ClaimRewardsError.None,
            success: false,
          };
        });
    });

export const getClaimRewardsFee = async ({
  account,
}: ClaimOpts): Promise<Coin | null> =>
  stakingClient
    .claimRewards(account.networkId, account.address)
    .then((info) => {
      const [message] = info.tx.body.messages;

      if (!message) return null;

      return info.tx.authInfo.fee.amount?.[0] ?? null;
    });

type UnstakeAmount = {
  account: Account;
  amount: string;
};

export enum UnstakeError {
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Unknown = "Unknown",
}

export const unstake = async (
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

      const fee: StdFee = {
        amount: info.tx.authInfo.fee.amount,
        gas: info.tx.authInfo.fee.gas_limit,
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

      return client
        .signAndBroadcast(opts.account.address, [msgAny], fee, "")
        .then((result) => {
          const hasUnbonded = !!result?.events?.find(
            (ev) => ev.type === "unbond",
          );

          return hasUnbonded
            ? ({ success: true } as const)
            : {
                error: UnstakeError.NotEnoughGas,
                success: false,
              };
        })
        .catch((err) => {
          const isCosmosError = getIsCosmosError(err);

          if (isCosmosError === null) {
            return { success: true };
          }

          return {
            error: isCosmosError ? UnstakeError.Unknown : UnstakeError.None,
            success: false,
          };
        });
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

const tryToConnectLeap = async (
  context: TStakingContext,
  openLinkIfMissing: boolean,
) => {
  if (window.leap) {
    const chainsToConnect = Array.from(leapNetworks);

    await window.leap.enable(chainsToConnect);

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
                window.leap!.getKey(networkId),
              ]).then(([info, rewards, key]) => {
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

      case WalletId.Leap:
        connected = await tryToConnectLeap(context, openLinkIfMissing);
        break;

      default: {
        walletId satisfies never;
      }
    }
  }

  return connected;
};

const disconnecKeplr = async (networks: StakingNetworkId[]) => {
  await window.keplr?.disable(networks).catch((err) => {
    // eslint-disable-next-line no-console
    console.log("Disable Error", err);
  });
};

const disconnectLeap = async (networks: StakingNetworkId[]) => {
  await (window.leap as any).disconnect(networks).catch((err: any) => {
    // eslint-disable-next-line no-console
    console.log("Disable Error", err);
  });
};

export const disconnectWalletFns: Record<
  WalletId,
  (n: StakingNetworkId[]) => Promise<void>
> = {
  [WalletId.Keplr]: disconnecKeplr,
  [WalletId.Leap]: disconnectLeap,
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
    window.addEventListener("leap_keystorechange", listener);

    return () => {
      window.removeEventListener("keplr_keystorechange", listener);
      window.removeEventListener("leap_keystorechange", listener);
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

    case WalletId.Leap:
      return leapNetworks.has(networkId as StakingNetworkId);

    default: {
      wallet satisfies never;

      return false;
    }
  }
};
