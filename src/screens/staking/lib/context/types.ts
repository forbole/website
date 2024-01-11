import type {
  GetAddressInfoResponse,
  GetRewardsResponse,
} from "@src/screens/staking/components/staking_section/utils/staking_client";
import { networks } from "@src/utils/network_info";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export enum WalletId {
  Keplr = "keplr",
}

export enum ChainId {
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  CosmosHub = "cosmoshub",
  CosmosHubTestnet = "theta-testnet-001",
}

export const networkNameToChainId: Record<string, ChainId> = {
  // @TODO: Move from testnet to mainnet via env variable
  [networks.celestia.graphql]: ChainId.CelestiaTestnet,
  [networks.cosmos.graphql]: ChainId.CosmosHubTestnet,
};

export const chainIdToNetworkKey: Record<ChainId, string> = {
  [ChainId.Celestia]: "celestia",
  [ChainId.CelestiaTestnet]: "celestia-testnet",
  [ChainId.CosmosHub]: "cosmos",
  [ChainId.CosmosHubTestnet]: "cosmos-testnet",
};

export const networksWithStaking = new Set([
  networks.cosmos.graphql,
  networks.celestia.graphql,
]);

export type Account = {
  address: string;
  chainId: ChainId;
  info?: GetAddressInfoResponse;
  rewards?: GetRewardsResponse;
  wallet: WalletId;
};

type StakeAction = "claim_rewards" | "stake" | "unstake";

export type Wallet = { [key in ChainId]?: { accounts: Account[] } };

type SelectedAccount = {
  address: string;
  chainId: ChainId;
  wallet: WalletId;
};

export type State = {
  isConnectingWallet: boolean;
  selectedAccount: null | SelectedAccount;
  selectedAction: null | StakeAction;
  wallets: { [key in WalletId]?: Wallet };
};

export type SetState = (state: Partial<State>) => void;

export type Context = {
  setState: SetState;
  state: State;
};

export const defaultState: State = {
  isConnectingWallet: false,
  selectedAccount: null,
  selectedAction: null,
  wallets: {},
};
