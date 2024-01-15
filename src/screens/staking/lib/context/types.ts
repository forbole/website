import type {
  GetAddressInfoResponse,
  GetRewardsResponse,
} from "@src/screens/staking/components/staking_section/utils/staking_client";
import { networks } from "@src/utils/network_info";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export const MAX_MEMO = 256;

export enum WalletId {
  Keplr = "keplr",
}

// For now these values match the id in the chain registry
export enum ChainId {
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  CosmosHub = "cosmoshub",
  CosmosHubTestnet = "theta-testnet-001",
  DyDx = "dydx-mainnet-1",
}

export const keplrNetworks = new Set([
  ChainId.CosmosHubTestnet,
  ChainId.CelestiaTestnet,
  ChainId.CosmosHub,
  ChainId.Celestia,
  ChainId.DyDx,
]);

export const networksWithStaking = new Set([
  ChainId.CosmosHubTestnet,
  ChainId.CelestiaTestnet,
  ChainId.CosmosHub,
  ChainId.Celestia,
  ChainId.DyDx,
]);

export const testnetNetworks = new Set([
  ChainId.CosmosHubTestnet,
  ChainId.CelestiaTestnet,
]);

export const networkNameToChainId: Record<string, ChainId> = {
  [networks.celestia.graphql]: ENABLE_TESTNETS
    ? ChainId.CelestiaTestnet
    : ChainId.Celestia,
  [networks.cosmos.graphql]: ENABLE_TESTNETS
    ? ChainId.CosmosHubTestnet
    : ChainId.CosmosHub,
  [networks.dydx.graphql]: ChainId.DyDx,
};

export const chainIdToNetworkKey: Record<ChainId, string> = {
  [ChainId.Celestia]: "celestia",
  [ChainId.CelestiaTestnet]: "celestia-testnet",
  [ChainId.CosmosHub]: "cosmos",
  [ChainId.CosmosHubTestnet]: "cosmos-testnet",
  [ChainId.DyDx]: "dydx",
};

export type Account = {
  address: string;
  chainId: ChainId;
  info?: GetAddressInfoResponse;
  rewards?: GetRewardsResponse;
  wallet: WalletId;
};

type StakeAction = "claim_rewards" | "stake" | "unstake";

export type Wallet = {
  [key in ChainId]?: { accounts: Account[]; chainId: ChainId };
};

type SelectedAccount = {
  address: string;
  chainId: ChainId;
  wallet: WalletId;
};

export type NetworkInfo = {
  apy: number;
  rpc: string;
  unbonding_period: number;
};

export type State = {
  hasInit: boolean;
  networksInfo: { [key in ChainId]?: NetworkInfo };
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
