import * as R from "ramda";

type NetworkDataProps = {
  bonded?: (data: any) => number;
  inflation?: (data: any) => number;
  supply?: (data: any) => number;
  commissionRate?: (data: any) => number;
  marketPrice: (data: any) => number;
  gecko?: any;
};

type NetworkProps = {
  [key: string]: NetworkDataProps;
};

export const toFixed = (num: number): number => Number(num?.toFixed(2) ?? "0");

const defaultConverter = (ratio: number) => (num: number) => num / ratio;
const uAtomToAtom = defaultConverter(1000000);

const uLunaToLuna = defaultConverter(1000000);

const uKavaToKava = defaultConverter(1000000);

const uAktToAkash = defaultConverter(1000000);

const uBandToBand = defaultConverter(1000000);

const uIovToIov = defaultConverter(1000000);

const uIrisToIris = defaultConverter(1000000);

const nanoLikeToLike = defaultConverter(1000000000);

const uCryptoOrgToCryptoOrg = defaultConverter(100000000);

const uSentinelToSentinel = defaultConverter(1000000);

// Need adjusting the converter
const uFetchAIToFetchAI = defaultConverter(1000000000000000000);

// Regen Network not listed on Coingecko yet
const uRegenToRegen = defaultConverter(1000000);

const uBitsongToBitsong = defaultConverter(1000000);

const uOasisToOasis = defaultConverter(1);

// need to adjust the converter
const uKusamaToKusama = defaultConverter(1);

const uFlowToFlow = defaultConverter(1);

const uSolanaToSolana = defaultConverter(1);

export const defaultFunctions = (converter?: any) => ({
  bonded: (data: any) =>
    converter(Number(R.pathOr(0, ["result", "bonded_tokens"], data))),
  inflation: (data: any) => toFixed(Number(R.pathOr(0, ["result"], data))) ?? 0,
  supply: (data: any) => converter(Number(R.pathOr(0, ["result"], data))),
  commissionRate: (data: any) =>
    Number(
      R.pathOr(0, ["result", "commission", "commission_rates", "rate"], data),
    ),
  marketPrice: (data: any) =>
    toFixed(Number(R.pathOr(0, ["market_data", "current_price", "usd"], data))),
  converter,
});

const cosmos: any = R.clone(defaultFunctions(uAtomToAtom));
cosmos.gecko = "https://api.coingecko.com/api/v3/coins/cosmos";

const terra: any = R.clone(defaultFunctions(uLunaToLuna));
terra.gecko = "https://api.coingecko.com/api/v3/coins/terra-luna";

const kava: any = R.clone(defaultFunctions(uKavaToKava));
kava.gecko = "https://api.coingecko.com/api/v3/coins/kava";

const akash: any = R.clone(defaultFunctions(uAktToAkash));
akash.gecko = "https://api.coingecko.com/api/v3/coins/akash-network";

const band: any = R.clone(defaultFunctions(uBandToBand));
band.gecko = "https://api.coingecko.com/api/v3/coins/band-protocol";

const iov: any = R.clone(defaultFunctions(uIovToIov));
iov.gecko = "https://api.coingecko.com/api/v3/coins/starname";

const likecoin: any = R.clone(defaultFunctions(nanoLikeToLike));
likecoin.gecko = "https://api.coingecko.com/api/v3/coins/likecoin";

const vsys: any = R.clone(defaultFunctions(uBandToBand));
vsys.gecko = "https://api.coingecko.com/api/v3/coins/v-systems";

const emoney: any = R.clone(defaultFunctions(uBandToBand));
emoney.gecko = "https://api.coingecko.com/api/v3/coins/iris-network";

const iris: any = R.clone(defaultFunctions(uIrisToIris));
iris.gecko = "https://api.coingecko.com/api/v3/coins/iris-network";

const cryptoOrg: any = R.clone(defaultFunctions(uCryptoOrgToCryptoOrg));
cryptoOrg.gecko = "https://api.coingecko.com/api/v3/coins/crypto-com-chain";

const sentinel: any = R.clone(defaultFunctions(uSentinelToSentinel));
sentinel.gecko = "https://api.coingecko.com/api/v3/coins/sentinel";

const fetchAI: any = R.clone(defaultFunctions(uFetchAIToFetchAI));
fetchAI.gecko = "https://api.coingecko.com/api/v3/coins/fetch-ai";

// Regen Network not listed on Coingecko yet
const regen: any = R.clone(defaultFunctions(uRegenToRegen));
// regen.gecko = "https://api.coingecko.com/api/v3/coins/regen-network";

const bitsong: any = R.clone(defaultFunctions(uBitsongToBitsong));
bitsong.gecko = "https://api.coingecko.com/api/v3/coins/bitsong";

const oasis: any = R.clone(defaultFunctions(uOasisToOasis));
oasis.gecko = "https://api.coingecko.com/api/v3/coins/oasis-network";

const kusama: any = R.clone(defaultFunctions(uKusamaToKusama));
kusama.gecko = "https://api.coingecko.com/api/v3/coins/kusama";

const flow: any = R.clone(defaultFunctions(uFlowToFlow));
flow.gecko = "https://api.coingecko.com/api/v3/coins/flow";

const solana: any = R.clone(defaultFunctions(uSolanaToSolana));
solana.gecko = "https://api.coingecko.com/api/v3/coins/solana";

// available networks for calculations
export const networkFunctions: NetworkProps = {
  cosmos,
  kava,
  akash,
  terra,
  iov,
  likecoin,
  iris,
  band,
  emoney,
  vsys,
  solana,
  "band-protocol": band,
  cryptoOrg,
  sentinel,
  "fetchai": fetchAI,
  "regen-network": regen,
  bitsong,
  "oasis-protocol": oasis,
  kusama,
  flow,
};
