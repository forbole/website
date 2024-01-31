import type { NetworkKey } from "@src/utils/network_info";

import type {
  GetAddressInfoResponse,
  GetRewardsResponse,
} from "./staking_client";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export enum WalletId {
  Keplr = "keplr",
  Leap = "leap",
}

export enum CoinDenom {
  AKT = "AKT",
  ATOM = "ATOM",
  DYDX = "DYDX",
  NOIS = "NOIS",
  TIA = "TIA",
}

// For now these values match the id in the chain registry:
// - https://github.com/cosmos/chain-registry
// - https://github.com/cosmos/chain-registry/tree/master/testnets
export enum StakingNetworkId {
  Akash = "akashnet-2",
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  CosmosHub = "cosmoshub-4",
  CosmosHubTestnet = "theta-testnet-001",
  DyDx = "dydx-mainnet-1",
}

export const mainNetworkDenom: Record<StakingNetworkId, CoinDenom | null> = {
  [StakingNetworkId.Akash]: CoinDenom.AKT,
  [StakingNetworkId.Celestia]: CoinDenom.TIA,
  [StakingNetworkId.CelestiaTestnet]: CoinDenom.TIA,
  [StakingNetworkId.CosmosHub]: CoinDenom.ATOM,
  [StakingNetworkId.CosmosHubTestnet]: CoinDenom.ATOM,
  [StakingNetworkId.DyDx]: CoinDenom.DYDX,
};

export const testnetNetworks = new Set([
  StakingNetworkId.CosmosHubTestnet,
  StakingNetworkId.CelestiaTestnet,
]);

export const keplrNetworks = new Set(
  [
    StakingNetworkId.Akash,
    StakingNetworkId.CosmosHubTestnet,
    StakingNetworkId.CelestiaTestnet,
    StakingNetworkId.CosmosHub,
    StakingNetworkId.Celestia,
    StakingNetworkId.DyDx,
  ].filter(
    ENABLE_TESTNETS ? () => true : (network) => !testnetNetworks.has(network),
  ),
);

export const leapNetworks = keplrNetworks;

export const networksWithStaking = new Set([...Array.from(keplrNetworks)]);

export const walletsSupported = new Set([WalletId.Keplr, WalletId.Keplr]);

export const networkIdToNetworkKey: Record<StakingNetworkId, NetworkKey> = {
  [StakingNetworkId.Akash]: "akash",
  [StakingNetworkId.Celestia]: "celestia",
  [StakingNetworkId.CelestiaTestnet]: "celestia-testnet",
  [StakingNetworkId.CosmosHub]: "cosmos",
  [StakingNetworkId.CosmosHubTestnet]: "cosmos-testnet",
  [StakingNetworkId.DyDx]: "dydx",
};

export const networkKeyToNetworkId: { [key in NetworkKey]?: StakingNetworkId } =
  Object.fromEntries(
    Object.entries(networkIdToNetworkKey).map(([k, v]) => [v, k]),
  );

export type Account = {
  address: string;
  info?: GetAddressInfoResponse;
  networkId: StakingNetworkId;
  rewards?: GetRewardsResponse;
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
  unbonding_period: number;
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
