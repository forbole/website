import type { Account } from "../core";
import type { Coin } from "../core/base";
import type { StakeAccount } from "../staking_client_types";

export type WalletOperationResult<ErrorType> =
  | {
      coin?: Coin;
      error: ErrorType;
      success: false;
    }
  | {
      success: true;
    };

export type StakeOpts = {
  account: Account;
  amount: string;
  memo: string;
};

export type UnstakeAmount = {
  account: Account;
  amount: string;
  memo: string;
  stakeAccount?: StakeAccount | undefined;
};

export enum UnstakeError {
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Unknown = "Unknown",
}

export type WalletErrorMap = {
  leapCreateWallet?: string;
  phantomCreateWallet?: string;
};

export enum StakeError {
  MinimumAmount = "MinimumAmount",
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Unknown = "Unknown",
}

export enum WithdrawUnstakedError {
  None = "None",
  Unknown = "Unknown",
}

export type WithdrawUnstakedOpts = {
  account: Account;
  stakeAccountAddress: string;
};

export type ClaimOpts = {
  account: Account;
};

export enum ClaimRewardsError {
  None = "None",
  NotEnoughGas = "NotEnoughGas",
  Unknown = "Unknown",
}
