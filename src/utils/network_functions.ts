import { clone, pathOr } from "ramda";

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
    toFixed(Number(pathOr(0, ["market_data", "current_price", "usd"], data))),
  converter,
});

const cosmos = clone(defaultFunctions(uAtomToAtom));
cosmos.gecko = "https://api.coingecko.com/api/v3/coins/cosmos";

const terra = clone(defaultFunctions(uLunaToLuna));
terra.gecko = "https://api.coingecko.com/api/v3/coins/terra-luna";

const kava = clone(defaultFunctions(uKavaToKava));
kava.gecko = "https://api.coingecko.com/api/v3/coins/kava";

const akash = clone(defaultFunctions(uAktToAkash));
akash.gecko = "https://api.coingecko.com/api/v3/coins/akash-network";

const band = clone(defaultFunctions(uBandToBand));
band.gecko = "https://api.coingecko.com/api/v3/coins/band-protocol";

const iov = clone(defaultFunctions(uIovToIov));
iov.gecko = "https://api.coingecko.com/api/v3/coins/starname";

const likecoin = clone(defaultFunctions(nanoLikeToLike));
likecoin.gecko = "https://api.coingecko.com/api/v3/coins/likecoin";

const vsys = clone(defaultFunctions(uBandToBand));
vsys.gecko = "https://api.coingecko.com/api/v3/coins/v-systems";

const emoney = clone(defaultFunctions(uBandToBand));
emoney.gecko = "https://api.coingecko.com/api/v3/coins/e-money";

const elrond = clone(defaultFunctions(uEGLDToEGLD));

// networks needed for converter
export const networkFunctions = {
  elrond,
};
