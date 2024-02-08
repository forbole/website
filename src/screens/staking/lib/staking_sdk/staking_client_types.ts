export type StakingInfoResponse = {
  apy: null | number;
  chain_id: string;
  denom: string;
  exponent: number;
  network: string;
  rpc: string;
  staked_tokens: null | string;
  staking_ratio: null | number;
  ticker: string;
  /** Amount in seconds */
  unbonding_period: null | string;
  validator_address: string;
  voting_power: number;
  voting_power_percentage: null | number;
};

type Unbonding = {
  balance: string;
  completion_time: {
    nanos: number;
    seconds: string;
  } | null;
};

type Coin = {
  amount: string;
  denom: string;
};

export type AccountDetailResponse = {
  account_number: null | number;
  address: string;
  balances: Coin | null;
  delegation: Coin | Coin[] | null;
  network: string;
  sequence: null | number;
  unbonding: Unbonding[];
};

export type ClaimableRewardsResponse = Coin[] | Record<string, never>;
