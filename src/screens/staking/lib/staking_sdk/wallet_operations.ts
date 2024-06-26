import type { TStakingContext } from "./context";
import type { Account } from "./core";
import type { Coin, StakingNetworkId } from "./core/base";
import { WalletId } from "./core/base";
import { keplrNetworks, leapNetworks } from "./core/cosmos";
import { solanaNetworks } from "./core/solana";
import type {
  ClaimOpts,
  ClaimRewardsError,
  StakeError,
  StakeOpts,
  UnstakeAmount,
  UnstakeError,
  WalletErrorMap,
  WalletOperationResult,
  WithdrawUnstakedError,
  WithdrawUnstakedOpts,
} from "./wallet_operations/base";
import {
  claimRewardsCosmos,
  disconnecKeplr,
  disconnectLeap,
  getCosmosClaimRewardsFee,
  stakeAmountCosmos,
  suggestAddCosmosWalletNetwork,
  tryToConnectKeplr,
  tryToConnectLeap,
  unstakeCosmos,
  useCosmosWalletsListeners,
} from "./wallet_operations/cosmos";
import {
  disconnectPhantom,
  disconnectSolflare,
  handleSolflareClose,
  minimumSolanaStakeAmount,
  stakeAmountSolana,
  tryToConnectPhantom,
  tryToConnectSolflare,
  unstakeSolana,
  withdrawnUnstakedSolana,
} from "./wallet_operations/solana";

export const MAX_MEMO = 256;

export const stakeAmount = (
  opts: StakeOpts,
): Promise<WalletOperationResult<StakeError>> => {
  const { account } = opts;

  if (
    keplrNetworks.has(account.networkId) ||
    leapNetworks.has(account.networkId)
  ) {
    return stakeAmountCosmos(opts);
  }

  if (solanaNetworks.has(account.networkId)) {
    return stakeAmountSolana(opts);
  }

  throw new Error("Unsupported network");
};

export const claimRewards = async (
  opts: ClaimOpts,
): Promise<WalletOperationResult<ClaimRewardsError>> =>
  claimRewardsCosmos(opts);

export const withdrawnUnstaked = async (
  opts: WithdrawUnstakedOpts,
): Promise<WalletOperationResult<WithdrawUnstakedError>> =>
  withdrawnUnstakedSolana(opts);

export const getClaimRewardsFee = async (
  opts: ClaimOpts,
): Promise<Coin | null> => getCosmosClaimRewardsFee(opts);

export const unstake = async (
  opts: UnstakeAmount,
): Promise<WalletOperationResult<UnstakeError>> => {
  const { account } = opts;

  if (
    keplrNetworks.has(account.networkId) ||
    leapNetworks.has(account.networkId)
  ) {
    return unstakeCosmos(opts);
  }

  if (solanaNetworks.has(account.networkId)) {
    return unstakeSolana(opts);
  }

  throw new Error("Unsupported network");
};

export const tryToConnectWallets = async (
  context: TStakingContext,
  walletsIds: WalletId[],
  openLinkIfMissing = false,
  walletErrorMap: WalletErrorMap = {},
) => {
  let connected = true as boolean | undefined;

  for (const walletId of walletsIds) {
    switch (walletId) {
      case WalletId.Keplr:
        connected = await tryToConnectKeplr(context, openLinkIfMissing);
        break;

      case WalletId.Leap:
        connected = await tryToConnectLeap(
          context,
          openLinkIfMissing,
          walletErrorMap,
        );

        break;

      case WalletId.Solflare:
        connected = await tryToConnectSolflare(context, openLinkIfMissing);

        break;

      case WalletId.Phantom:
        connected = await tryToConnectPhantom(
          context,
          openLinkIfMissing,
          walletErrorMap,
        );

        break;

      default: {
        walletId satisfies never;
      }
    }
  }

  return connected;
};

export const disconnectWalletFns: Record<
  WalletId,
  (n: StakingNetworkId[]) => Promise<void>
> = {
  [WalletId.Keplr]: disconnecKeplr,
  [WalletId.Leap]: disconnectLeap,
  [WalletId.Phantom]: disconnectPhantom,
  [WalletId.Solflare]: disconnectSolflare,
};

export const useWalletsListeners = (contextValue: TStakingContext) => {
  useCosmosWalletsListeners(contextValue);
};

export const doesWalletSupportNetwork = (
  wallet: WalletId,
  networkId: string,
) => {
  switch (wallet) {
    case WalletId.Keplr:
      return keplrNetworks.has(networkId as StakingNetworkId);

    case WalletId.Leap:
      return leapNetworks.has(networkId as StakingNetworkId);

    case WalletId.Solflare:
      return solanaNetworks.has(networkId as StakingNetworkId);

    case WalletId.Phantom:
      return solanaNetworks.has(networkId as StakingNetworkId);

    default: {
      wallet satisfies never;

      return false;
    }
  }
};

export const suggestAddWalletNetwork = (
  context: TStakingContext,
  networkId: StakingNetworkId,
) => {
  suggestAddCosmosWalletNetwork(context, networkId);
};

export const minimumStakeAmountMap: {
  [key in StakingNetworkId]?: Coin | undefined;
} = {
  ...minimumSolanaStakeAmount,
};

export const handleWalletClose = (account: Account) => {
  if (account.wallet === WalletId.Solflare) {
    handleSolflareClose();
  }
};
