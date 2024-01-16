// @TODO

/* eslint-disable no-console */
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

import { stakingClient } from "@src/screens/staking/components/staking_section/utils/staking_client";

import { setUserWallet } from ".";
import type { Account, ChainId, SetState, State, Wallet } from "./types";
import { WalletId, keplrNetworks, networksWithStaking } from "./types";
import { addToConnectedWallets } from "./utils";

type StakeOpts = {
  account: Account;
  amount: string;
  memo: string;
};

export const stakeAmount = ({ account, amount, memo }: StakeOpts) =>
  stakingClient
    .stake(account.chainId, account.address, amount)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return;

      const networkInfo = await stakingClient.getStakingInfo(account.chainId);

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
        account.chainId,
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
        .then(() => true)
        .catch((err) => {
          console.log("debug: index.tsx: err", err);

          return false;
        });
    });

type ClaimOpts = {
  address: string;
  chainId: ChainId;
};

export const claimRewards = async (opts: ClaimOpts) =>
  stakingClient.claimRewards(opts.chainId, opts.address).then(async (info) => {
    const [message] = info.tx.body.messages;

    if (!message) return;

    const networkInfo = await stakingClient.getStakingInfo(opts.chainId);

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

    const offlineSigner = window.keplr?.getOfflineSignerOnlyAmino(opts.chainId);

    if (!offlineSigner) {
      throw new Error("Can't get offline signer");
    }

    const client = await SigningStargateClient.connectWithSigner(
      networkInfo.rpc,
      offlineSigner,
    );

    return client
      .signAndBroadcast(opts.address, [msgAny], fee)
      .then(() => true)
      .catch((err) => {
        console.log("debug: index.tsx: err", err);

        return false;
      });
  });

export const getClaimRewardsFee = async (
  opts: ClaimOpts,
): Promise<Coin | null> =>
  stakingClient.claimRewards(opts.chainId, opts.address).then((info) => {
    const [message] = info.tx.body.messages;

    if (!message) return null;

    return info.tx.authInfo.fee.amount?.[0] ?? null;
  });

type UnstakeAmount = {
  account: Account;
  amount: string;
};

export const unstake = async (opts: UnstakeAmount) =>
  stakingClient
    .unstake(opts.account.chainId, opts.account.address, opts.amount)
    .then(async (info) => {
      const [message] = info.tx.body.messages;

      if (!message) return;

      const networkInfo = await stakingClient.getStakingInfo(
        opts.account.chainId,
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
        opts.account.chainId,
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
        .then(() => true)
        .catch((err) => {
          console.log("debug: index.tsx: err", err);

          return false;
        });
    });

export const tryToConnectWallets = async (
  stakingState: State,
  setStakingState: SetState,
  walletsIds: WalletId[],
) => {
  if (walletsIds.includes(WalletId.Keplr)) {
    if (window.keplr) {
      const chainsToConnect = Array.from(keplrNetworks);

      await window.keplr?.enable(chainsToConnect);

      try {
        const handleError = (err: unknown) => {
          console.log("debug: index.tsx: err", err);

          return [] as Account[];
        };

        let walletName = "";

        const parseAccounts =
          (chainId: ChainId) =>
          (accounts: readonly AccountData[]): Promise<Account[]> =>
            Promise.all(
              accounts.map((account) =>
                Promise.all([
                  stakingClient.getAddressInfo(chainId, account.address),
                  stakingClient.getRewardsInfo(chainId, account.address),
                  window.keplr!.getKey(chainId),
                ]).then(([info, rewards, key]) => {
                  if (key?.name) {
                    walletName = key.name;
                  }

                  return {
                    address: account.address,
                    chainId,
                    info,
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
                chainId: network,
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
                acc.networks[networkObj.chainId] = {
                  accounts: networkObj.accounts,
                  chainId: networkObj.chainId,
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
        console.log(error);
      }
    }
  }
};
