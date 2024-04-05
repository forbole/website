import BigNumber from "bignumber.js";

import type { StakingNetworkId } from "./core/base";
import { cosmosStakingNetworks } from "./core/cosmos";
import type {
  AccountDetailResponse,
  ClaimableRewardsResponse,
  StakingInfoResponse,
} from "./staking_client_types";
import { normaliseCoin, unnormalisedDenomToNetwork } from "./utils/coins";

const baseUrl =
  process.env.NEXT_PUBLIC_STAKING_API || "https://staking-api.forbole.com";

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

// @TODO: Review with cosmos chains
const getRewardsDivisor = (denom: string) => {
  const network = unnormalisedDenomToNetwork[denom.toUpperCase()];

  if (cosmosStakingNetworks.has(network as StakingNetworkId)) {
    return new BigNumber(10).pow(18);
  }

  return 1;
};

const parseStakingRewards = async (res: ClaimableRewardsResponse) =>
  Array.isArray(res)
    ? res.map((reward) => {
        const { coin } = reward;
        const num = new BigNumber(coin.amount);
        const rewardsDivisor = getRewardsDivisor(coin.denom);

        return {
          ...reward,
          coin: normaliseCoin({
            amount: num.dividedBy(rewardsDivisor).toString(),
            denom: coin.denom,
          }),
        };
      })
    : res;

type StakeResponse = {
  ethAccount?: {
    account_number: string;
    sequence: number;
  };
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
    fetchJson<AccountDetailResponse>(`/api/address/${network}/${address}`),

  getRewardsInfo: async (network: StakingNetworkId, address: string) =>
    fetchJson<ClaimableRewardsResponse>(
      `/api/rewards/${network}/${address}`,
    ).then(parseStakingRewards),
  getStakingInfo: async (network: StakingNetworkId) =>
    fetchJson<StakingInfoResponse>(`/api/staking_info/${network}`),
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
