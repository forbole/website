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
import { disconnectWalletFns } from "../wallet_operations";

// Actions

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

export const fetchNetworksInfo = async (context: TStakingContext) => {
  await Promise.all(
    Array.from(networksWithStaking)
      .filter(ENABLE_TESTNETS ? () => true : (n) => !testnetNetworks.has(n))
      .map((networkId) =>
        getNetworkStakingInfo(context, networkId).then((info) => ({
          info,
          networkId,
        })),
      ),
  );
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

export const fetchCoinPriceForNetwork = (
  context: TStakingContext,
  network: StakingNetworkId | StakingNetworkId[] | undefined,
) => {
  const networks = (Array.isArray(network) ? network : [network]).filter(
    Boolean,
  );

  if (!networks.length) return;

  const uniqueNetworks = Array.from(new Set(networks)) as StakingNetworkId[];

  uniqueNetworks.forEach((networkId) => {
    const parsedDenom = mainNetworkDenom[networkId];

    const { coinsPrices } = context.state;

    if (parsedDenom && !coinsPrices[parsedDenom]) {
      (async () => {
        await fetchCoinPrice(context, parsedDenom);
      })();
    }
  });
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

type FetchAccountResult = {
  info: Awaited<ReturnType<typeof stakingClient.getAddressInfo>>;
  rewards: Awaited<ReturnType<typeof stakingClient.getRewardsInfo>>;
};

const accountsRequests: Record<
  string,
  Promise<FetchAccountResult> | undefined
> = {};

export const fetchAccountData = async (
  context: TStakingContext,
  address: string,
  networkId: StakingNetworkId,
  useCache = false,
): Promise<FetchAccountResult> => {
  const id = [address, networkId].join("___");

  if (useCache) {
    const cachedResponse = accountsRequests[id];

    if (cachedResponse) {
      return cachedResponse;
    }

    const foundResponse = Object.keys(context.state.wallets)
      .map((wallet) => {
        const maybeAccount = context.state.wallets[
          wallet as WalletId
        ]?.networks?.[networkId]?.accounts?.find((a) => a.address === address);

        if (maybeAccount?.info && maybeAccount?.rewards) {
          return { info: maybeAccount.info, rewards: maybeAccount.rewards };
        }

        return null;
      })
      .find(Boolean);

    if (foundResponse) {
      return foundResponse;
    }
  }

  const newRequest = Promise.all([
    stakingClient.getAddressInfo(networkId, address),
    stakingClient.getRewardsInfo(networkId, address),
  ]).then(([info, rewards]) => {
    accountsRequests[id] = undefined;

    return { info, rewards };
  });

  accountsRequests[id] = newRequest;

  return newRequest;
};

export const syncAccountData = async (
  context: TStakingContext,
  account: Account,
) => {
  const { address, networkId, wallet: walletId } = account;

  const { info, rewards } = await fetchAccountData(
    context,
    account.address,
    account.networkId,
    false,
  );

  const newWallet: Wallet = {
    ...context.state.wallets[walletId],
    networks: {
      ...context.state.wallets[walletId]?.networks,
      [networkId]: {
        accounts: [
          ...(
            context.state.wallets[walletId]?.networks?.[networkId]?.accounts ||
            []
          ).filter((a: Account) => a.address !== address),
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

    await disconnectWalletFns[walletId](networks);

    const newWallets = { ...context.state.wallets };

    delete newWallets[walletId];

    context.setState({
      wallets: newWallets,
    });

    setConnectedWallet(Object.keys(newWallets) as WalletId[]);
  }
};
