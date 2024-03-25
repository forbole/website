import {
  ENABLE_TESTNETS,
  StakingNetworkId,
  WalletId,
  testnetNetworks,
} from "./base";

export const solanaNetworks = new Set(
  [
    // StakingNetworkId.Solana,
    StakingNetworkId.SolanaTestnet,
  ].filter(
    ENABLE_TESTNETS ? () => true : (network) => !testnetNetworks.has(network),
  ),
);

export const solanaWallets = new Set([WalletId.Solflare, WalletId.Phantom]);
