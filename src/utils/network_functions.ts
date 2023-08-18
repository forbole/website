import * as R from 'ramda';

export const toFixed = (num: number): number => {
  return Number(num?.toFixed(2) ?? '0');
};

// converter needed for querying from external APIs:

export const defaultConverter = (ratio: number) => (num: number) => {
  return num / ratio;
};

export const uAtomToAtom = defaultConverter(1000000);

export const uLunaToLuna = defaultConverter(1000000);

export const uKavaToKava = defaultConverter(1000000);

export const uAktToAkash = defaultConverter(1000000);

export const uBandToBand = defaultConverter(1000000);

export const uIovToIov = defaultConverter(1000000);

export const uEMoneyToEMoney = defaultConverter(1000000);

export const uIrisToIris = defaultConverter(1000000);

export const nanoLikeToLike = defaultConverter(1000000000);

export const uCryptoOrgToCryptoOrg = defaultConverter(100000000);

export const uSentinelToSentinel = defaultConverter(1000000);

// Need adjusting the converter
export const uFetchAIToFetchAI = defaultConverter(1000000000000000000);

export const uXRDToXRD = defaultConverter(1000000000000000000);

export const uEGLDToEGLD = defaultConverter(1000000000000000000);

// Regen Network not listed on Coingecko yet
export const uRegenToRegen = defaultConverter(1000000);

export const uBitsongToBitsong = defaultConverter(1000000);

export const uOasisToOasis = defaultConverter(1);

// need to adjust the converter
export const uKusamaToKusama = defaultConverter(1);

export const uFlowToFlow = defaultConverter(1);

export const uSolanaToSolana = defaultConverter(1);

export const defaultFunctions = (converter: any) => ({
  gecko: '',
  marketPrice: (data: any) => {
    return toFixed(
      Number(R.pathOr(0, ['market_data', 'current_price', 'usd'], data))
    );
  },
  converter,
});

const cosmos = R.clone(defaultFunctions(uAtomToAtom));
cosmos.gecko = 'https://api.coingecko.com/api/v3/coins/cosmos';

const terra = R.clone(defaultFunctions(uLunaToLuna));
terra.gecko = 'https://api.coingecko.com/api/v3/coins/terra-luna';

const kava = R.clone(defaultFunctions(uKavaToKava));
kava.gecko = 'https://api.coingecko.com/api/v3/coins/kava';

const akash = R.clone(defaultFunctions(uAktToAkash));
akash.gecko = 'https://api.coingecko.com/api/v3/coins/akash-network';

const band = R.clone(defaultFunctions(uBandToBand));
band.gecko = 'https://api.coingecko.com/api/v3/coins/band-protocol';

const iov = R.clone(defaultFunctions(uIovToIov));
iov.gecko = 'https://api.coingecko.com/api/v3/coins/starname';

const likecoin = R.clone(defaultFunctions(nanoLikeToLike));
likecoin.gecko = 'https://api.coingecko.com/api/v3/coins/likecoin';

const vsys = R.clone(defaultFunctions(uBandToBand));
vsys.gecko = 'https://api.coingecko.com/api/v3/coins/v-systems';

const emoney = R.clone(defaultFunctions(uBandToBand));
emoney.gecko = 'https://api.coingecko.com/api/v3/coins/e-money';

const elrond = R.clone(defaultFunctions(uEGLDToEGLD));

// networks needed for converter
export const networkFunctions = {
  elrond,
};
