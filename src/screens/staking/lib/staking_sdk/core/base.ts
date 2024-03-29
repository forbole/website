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
  KAVA = "KAVA",
  OSMO = "OSMO",
  PICA = "PICA",
  STARS = "STARS",
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
  Kava = "kava_2222-10",
  KavaTestnet = "kava_2221-16000",
  Osmosis = "osmosis-1",
  Stargaze = "stargaze-1",
  StargazeTestnet = "elgafar-1",
}

export const mainNetworkDenom: Record<StakingNetworkId, CoinDenom | null> = {
  [StakingNetworkId.Akash]: CoinDenom.AKT,
  [StakingNetworkId.Celestia]: CoinDenom.TIA,
  [StakingNetworkId.CelestiaTestnet]: CoinDenom.TIA,
  [StakingNetworkId.ComposableFinance]: CoinDenom.PICA,
  [StakingNetworkId.CosmosHub]: CoinDenom.ATOM,
  [StakingNetworkId.CosmosHubTestnet]: CoinDenom.ATOM,
  [StakingNetworkId.DyDx]: CoinDenom.DYDX,
  [StakingNetworkId.Kava]: CoinDenom.KAVA,
  [StakingNetworkId.KavaTestnet]: CoinDenom.KAVA,
  [StakingNetworkId.Osmosis]: CoinDenom.OSMO,
  [StakingNetworkId.Stargaze]: CoinDenom.STARS,
  [StakingNetworkId.StargazeTestnet]: CoinDenom.STARS,
};

export const testnetNetworks = new Set([
  StakingNetworkId.CelestiaTestnet,
  StakingNetworkId.CosmosHubTestnet,
  StakingNetworkId.KavaTestnet,
  StakingNetworkId.StargazeTestnet,
]);
