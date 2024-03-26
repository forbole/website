import type { TStakingContext } from "./context";
import type { Coin, StakingNetworkId } from "./core/base";
import { WalletId } from "./core/base";
import { keplrNetworks, leapNetworks } from "./core/cosmos";
import type {
  ClaimOpts,
  ClaimRewardsError,
  StakeError,
  StakeOpts,
  UnstakeAmount,
  UnstakeError,
  WalletErrorMap,
  WalletOperationResult,
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

  throw new Error("Unsupported network");
};

export const claimRewards = async (
  opts: ClaimOpts,
): Promise<WalletOperationResult<ClaimRewardsError>> =>
  claimRewardsCosmos(opts);

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
