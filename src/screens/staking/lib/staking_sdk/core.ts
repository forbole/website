import type { NetworkKey } from "@src/utils/network_info";

import type {
  AccountDetailResponse,
  ClaimableRewardsResponse,
} from "./staking_client_types";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export type Coin = {
  amount: string;
  denom: string;
};

export enum WalletId {
  Keplr = "keplr",
  Leap = "leap",
}

export enum CoinDenom {
  AKT = "AKT",
  ATOM = "ATOM",
  DYDX = "DYDX",
  OSMO = "OSMO",
  PICA = "PICA",
  REGEN = "REGEN",
  TIA = "TIA",
}

// For now these values match the id in the chain registry:
// - https://github.com/cosmos/chain-registry
// - https://github.com/cosmos/chain-registry/tree/master/testnets
export enum StakingNetworkId {
  Akash = "akashnet-2",
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  ComposableFinance = "centauri-1",
  CosmosHub = "cosmoshub-4",
  CosmosHubTestnet = "theta-testnet-001",
  DyDx = "dydx-mainnet-1",
  Osmosis = "osmosis-1",
  Regen = "regen-1",
}

export const mainNetworkDenom: Record<StakingNetworkId, CoinDenom | null> = {
  [StakingNetworkId.Akash]: CoinDenom.AKT,
  [StakingNetworkId.Celestia]: CoinDenom.TIA,
  [StakingNetworkId.CelestiaTestnet]: CoinDenom.TIA,
  [StakingNetworkId.ComposableFinance]: CoinDenom.PICA,
  [StakingNetworkId.CosmosHub]: CoinDenom.ATOM,
  [StakingNetworkId.CosmosHubTestnet]: CoinDenom.ATOM,
  [StakingNetworkId.DyDx]: CoinDenom.DYDX,
  [StakingNetworkId.Osmosis]: CoinDenom.OSMO,
  [StakingNetworkId.Regen]: CoinDenom.REGEN,
};

export const testnetNetworks = new Set([
  StakingNetworkId.CosmosHubTestnet,
  StakingNetworkId.CelestiaTestnet,
]);

export const keplrNetworks = new Set(
  [
    StakingNetworkId.Akash,
    StakingNetworkId.Celestia,
    StakingNetworkId.CelestiaTestnet,
    StakingNetworkId.ComposableFinance,
    StakingNetworkId.CosmosHub,
    StakingNetworkId.CosmosHubTestnet,
    StakingNetworkId.DyDx,
    StakingNetworkId.Osmosis,
    StakingNetworkId.Regen,
  ].filter(
    ENABLE_TESTNETS ? () => true : (network) => !testnetNetworks.has(network),
  ),
);

export const keplrNonNativeChains = new Set([
  StakingNetworkId.ComposableFinance,
  StakingNetworkId.CelestiaTestnet,
  StakingNetworkId.CosmosHubTestnet,
]);

const leapExcludedNetworks = new Set([
  StakingNetworkId.Celestia,
  StakingNetworkId.ComposableFinance,
  StakingNetworkId.DyDx,
  StakingNetworkId.Regen,
]);

export const leapNetworks = new Set(
  Array.from(keplrNetworks).filter(
    (network) => !leapExcludedNetworks.has(network),
  ),
);

export const networksWithStaking = new Set([...Array.from(keplrNetworks)]);

export const walletsSupported = new Set([WalletId.Keplr, WalletId.Leap]);

export const networkIdToNetworkKey: Record<StakingNetworkId, NetworkKey> = {
  [StakingNetworkId.Akash]: "akash",
  [StakingNetworkId.Celestia]: "celestia",
  [StakingNetworkId.CelestiaTestnet]: "celestia-testnet",
  [StakingNetworkId.ComposableFinance]: "composable-finance",
  [StakingNetworkId.CosmosHub]: "cosmos",
  [StakingNetworkId.CosmosHubTestnet]: "cosmos-testnet",
  [StakingNetworkId.DyDx]: "dydx",
  [StakingNetworkId.Osmosis]: "osmosis",
  [StakingNetworkId.Regen]: "regen",
};

export const networkKeyToNetworkId: { [key in NetworkKey]?: StakingNetworkId } =
  Object.fromEntries(
    Object.entries(networkIdToNetworkKey)
      .filter(([k]) => networksWithStaking.has(k as StakingNetworkId))
      .map(([k, v]) => [v, k]),
  );

export type Account = {
  address: string;
  info?: AccountDetailResponse;
  networkId: StakingNetworkId;
  rewards?: ClaimableRewardsResponse;
  wallet: WalletId;
};

type StakeAction = "claim_rewards" | "connect_wallet" | "stake" | "unstake";

export type Wallet = {
  name?: string;
  networks: {
    [key in StakingNetworkId]?: {
      accounts: Account[];
      networkId: StakingNetworkId;
    };
  };
  wallet: WalletId;
};

type SelectedAccount = {
  address: string;
  networkId: StakingNetworkId;
  wallet: WalletId;
};

export type NetworkInfo = {
  apy: number;
  rpc: string;
  unbonding_period: null | string;
  voting_power: number;
};

export type State = {
  coinsPrices: { [key in CoinDenom]?: string };
  hasInit: boolean;
  networksInfo: { [key in StakingNetworkId]?: NetworkInfo };
  selectedAccount: null | SelectedAccount;
  selectedAction: null | StakeAction;
  wallets: { [key in WalletId]?: Wallet };
};
