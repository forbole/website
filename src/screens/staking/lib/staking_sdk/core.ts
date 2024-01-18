import { networks } from "@src/utils/network_info";

import type {
  GetAddressInfoResponse,
  GetRewardsResponse,
} from "./staking_client";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export const MAX_MEMO = 256;

export enum WalletId {
  Keplr = "keplr",
}

// For now these values match the id in the chain registry:
// - https://github.com/cosmos/chain-registry
// - https://github.com/cosmos/chain-registry/tree/master/testnets
export enum NetworkId {
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  CosmosHub = "cosmoshub",
  CosmosHubTestnet = "theta-testnet-001",
  DyDx = "dydx-mainnet-1",
}

export const keplrNetworks = new Set([
  NetworkId.CosmosHubTestnet,
  NetworkId.CelestiaTestnet,
  NetworkId.CosmosHub,
  NetworkId.Celestia,
  NetworkId.DyDx,
]);

export const networksWithStaking = new Set([
  NetworkId.CosmosHubTestnet,
  NetworkId.CelestiaTestnet,
  NetworkId.CosmosHub,
  NetworkId.Celestia,
  NetworkId.DyDx,
]);

export const walletsSupported = new Set([WalletId.Keplr]);

export const testnetNetworks = new Set([
  NetworkId.CosmosHubTestnet,
  NetworkId.CelestiaTestnet,
]);

export const networkNameToNetworkId: Record<string, NetworkId> = {
  [networks.celestia.graphql]: ENABLE_TESTNETS
    ? NetworkId.CelestiaTestnet
    : NetworkId.Celestia,
  [networks.cosmos.graphql]: ENABLE_TESTNETS
    ? NetworkId.CosmosHubTestnet
    : NetworkId.CosmosHub,
  [networks.dydx.graphql]: NetworkId.DyDx,
};

export const networkIdToNetworkKey: Record<NetworkId, string> = {
  [NetworkId.Celestia]: "celestia",
  [NetworkId.CelestiaTestnet]: "celestia-testnet",
  [NetworkId.CosmosHub]: "cosmos",
  [NetworkId.CosmosHubTestnet]: "cosmos-testnet",
  [NetworkId.DyDx]: "dydx",
};

export type Account = {
  address: string;
  info?: GetAddressInfoResponse;
  networkId: NetworkId;
  rewards?: GetRewardsResponse;
  wallet: WalletId;
};

type StakeAction = "claim_rewards" | "connect_wallet" | "stake" | "unstake";

export type Wallet = {
  name?: string;
  networks: {
    [key in NetworkId]?: { accounts: Account[]; networkId: NetworkId };
  };
  wallet: WalletId;
};

type SelectedAccount = {
  address: string;
  networkId: NetworkId;
  wallet: WalletId;
};

export type NetworkInfo = {
  apy: number;
  rpc: string;
  unbonding_period: number;
};

export type State = {
  hasInit: boolean;
  networksInfo: { [key in NetworkId]?: NetworkInfo };
  selectedAccount: null | SelectedAccount;
  selectedAction: null | StakeAction;
  wallets: { [key in WalletId]?: Wallet };
};

export type SetState = (state: ((s: State) => State) | Partial<State>) => void;

export type TStakingContext = {
  setState: SetState;
  state: State;
};

export const defaultState: State = {
  hasInit: false,
  networksInfo: {},
  selectedAccount: null,
  selectedAction: null,
  wallets: {},
};
