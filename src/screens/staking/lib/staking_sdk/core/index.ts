import type { NetworkKey } from "@src/utils/network_info";

import type {
  AccountDetailResponse,
  ClaimableRewardsResponse,
} from "../staking_client_types";
import type { CoinDenom, WalletId } from "./base";
import { StakingNetworkId } from "./base";
import { cosmosStakingNetworks, cosmosWallets } from "./cosmos";
import { solanaNetworks, solanaWallets } from "./solana";

export const networksWithStaking = new Set([
  ...Array.from(cosmosStakingNetworks),
  ...Array.from(solanaNetworks),
]);

export const networksWithRewards = new Set([
  ...Array.from(cosmosStakingNetworks),
]);

export const networksWithStakeAccounts = new Set([
  ...Array.from(solanaNetworks),
]);

export const walletsSupported = new Set([
  ...Array.from(cosmosWallets),
  ...Array.from(solanaWallets),
]);

export const networkIdToNetworkKey: Record<StakingNetworkId, NetworkKey> = {
  [StakingNetworkId.Akash]: "akash",
  [StakingNetworkId.Celestia]: "celestia",
  [StakingNetworkId.CelestiaTestnet]: "celestia-testnet",
  [StakingNetworkId.ComposableFinance]: "composable-finance",
  [StakingNetworkId.CosmosHub]: "cosmos",
  [StakingNetworkId.CosmosHubTestnet]: "cosmos-testnet",
  [StakingNetworkId.DyDx]: "dydx",
  [StakingNetworkId.Dymension]: "dymension",
  [StakingNetworkId.Injective]: "injective",
  [StakingNetworkId.IslamicCoin]: "islamic_coin",
  [StakingNetworkId.Kava]: "kava",
  [StakingNetworkId.KavaTestnet]: "kava-testnet",
  [StakingNetworkId.Osmosis]: "osmosis",
  [StakingNetworkId.Solana]: "solana",
  [StakingNetworkId.SolanaDevnet]: "solana-devnet",
  [StakingNetworkId.Stargaze]: "stargaze",
  [StakingNetworkId.StargazeTestnet]: "stargaze-testnet",
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

type StakeAction =
  | "claim_rewards"
  | "connect_wallet"
  | "stake"
  | "unstake"
  | "withdraw_unstake";

type SelectedAccount = {
  address: string;
  networkId: StakingNetworkId;
  wallet: WalletId;
};

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

export type StakingNetworkInfo = {
  apy: number;
  rpc: string;
  unbonding_period: null | string;
  voting_power: number;
};

export type StakingState = {
  coinsPrices: { [key in CoinDenom]?: string };
  hasInit: boolean;
  networksInfo: { [key in StakingNetworkId]?: StakingNetworkInfo };
  selectedAccount: null | SelectedAccount;
  selectedAction: null | StakeAction;
  wallets: { [key in WalletId]?: Wallet };
};
