import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import type { StakingNetworkId } from "@src/screens/staking/lib/staking_sdk/core";

import { normaliseCoin } from "./utils/coins";

const baseUrl = process.env.NEXT_PUBLIC_STAKING_API;

if (!baseUrl && typeof window !== "undefined") {
  throw new Error("NEXT_PUBLIC_STAKING_API is not set");
}

const parsedBaseUrl = (baseUrl || "").replace(/\/$/, "");

type Options = {
  body?: FormData | string;
  headers?: Record<string, string>;
  method?: "GET" | "POST";
};

const fetchJson = <A = any>(uri: string, opts?: Options): Promise<A> =>
  fetch(parsedBaseUrl + uri, {
    ...opts,
    headers: {
      ...opts?.headers,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const rewardsDivisor = new BigNumber(10).pow(18);

const parseStakingRewards = async (res: GetRewardsResponse) =>
  Array.isArray(res)
    ? res
        .map((coin) => {
          const num = new BigNumber(coin.amount);

          return {
            amount: num.dividedBy(rewardsDivisor).toString(),
            denom: coin.denom,
          };
        })
        .map(normaliseCoin)
    : res;

type StakeResponse = {
  tx: {
    authInfo: {
      fee: {
        amount: Array<{ amount: string; denom: string }>;
        gas_limit: string;
      };
    };
    body: {
      memo: string;
      messages: Array<{
        "@type": string;
        "amount": { amount: string; denom: string };
        "delegator_address": string;
        "validator_address": string;
      }>;
    };
  };
};

export type GetAddressInfoResponse = {
  balances: { amount: string; denom: string };
  delegation: { amount: string; denom: string };
};

export type GetRewardsResponse = Array<Coin> | Record<string, never>;

type GetStakingInfoResponse = {
  apy: number;
  rpc: string;
  unbonding_period: number;
};

export const stakingClient = {
  broadcast: async (network: StakingNetworkId, body: unknown) =>
    fetchJson(`/api/broadcast/${network}`, {
      body: JSON.stringify(body),
      method: "POST",
    }),
  claimRewards: async (network: StakingNetworkId, address: string) =>
    fetchJson(`/api/claim_rewards`, {
      body: JSON.stringify({
        address,
        network,
      }),
      method: "POST",
    }),
  getAddressInfo: async (network: StakingNetworkId, address: string) =>
    fetchJson<GetAddressInfoResponse>(`/api/address/${network}/${address}`),

  getRewardsInfo: async (network: StakingNetworkId, address: string) =>
    fetchJson<GetRewardsResponse>(`/api/rewards/${network}/${address}`).then(
      parseStakingRewards,
    ),
  getStakingInfo: async (network: StakingNetworkId) =>
    fetchJson<GetStakingInfoResponse>(`/api/staking_info/${network}`),
  stake: async (network: StakingNetworkId, address: string, amount: string) =>
    fetchJson<StakeResponse>(`/api/stake`, {
      body: JSON.stringify({
        address,
        amount,
        network,
      }),
      method: "POST",
    }),
  unstake: async (network: StakingNetworkId, address: string, amount: string) =>
    fetchJson(`/api/unstake`, {
      body: JSON.stringify({
        address,
        amount,
        network,
      }),
      method: "POST",
    }),
};
