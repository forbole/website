import * as R from "ramda";

const toFixed = (num: number): number => Number(num?.toFixed(2) ?? "0");

// converter needed for querying from external APIs:

const defaultConverter = (ratio: number) => (num: number) => num / ratio;

const uAtomToAtom = defaultConverter(1000000);

const uLunaToLuna = defaultConverter(1000000);

const uKavaToKava = defaultConverter(1000000);

const uAktToAkash = defaultConverter(1000000);

const uBandToBand = defaultConverter(1000000);

const uIovToIov = defaultConverter(1000000);

const nanoLikeToLike = defaultConverter(1000000000);

const uEGLDToEGLD = defaultConverter(1000000000000000000);

const defaultFunctions = (converter: any) => ({
  gecko: "",
  marketPrice: (data: any) =>
    toFixed(Number(R.pathOr(0, ["market_data", "current_price", "usd"], data))),
  converter,
});

const cosmos = R.clone(defaultFunctions(uAtomToAtom));
cosmos.gecko = "https://api.coingecko.com/api/v3/coins/cosmos";

const terra = R.clone(defaultFunctions(uLunaToLuna));
terra.gecko = "https://api.coingecko.com/api/v3/coins/terra-luna";

const kava = R.clone(defaultFunctions(uKavaToKava));
kava.gecko = "https://api.coingecko.com/api/v3/coins/kava";

const akash = R.clone(defaultFunctions(uAktToAkash));
akash.gecko = "https://api.coingecko.com/api/v3/coins/akash-network";

const band = R.clone(defaultFunctions(uBandToBand));
band.gecko = "https://api.coingecko.com/api/v3/coins/band-protocol";

const iov = R.clone(defaultFunctions(uIovToIov));
iov.gecko = "https://api.coingecko.com/api/v3/coins/starname";

const likecoin = R.clone(defaultFunctions(nanoLikeToLike));
likecoin.gecko = "https://api.coingecko.com/api/v3/coins/likecoin";

const vsys = R.clone(defaultFunctions(uBandToBand));
vsys.gecko = "https://api.coingecko.com/api/v3/coins/v-systems";

const emoney = R.clone(defaultFunctions(uBandToBand));
emoney.gecko = "https://api.coingecko.com/api/v3/coins/e-money";

const elrond = R.clone(defaultFunctions(uEGLDToEGLD));

// networks needed for converter
export const networkFunctions = {
  elrond,
};
