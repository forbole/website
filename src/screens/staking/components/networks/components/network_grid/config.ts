import { cosmosNetworkKeys } from "@src/utils/network_info";

export type ParamsProps = {
  APY: number;
  bonded: number;
  custom?: Record<string, string>;
  TVL: number;
};

export type NetworkProps = {
  [graphqlKey: string]: ParamsProps;
};

const defaultParams: ParamsProps = {
  APY: 0,
  bonded: 0,
  TVL: 0,
};

export const cosmosNetworkParams: NetworkProps = cosmosNetworkKeys.reduce(
  (acc, key) => {
    acc[key] = defaultParams;

    return acc;
  },
  {} as Record<string, ParamsProps>,
);

export const elrondNetworkParams: NetworkProps = {
  elrond: defaultParams,
};

export const solanaNetworkParams: NetworkProps = {
  solana: defaultParams,
};

export const oasisNetworkParams: NetworkProps = {
  oasis: defaultParams,
};

export const radixNetworkParams: NetworkProps = {
  radix: defaultParams,
};

export const suiNetworkParams: NetworkProps = {
  sui: defaultParams,
};
