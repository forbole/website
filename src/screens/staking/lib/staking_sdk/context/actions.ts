import type { TStakingContext } from ".";
import {
  ENABLE_TESTNETS,
  WalletId,
  mainNetworkDenom,
  networksWithStaking,
  testnetNetworks,
} from "../core";
import type {
  Account,
  CoinDenom,
  NetworkInfo,
  StakingNetworkId,
  State,
  Wallet,
} from "../core";
import { geckoClient } from "../gecko_client";
import { stakingClient } from "../staking_client";
import { sortAccounts } from "../utils/accounts";
import { setConnectedWallet } from "../utils/storage";
import { disconnecKeplr } from "../wallet_operations";

// Actions

export const fetchNetworksInfo = async (context: TStakingContext) => {
  const stakingNetworksInfo = await Promise.all(
    Array.from(networksWithStaking)
      .filter(ENABLE_TESTNETS ? () => true : (n) => !testnetNetworks.has(n))
      .map((networkId) =>
        stakingClient.getStakingInfo(networkId).then((info) => ({
          info,
          networkId,
        })),
      ),
  );

  context.setState((state) => ({
    ...state,
    networksInfo: {
      ...state.networksInfo,
      ...stakingNetworksInfo.reduce(
        (acc, { info, networkId }) => ({
          ...acc,
          [networkId]: info,
        }),
        {},
      ),
    },
  }));
};

const networkInfoRequests: {
  [key in StakingNetworkId]?: Promise<NetworkInfo>;
} = {};

export const getNetworkStakingInfo = async (
  context: TStakingContext,
  networkId: StakingNetworkId,
) => {
  if (context.state.networksInfo[networkId])
    return context.state.networksInfo[networkId] as NetworkInfo;

  const request = networkInfoRequests[networkId];

  if (request) return request;

  const newRequest = stakingClient.getStakingInfo(networkId).then((newInfo) => {
    context.setState((prevState) => ({
      ...prevState,
      networksInfo: {
        ...prevState.networksInfo,
        [networkId]: newInfo,
      },
    }));

    networkInfoRequests[networkId] = undefined;

    return newInfo as NetworkInfo;
  });

  networkInfoRequests[networkId] = newRequest;

  return newRequest;
};

const coinPriceRequests: { [key in CoinDenom]?: Promise<string> } = {};

const fetchCoinPrice = async (
  context: TStakingContext,
  denom: CoinDenom,
): Promise<string> => {
  const coinPrice = context.state.coinsPrices[denom];

  if (coinPrice) return coinPrice;

  const coinRequest = coinPriceRequests[denom];

  if (coinRequest) return coinRequest;

  const newRequest = geckoClient.getCoinPrice(denom).then((price): string => {
    context.setState((prevState) => ({
      ...prevState,
      coinsPrices: {
        ...prevState.coinsPrices,
        [denom]: price,
      },
    }));

    coinPriceRequests[denom] = undefined;

    return price;
  });

  coinPriceRequests[denom] = newRequest;

  return newRequest;
};

export const fetchCoinPriceForNetwork = async (
  context: TStakingContext,
  networkId: StakingNetworkId | undefined,
) => {
  if (!networkId) return;

  const parsedDenom = mainNetworkDenom[networkId];

  const { coinsPrices } = context.state;

  if (parsedDenom && !coinsPrices[parsedDenom]) {
    (async () => {
      await fetchCoinPrice(context, parsedDenom);
    })();
  }
};

export const setUserWallet = (
  context: TStakingContext,
  walletName: WalletId,
  wallet: Wallet,
) => {
  context.setState({
    wallets: {
      ...context.state.wallets,
      [walletName]: wallet,
    },
  });
};

export const setSelectedAccount = (
  context: TStakingContext,
  selectedAction: State["selectedAction"],
  selectedAccount: State["selectedAccount"],
) => {
  context.setState({
    selectedAccount: selectedAccount
      ? {
          address: selectedAccount.address,
          networkId: selectedAccount.networkId,
          wallet: selectedAccount.wallet,
        }
      : selectedAccount,
    selectedAction,
  });
};

export const syncAccountData = async (
  context: TStakingContext,
  account: Account,
) => {
  const { address, networkId, wallet: walletId } = account;

  const [info, rewards] = await Promise.all([
    stakingClient.getAddressInfo(networkId, address),
    stakingClient.getRewardsInfo(networkId, address),
  ]);

  const newWallet: Wallet = {
    ...context.state.wallets[walletId],
    networks: {
      ...context.state.wallets[walletId]?.networks,
      [networkId]: {
        accounts: [
          ...(
            context.state.wallets[walletId]?.networks?.[networkId]?.accounts ||
            []
          ).filter((a) => a.address !== address),
          {
            ...account,
            info,
            rewards,
          },
        ].sort(sortAccounts),
      },
    },
    wallet: walletId,
  };

  const newWallets = {
    ...context.state.wallets,
    [walletId]: newWallet,
  };

  context.setState({
    wallets: newWallets,
  });
};

export const disconnectWallet = async (
  context: TStakingContext,
  walletId: WalletId,
) => {
  if (context.state.wallets[walletId]) {
    const networks = Object.keys(
      context.state.wallets[WalletId.Keplr]?.networks || {},
    ) as StakingNetworkId[];

    switch (walletId) {
      case WalletId.Keplr: {
        await disconnecKeplr(networks);

        break;
      }

      default:
        walletId satisfies never;
    }

    const newWallets = { ...context.state.wallets };

    delete newWallets[walletId];

    context.setState({
      wallets: newWallets,
    });

    setConnectedWallet(Object.keys(walletId) as WalletId[]);
  }
};
