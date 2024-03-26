import {
  ENABLE_TESTNETS,
  StakingNetworkId,
  WalletId,
  testnetNetworks,
} from "./base";

export const ethermintNetworks = new Set([
  StakingNetworkId.Dymension,
  StakingNetworkId.Evmos,
  StakingNetworkId.Injective,
  StakingNetworkId.IslamicCoin,
]);

export const keplrNetworks = new Set<StakingNetworkId>(
  [
    StakingNetworkId.Akash,
    StakingNetworkId.Evmos,
    StakingNetworkId.Celestia,
    StakingNetworkId.CelestiaTestnet,
    StakingNetworkId.ComposableFinance,
    StakingNetworkId.CosmosHub,
    StakingNetworkId.CosmosHubTestnet,
    StakingNetworkId.DyDx,
    StakingNetworkId.Dymension,
    StakingNetworkId.IslamicCoin,
    StakingNetworkId.Injective,
    StakingNetworkId.Kava,
    StakingNetworkId.KavaTestnet,
    StakingNetworkId.Osmosis,
    StakingNetworkId.Stargaze,
    StakingNetworkId.StargazeTestnet,
  ].filter(
    ENABLE_TESTNETS ? () => true : (network) => !testnetNetworks.has(network),
  ),
);

export const keplrNonNativeChains = new Set([
  StakingNetworkId.CelestiaTestnet,
  StakingNetworkId.ComposableFinance,
  StakingNetworkId.CosmosHubTestnet,
  StakingNetworkId.IslamicCoin,
  StakingNetworkId.KavaTestnet,
  StakingNetworkId.StargazeTestnet,
]);

export const leapNetworks = new Set(
  Array.from(keplrNetworks).filter(
    (network) => !keplrNonNativeChains.has(network),
  ),
);

export const cosmosWallets = new Set([
  WalletId.Keplr,
  // WalletId.Leap, // @TODO: Enable Leap wallet when ready
]);

export const cosmosStakingNetworks = new Set([
  ...Array.from(cosmosWallets.has(WalletId.Keplr) ? keplrNetworks : []),
  ...Array.from(cosmosWallets.has(WalletId.Leap) ? leapNetworks : []),
]);
