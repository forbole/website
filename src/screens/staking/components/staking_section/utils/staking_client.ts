const baseUrl = process.env.NEXT_PUBLIC_STAKING_API as string;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_STAKING_API is not set");
}

const parsedBaseUrl = baseUrl.replace(/\/$/, "");

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

type NetworkName = "cosmoshub" | "theta-testnet-001";

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

export const stakingClient = {
  broadcast: async (network: NetworkName, body: unknown) =>
    fetchJson(`/api/broadcast/${network}`, {
      body: JSON.stringify(body),
      method: "POST",
    }),
  claimRewards: async (network: NetworkName, address: string) =>
    fetchJson(`/api/claim_rewards`, {
      body: JSON.stringify({
        address,
        network,
      }),
      method: "POST",
    }),
  getAdressInfo: async (network: NetworkName, address: string) =>
    fetchJson(`/api/address/${network}/${address}`),

  getRewardsInfo: async (network: NetworkName, address: string) =>
    fetchJson(`/api/rewards/${network}/${address}`),
  getStakingInfo: async (network: NetworkName) =>
    fetchJson(`/api/staking_info/${network}`),
  stake: async (network: NetworkName, address: string, amount: string) =>
    fetchJson<StakeResponse>(`/api/stake`, {
      body: JSON.stringify({
        address,
        amount,
        network,
      }),
      method: "POST",
    }),
  unstake: async (network: NetworkName, address: string, amount: string) =>
    fetchJson(`/api/unstake`, {
      body: JSON.stringify({
        address,
        amount,
        network,
      }),
      method: "POST",
    }),
};
