// @TODO

/* eslint-disable no-console */
import type {
  MsgDelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  StdFee,
} from "@cosmjs/stargate";
import { SigningStargateClient } from "@cosmjs/stargate";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgDelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";

import { stakingClient } from "@src/screens/staking/components/staking_section/utils/staking_client";

import type { ChainId } from "./index";

type StakeOpts = {
  address: string;
  chainId: ChainId;
  memo: string;
};

export const stakeAmount = ({ address, chainId, memo }: StakeOpts) => {
  stakingClient.stake(chainId, address, "1").then(async (info) => {
    const message = info.tx.body.messages[0];

    if (!message) return;

    const networkInfo = await stakingClient.getStakingInfo(chainId);

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

    const offlineSigner = window.keplr?.getOfflineSignerOnlyAmino(chainId);

    if (!offlineSigner) {
      throw new Error("Can't get offline signer");
    }

    const client = await SigningStargateClient.connectWithSigner(
      networkInfo.rpc,
      offlineSigner,
    );

    client
      .signAndBroadcast(address, [msgAny], fee, memo)
      .then((signed) => {
        console.log("debug: index.tsx: signed", signed);
      })
      .catch((err) => {
        console.log("debug: index.tsx: err", err);
      });
  });
};

type ClaimOpts = {
  address: string;
  chainId: ChainId;
};

export const claimRewards = async (opts: ClaimOpts) => {
  stakingClient.claimRewards(opts.chainId, opts.address).then(async (info) => {
    const message = info.tx.body.messages[0];

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

    client
      .signAndBroadcast(opts.address, [msgAny], fee)
      .then((signed) => {
        console.log("debug: index.tsx: signed", signed);
      })
      .catch((err) => {
        console.log("debug: index.tsx: err", err);
      });
  });
};
