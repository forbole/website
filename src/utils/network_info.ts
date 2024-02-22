import { ENABLE_TESTNETS } from "@src/screens/staking/lib/staking_sdk/core";

export type Network = {
  address?: string;
  bigDipper?: string;
  calculator?: {
    bonded: string;
    inflation: string;
    stakingParams: string;
    supply: string;
  };
  color?: string;
  delegate?: string;
  denom?: string;
  graphql: string;
  guide?: string;
  heightSocket?: string;
  image: string;
  key: string;
  label?: string;
  name: string;
  value?: string;
};

const networks = {
  "agoric": {
    address: "agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g",
    bigDipper: "https://testnet.explorer.agoric.net/",
    delegate:
      "https://wallet.keplr.app/#/agoric/stake?tab=inactive-validators&modal=detail&validator=agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g",
    denom: "bld",
    graphql: "agoric",
    guide: "how-to-stake-bld-on-agoric",
    image: "/images/network/agoric.png",
    key: "agoric",
    label: "Agoric - BLD",
    name: "Agoric",
  },
  "akash": {
    address: "akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073",
    bigDipper: "https://akash.bigdipper.live/",
    calculator: {
      bonded: "https://api.akash.forbole.com/staking/pool",
      inflation: "https://api.akash.forbole.com/minting/inflation",
      stakingParams:
        "https://api.akash.forbole.com/staking/validators/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073",
      supply: "https://api.akash.forbole.com/bank/total/uakt",
    },
    color: "#eb3825",
    delegate:
      "https://akash.bigdipper.live/validator/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073/delegate",
    denom: "AKT",
    graphql: "akash",
    guide: "how-to-stake-akt-on-akash",
    heightSocket: "wss://ws.akash.forbole.com",
    image: "/images/network/akash.png",
    key: "akash",
    label: "Akash - AKT",
    name: "Akash",
  },
  "archway": {
    address: "archwayvaloper1esg4kluvdkfcxl0atcf2us2p9m9y9sjjsu04ex",
    denom: "ARCH",
    graphql: "archway",
    guide: "how-to-stake-arch-on-archway-network",
    image: "/images/network/archway.svg",
    key: "archway",
    label: "Archway",
    name: "Archway",
  },
  "assetmantle": {
    address: "mantlevaloper14kn0kk33szpwus9nh8n87fjel8djx0y09q0ln7",
    delegate: "https://wallet.assetmantle.one/",
    denom: "mntl",
    graphql: "assetmantle",
    guide: "how-to-stake-mntl-on-assetmantle",
    image: "/images/network/assetmantle.png",
    key: "assetmantle",
    label: "Assetmantle - MNTL",
    name: "Assetmantle",
  },
  "axelar": {
    address: "axelarvaloper1r7ppsrmzpslqu3d3yf344kzjv32n9dn4xyt0sw",
    delegate: "https://wallet.keplr.app/chains/axelar",
    denom: "axl",
    graphql: "axelar",
    guide: "how-to-stake-axl-on-axelar",
    image: "/images/network/axelar.png",
    key: "axelar",
    label: "Axelar - AXL",
    name: "Axelar",
  },
  "band": {
    address: "bandvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0wz502z",
    delegate: "https://atomicwallet.io/band-staking",
    denom: "band",
    graphql: "band",
    guide: "how-to-stake-band-on-band-protocol",
    image: "/images/network/band_protocol.png",
    key: "band",
    label: "Band Protocol - BAND",
    name: "Band Protocol",
  },
  "bitcanna": {
    address: "bcnavaloper1kkpevanspcg0zkxhnvptjszus52svxpcwe32yp",
    delegate: "https://wallet.bitcanna.io/",
    denom: "bcna",
    graphql: "bitcanna",
    guide: "how-to-stake-bcna-on-bitcanna",
    image: "/images/network/bitcanna.png",
    key: "bitcanna",
    label: "BitCanna - BCNA",
    name: "Bitcanna",
  },
  "bitsong": {
    address: "bitsongvaloper125hdkukw4pu2urhj4nv366q0avdqv24twga2kd",
    delegate: "https://wallet.bitsong.io/#/authentication/login",
    denom: "btsg",
    graphql: "bitsong",
    guide: "how-to-stake-btsg-on-bitsong",
    image: "/images/network/bitsong.png",
    key: "bitsong",
    label: "BitSong - BTSG",
    name: "BitSong",
  },
  "celer": {
    denom: "CELER",
    graphql: "celer",
    image: "/images/network/celer.png",
    key: "celer",
    name: "Celer",
  },
  "celestia": {
    denom: "tia",
    graphql: "celestia",
    image: "/images/network/celestia.svg",
    key: "celestia",
    label: "Celestia - TIA",
    name: "Celestia",
  },
  "celestia-testnet": {
    denom: "tia",
    graphql: "celestia",
    image: "/images/network/celestia.svg",
    key: "celestia-testnet",
    name: "Celestia Testnet",
  },
  "cheqd": {
    address: "cheqdvaloper1pknp3fyss23xeezcj6ypd8pl6d2ql4758zpxej",
    delegate: "https://wallet.cheqd.io",
    denom: "cheq",
    graphql: "cheqd",
    guide: "how-to-stake-cheq-on-cheqd",
    image: "/images/network/cheqd.svg",
    key: "cheqd",
    label: "CHEQD Network - CHEQ",
    name: "Cheqd",
  },
  "chihuahua": {
    address: "chihuahuavaloper14kn0kk33szpwus9nh8n87fjel8djx0y0teaa9l",
    delegate: "https://chihuahua.omniflix.co/",
    denom: "huahua",
    graphql: "chihuahua",
    guide: "how-to-stake-huahua-on-chihuahua",
    image: "/images/network/chihuahua.png",
    key: "chihuahua",
    label: "Chihuahua Chain - HUAHUA",
    name: "Chihuahua",
  },
  "comdex": {
    address: "comdexvaloper1e4wjh48ks5j5d9702d35q360ffmf3jj2xpuf3f",
    delegate: "https://comdex.omniflix.co/",
    denom: "cmdx",
    graphql: "comdex",
    guide: "how-to-stake-cmdx-on-comdex",
    image: "/images/network/comdex.png",
    key: "comdex",
    label: "Comdex - CMDX",
    name: "Comdex",
  },
  "composable-finance": {
    address: "centaurivaloper1fmz5pw0agjg4mz4nxs34ha6rc5337fc3vk3xrd",
    denom: "PICA",
    graphql: "composable-finance",
    image: "/images/network/composable_finance.svg",
    key: "composable-finance",
    label: "Composable Finance - PICA",
    name: "Composable Finance",
  },
  "coreum": {
    address: "corevaloper1k3wy8ztt2e0uq3j5deukjxu2um4a4z5tvz35la",
    denom: "CORE",
    graphql: "coreum",
    guide: "how-to-stake-core-on-coreum",
    image: "/images/network/coreum.svg",
    key: "coreum",
    label: "Coreum - CORE",
    name: "Coreum",
  },
  "cosmos": {
    address: "cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj",
    bigDipper: "https://cosmos.bigdipper.live/",
    calculator: {
      bonded: "http://lcd.cosmoshub.bigdipper.live/staking/pool",
      inflation: "http://lcd.cosmoshub.bigdipper.live/minting/inflation",
      stakingParams:
        "http://lcd.cosmoshub.bigdipper.live/staking/validators/cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj",
      supply: "http://lcd.cosmoshub.bigdipper.live/supply/total/uatom",
    },
    color: "#ba3fd9",
    delegate:
      "https://cosmos.bigdipper.live/validators/cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj/delegate",
    denom: "ATOM",
    graphql: "cosmos",
    guide: "how-to-stake-atom-on-cosmos-hub",
    heightSocket: "wss://ws.cosmoshub.forbole.com",
    image: "/images/network/cosmos_hub.png",
    key: "cosmos",
    label: "Cosmos Hub - ATOM",
    name: "Cosmos Hub",
    value: "cosmos",
  },
  "cosmos-testnet": {
    denom: "ATOM",
    graphql: "",
    image: "/images/network/cosmos_hub.png",
    key: "cosmos-testnet",
    name: "Cosmos Hub Testnet",
  },
  "crescent": {
    address: "crevaloper1ls9w867xu0q5zjze5vrakfa2zluahtv44gwn7y",
    delegate: "https://crescent.disperze.network/",
    denom: "cre",
    graphql: "crescent",
    guide: "how-to-stake-cre-on-crescent",
    image: "/images/network/crescent.png",
    key: "crescent",
    label: "Crescent Network - CRE",
    name: "Crescent",
  },
  "crypto.org": {
    address: "crocncl15xphw2m025acwnjd2ucq9t5ku4ggaqyecekzqa",
    bigDipper: "https://crypto-org.bigdipper.live/",
    delegate:
      "https://crypto-org.bigdipper.live/validator/crocncl15xphw2m025acwnjd2ucq9t5ku4ggaqyecekzqa",
    denom: "cro",
    graphql: "cro",
    guide: "how-to-stake-cro-on-crypto-org",
    image: "/images/network/crypto_org.png",
    key: "crypto-org",
    label: "Crypto.org - CRO",
    name: "Crypto.org",
  },
  "desmos": {
    bigDipper: "https://morpheus.desmos.network/",
    denom: "dsm",
    graphql: "desmos",
    image: "/images/network/desmos.png",
    key: "desmos",
    name: "Desmos",
  },
  "dydx": {
    denom: "dydxprotocold",
    graphql: "dydx",
    image: "/images/network/dydx.svg",
    key: "dydx",
    name: "dydx",
  },
  "e-money": {
    address: "emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y",
    bigDipper: "https://e-money.network/",
    calculator: {
      bonded: "http://lcd.emoney.forbole.com/staking/pool",
      inflation: "http://lcd.emoney.forbole.com/minting/inflation",
      stakingParams:
        "http://lcd.emoney.forbole.com/staking/validators/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y",
      supply: "http://lcd.emoney.forbole.com/supply/total/nanolike",
    },
    color: "#1e5877",
    delegate:
      "https://wallet.e-money.com/earn/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y",
    denom: "ngm",
    graphql: "emoney",
    guide: "how-to-stake-ngm-on-e-money",
    heightSocket: "wss://ws.emoney.forbole.com",
    image: "/images/network/e_money.png",
    key: "e-money",
    label: "e-Money - NGM",
    name: "eMoney",
  },
  "elrond": {
    address: "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40llllsfjmn54",
    denom: "egld",
    graphql: "elrond",
    image: "/images/network/elrond.png",
    key: "elrond",
    name: "MultiversX",
  },
  "ethereum": {
    denom: "ETH",
    graphql: "ethereum",
    image: "/images/network/ethereum.svg",
    key: "ethereum",
    name: "Ethereum",
  },
  "evmos": {
    address: "evmosvaloper1ak9t7kwk44azu6cefqdydqmy3hen28nvdjjvz0",
    delegate: "https://app.evmos.org/staking",
    denom: "evmos",
    graphql: "evmos",
    guide: "how-to-stake-evmos-on-evmos",
    image: "/images/network/evmos.png",
    key: "evmos",
    label: "Evmos - EVMOS",
    name: "Evmos",
  },
  "fetch-ai": {
    address: "fetchvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0dzxfx3",
    bigDipper: "https://explore.fetch.ai/",
    delegate:
      "https://explore.fetch.ai/validator/fetchvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0dzxfx3",
    denom: "fet",
    graphql: "fetchai",
    image: "/images/network/fetch_ai.png",
    key: "fetch-ai",
    label: "Fetch.ai - FET",
    name: "Fetch.ai",
  },
  "gitopia": {
    denom: "LORE",
    graphql: "gitopia",
    guide: "how-to-stake-lore-on-gitopia",
    image: "/images/network/gitopia.svg",
    key: "gitopia",
    label: "Gitopia - LORE",
    name: "Gitopia",
  },
  "gravity_bridge": {
    address: "gravityvaloper1xwkkam88aep5jcu2hcj0a2hy79eyvcw6yhfgv6",
    delegate: "https://wallet.keplr.app/chains/gravity-bridge",
    denom: "GRAVITON",
    graphql: "gravitybridge",
    guide: "how-to-stake-grav-on-gravity-bridge",
    image: "/images/network/gravity_bridge.png",
    key: "gravity_bridge",
    label: "Gravity Bridge - GRAVITON",
    name: "Gravity Bridge",
  },
  "humansai": {
    denom: "HEART",
    graphql: "humansai",
    image: "/images/network/humansai.svg",
    key: "humansai",
    label: "",
    name: "Humans.ai",
  },
  "injective": {
    address: "injvaloper12s9d7l53ef2c8avrn7pgd6dfeeg2yzel58ztfx",
    denom: "inj",
    graphql: "injective",
    image: "/images/network/injective.png",
    key: "injective",
    label: "Injective - INJ",
    name: "Injective",
  },
  "islamic_coin": {
    graphql: "islamic_coin",
    image: "/images/network/islamic_coin.svg",
    key: "islamic_coin",
    name: "Islamic Coin",
  },
  "ixo": {
    address: "ixovaloper1dvr6jp0j7jqjrzqp4xz333h2s85pxvzgzsdula",
    delegate: "https://wallet.keplr.app/chains/ixo",
    denom: "ixo",
    graphql: "ixo",
    guide: "how-to-stake-ixo-on-ixo",
    image: "/images/network/ixo.png",
    key: "ixo",
    label: "IXO - IXO",
    name: "ixo",
  },
  "jackal": {
    denom: "JKL",
    graphql: "jackal",
    image: "/images/network/jackal.png",
    key: "jackal",
    label: "Jackal Protocol - JKL",
    name: "Jackal Protocol",
  },
  "juno": {
    address: "junovaloper1pvwqfze548z95sdhun58trrvxhlhfrvky5ejtk",
    delegate: "https://wallet.keplr.app/chains/juno",
    denom: "juno",
    graphql: "juno",
    guide: "how-to-stake-juno-on-juno",
    image: "/images/network/juno.png",
    key: "juno",
    label: "Juno - JUNO",
    name: "Juno",
  },
  "kava": {
    address: "kavavaloper14kn0kk33szpwus9nh8n87fjel8djx0y02c7me3",
    denom: "kava",
    graphql: "kava",
    guide: "how-to-stake-kava-on-kava",
    image: "/images/network/kava.png",
    key: "kava",
    label: "Kava - KAVA",
    name: "Kava",
  },
  "kava-testnet": {
    address: "kavavaloper1vlpsrmdyuywvaqrv7rx6xga224sqfwz3yjnlkh",
    denom: "KAVA",
    graphql: "kava",
    guide: "how-to-stake-akt-on-kava",
    image: "/images/network/kava.png",
    key: "kava-testnet",
    label: "Kava - KAVA",
    name: "Kava Testnet",
  },
  "kyve": {
    denom: "KYVE",
    graphql: "kyve",
    image: "/images/network/kyve.svg",
    key: "kyve",
    label: "",
    name: "KYVE",
  },
  "likecoin": {
    address: "likevaloper1v8njts96gl5eqstnen4gksdy5k860fau6nxc04",
    delegate: "https://dao.like.co/",
    denom: "like",
    graphql: "likecoin",
    guide: "how-to-stake-like-on-likecoin",
    image: "/images/network/likecoin.png",
    key: "likecoin",
    label: "Likecoin - LIKE",
    name: "Likecoin",
  },
  "mars": {
    address: "marsvaloper1799t9vxshqssrk5cgnywvlx0fnlk2ekdz328aa",
    delegate:
      "https://explorer.marsprotocol.io/validators/marsvaloper1799t9vxshqssrk5cgnywvlx0fnlk2ekdz328aa",
    denom: "MARS",
    graphql: "mars",
    guide: "how-to-stake-mars-on-mars-hub",
    image: "/images/network/mars.png",
    key: "mars",
    label: "Mars Protocol - MARS",
    name: "Mars Protocol",
  },
  "multiversx": {
    denom: "",
    graphql: "multiversx",
    image: "/images/network/multiversx.png",
    key: "multiversx",
    label: "",
    name: "MultiversX",
  },
  "neutron": {
    denom: "",
    graphql: "neutron",
    image: "/images/network/neutron.svg",
    key: "neutron",
    label: "",
    name: "Neutron",
  },
  "nois": {
    denom: "NOIS",
    graphql: "nois",
    image: "/images/network/nois.svg",
    key: "nois",
    name: "Nois",
  },
  "nolus": {
    denom: "NLS",
    graphql: "nolus",
    image: "/images/network/nolus.svg",
    key: "nolus",
    label: "",
    name: "Nolus",
  },
  "nomic": {
    address: "nomic1yvzvykkvqruhrvwn7776tm6ppmaf4gcnazas2e",
    delegate: "https://app.nomic.io/",
    denom: "NOM",
    graphql: "nomic",
    guide: "how-to-stake-nom-on-nomic",
    image: "/images/network/nomic.png",
    key: "nomic",
    name: "Nomic Network",
  },
  "nym": {
    denom: "NYX",
    graphql: "nym",
    image: "/images/network/nym.svg",
    key: "nym",
    label: "NYM - NYX",
    name: "NYM",
  },
  "oasis": {
    address: "oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0",
    denom: "ROSE",
    graphql: "oasis",
    guide: "how-to-stake-rose-on-oasis-network",
    image: "/images/network/oasis.png",
    key: "oasis",
    name: "Oasis Network",
  },
  "omniflix": {
    denom: "FLIX",
    graphql: "omniflix",
    image: "/images/network/omniflix.png",
    key: "omniflix",
    label: "Omniflix Network - FLIX",
    name: "Omniflix Network",
  },
  "onomy": {
    denom: "NOM",
    graphql: "onomy",
    image: "/images/network/onomy.png",
    key: "onomy",
    label: "Onomy Protocol - NOM",
    name: "Onomy Protocol",
  },
  "osmosis": {
    address: "osmovaloper14kn0kk33szpwus9nh8n87fjel8djx0y0fhtak5",
    delegate: "https://wallet.keplr.app/chains/osmosis",
    denom: "osmo",
    graphql: "osmosis",
    guide: "how-to-stake-osmo-on-osmosis",
    image: "/images/network/osmosis.svg",
    key: "osmosis",
    label: "Osmosis - OSMO",
    name: "Osmosis",
  },
  "passage": {
    address: "pasgvaloper1kq4lp40qwce50p4z7lef9sw9c5379yljegwjna",
    denom: "PASG",
    graphql: "passage",
    image: "/images/network/passage.png",
    key: "passage",
    name: "Passage",
  },
  "persistence": {
    address: "persistencevaloper17qamc7jjwfr6ye7cffranxkgxfum6esxe89vvv",
    delegate: "https://wallet.keplr.app/chains/persistence",
    denom: "xprt",
    graphql: "persistence",
    guide: "how-to-stake-xprt-on-persistence",
    image: "/images/network/persistence.png",
    key: "persistence",
    label: "Persistence - XPRT",
    name: "Persistence",
  },
  "picasso": {
    denom: "PICA",
    graphql: "picasso",
    image: "/images/network/picasso.svg",
    key: "picasso",
    label: "Picasso - PICA",
    name: "Picasso",
  },
  "provenance": {
    address: "pbvaloper1plh34z4gmfcypecdzudcfhytcyeulyxj0l8t75",
    denom: "hash",
    graphql: "provenance",
    image: "/images/network/provenance.png",
    key: "provenance",
    name: "Provenance",
  },
  "quasar": {
    denom: "qsr",
    graphql: "quasar",
    image: "/images/network/quasar.svg",
    key: "quasar",
    label: "Quasar - QSR",
    name: "Quasar",
  },
  "quicksilver": {
    denom: "QCK",
    graphql: "quicksilver",
    image: "/images/network/quicksilver.png",
    key: "quicksilver",
    name: "Quicksilver Protocol",
  },
  "radix": {
    denom: "XRD",
    graphql: "radix",
    image: "/images/network/radix.png",
    key: "radix",
    name: "Radix",
  },
  "regen": {
    address: "regenvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0c7xhe5",
    denom: "regen",
    graphql: "regen",
    image: "/images/network/regen.svg",
    key: "regen",
    label: "Regen - REGEN",
    name: "Regen",
  },
  "rizon": {
    denom: "atolo",
    graphql: "rizon",
    image: "/images/network/rizon.svg",
    key: "rizon",
    label: "Rizon - ATOLO",
    name: "Rizon",
  },
  "router-protocol": {
    denom: "Route",
    graphql: "router-protocol",
    image: "/images/network/router_protocol.svg",
    key: "router-protocol",
    name: "Router Protocol",
  },
  "secret": {
    address: "secretvaloper1kvp570cd6zvzh8ffrhz7lmytt6v6u2gxz8tl0g",
    delegate: "https://wallet.keplr.app/chains/secret-network",
    denom: "scrt",
    graphql: "secret",
    guide: "how-to-stake-scrt-on-secret-network",
    image: "/images/network/secret.png",
    key: "secret",
    label: "Secret - SCRT",
    name: "Secret",
  },
  "sentinel": {
    address: "sentvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0l9e6u8",
    delegate: "https://wallet.keplr.app/chains/sentinel",
    denom: "dvpn",
    graphql: "sentinelhub",
    guide: "how-to-stake-dvpn-on-sentinel",
    image: "/images/network/sentinel.png",
    key: "sentinelhub",
    label: "Sentinel - DVPN",
    name: "Sentinel",
  },

  "solana": {
    address: "76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQfF66jZhQ857",
    denom: "SOL",
    graphql: "solana",
    guide: "how-to-stake-sol-on-solana",
    image: "/images/network/solana.png",
    key: "solana",
    label: "Solana - SOL",
    name: "Solana",
  },
  "ssv": {
    denom: "SSV",
    graphql: "ssv",
    image: "/images/network/ssv.png",
    key: "ssv",
    name: "SSV Network",
  },
  "stafihub": {
    address: "stafivaloper1pvwqfze548z95sdhun58trrvxhlhfrvkwtr9vz",
    denom: "fis",
    graphql: "stafihub",
    image: "/images/network/stafihub.png",
    key: "stafihub",
    label: "Stafi - FIS",
    name: "Stafihub",
  },
  "stargaze": {
    address: "starsvaloper12k8za208e5kt0j34w6au6v8py6t6cat2sqjzvw",
    denom: "STARS",
    graphql: "stargaze",
    guide: "how-to-stake-stars-on-stargaze",
    image: "/images/network/stargaze.png",
    key: "stargaze",
    label: "Stargaze - STARS",
    name: "Stargaze",
  },
  "stargaze-testnet": {
    address: "starsvaloper12k8za208e5kt0j34w6au6v8py6t6cat2sqjzvw",
    denom: "STARS",
    graphql: "stargaze",
    guide: "how-to-stake-stars-on-stargaze",
    image: "/images/network/stargaze.png",
    key: "stargaze-testnet",
    label: "Stargaze - STARS",
    name: "Stargaze Testnet",
  },
  "stride": {
    address: "stridevaloper19d8a9dr4kh85zcl5kq7fj64ad9r9dqfky93dgq",
    delegate: "https://wallet.keplr.app/chains/stride",
    denom: "strd",
    graphql: "stride",
    guide: "how-to-stake-strd-on-stride",
    image: "/images/network/stride.png",
    key: "stride",
    label: "Stride - STRD",
    name: "Stride",
  },
  "sui": {
    address:
      "0x1e1985024aafe50a8e4eafc5a89eb7ecd58ba08c39f37688bee00bd55c8b2059",
    denom: "SUI",
    graphql: "sui",
    guide: "how-to-stake-sui-on-sui-network",
    image: "/images/network/sui.svg",
    key: "sui",
    label: "Sui - SUI",
    name: "Sui",
  },
  "teritori": {
    address: "torivaloper138664l4407d7hfwe8a82q25fk4vht53j9yl3e9",
    delegate: "https://explorer.teritori.com/teritori",
    denom: "TORI",
    graphql: "teritori",
    guide: "how-to-stake-tori-on-teritori",
    image: "/images/network/teritori.png",
    key: "teritori",
    label: "Teritori - TORI",
    name: "Teritori",
  },
  "terra": {
    denom: "LUNA",
    graphql: "terra",
    image: "/images/network/terra.png",
    key: "terra",
    label: "Terra - LUNA",
    name: "Terra",
  },
  "terra_classic": {
    address: "terravaloper1v6pfkm0nxpudgantwxwhz786l8me0wfs4lnpuw",
    denom: "LUNC",
    graphql: "terra_classic",
    image: "/images/network/terra_classic.png",
    key: "terra_classic",
    label: "Terra Classic - LUNC",
    name: "Terra Classic",
  },
  "tgrade": {
    denom: "TGD",
    graphql: "tgrade",
    image: "/images/network/tgrade.png",
    key: "tgrade",
    name: "Tgrade",
  },
  "ununifi": {
    denom: "GUU",
    graphql: "ununifi",
    image: "/images/network/ununifi.png",
    key: "ununifi",
    label: "Ununifi - GUU",
    name: "Ununifi",
  },
  "vsys": {
    denom: "VSYS",
    graphql: "vsys",
    image: "/images/network/v-systems.png",
    key: "vsys",
    name: "V Systems",
  },

  "wormhole": {
    graphql: "wormhole",
    image: "/images/network/wormhole.png",
    key: "wormhole",
    name: "Wormhole",
  },
  "xpla": {
    denom: "XPLA",
    graphql: "xpla",
    image: "/images/network/xpla.png",
    key: "xpla",
    label: "XPLA - XPLA",
    name: "XPLA",
  },
} satisfies Record<string, Network>;

export type NetworkKey = keyof typeof networks;

export const getNetworkInfo = (key: NetworkKey): Network =>
  networks[key] || null;

const cosmosTestNetworkKeys = ENABLE_TESTNETS
  ? (["kava-testnet", "stargaze-testnet"] satisfies NetworkKey[])
  : [];

export const cosmosNetworkKeys = [
  "agoric",
  "akash",
  "archway",
  "assetmantle",
  "axelar",
  "band",
  "bitsong",
  "celer",
  "celestia",
  "cheqd",
  "comdex",
  "composable-finance",
  "coreum",
  "cosmos",
  "crescent",
  "crypto.org",
  "dydx",
  "e-money",
  "evmos",
  "fetch-ai",
  "gitopia",
  "gravity_bridge",
  "humansai",
  "injective",
  "islamic_coin",
  "jackal",
  "kava",
  "kyve",
  "likecoin",
  "mars",
  "neutron",
  "nois",
  "nolus",
  "nomic",
  "nym",
  "omniflix",
  "osmosis",
  "passage",
  "persistence",
  "picasso",
  "provenance",
  "quasar",
  "quicksilver",
  "regen",
  "rizon",
  "router-protocol",
  "sentinel",
  "ssv",
  "stafihub",
  "stargaze",
  "stride",
  "teritori",
  "tgrade",
  "ununifi",
  "vsys",
  "wormhole",
  "xpla",

  ...cosmosTestNetworkKeys,
  // Preparing:
  // 'desmos',
] satisfies NetworkKey[];

// These networks are not supported by the rewards calculator yet
export const skippedRewardsNetworks = new Set([
  "archway",
  "crescent",
  "e-money",
  "mars",
  "nomic",
  "osmosis",
  "stargaze",
  "stride",
  "teritori",
]);

// The data of these networks is not ready yet
export const networksWithHiddenInfo = new Set("composable-finance");

const getNetworkKeysArray = () => {
  const arr = [...cosmosNetworkKeys] as string[];

  arr.push("elrond", "solana", "oasis", "radix", "sui", "ethereum");
  arr.sort();

  return arr;
};

export const allNetworkKeys = getNetworkKeysArray();
export const networkNumber = allNetworkKeys.length;

// @hardcoded
// https://www.coingecko.com/en/coins/ethereum
const ethPrice = 2270;

export const EthData = {
  // @hardcoded
  TVL: 521 * 32 * ethPrice,
};

// @hardcoded
export const VSYSData = (() => {
  // https://explorer.v.systems/nodeInfo/AR45wyKHZnmt7ujqJRT7b4hSk9wX1bjwDkz
  // https://explorer.v.systems/superNodes
  const bonded = 96_909_275;
  // https://www.coingecko.com/en/coins/v-systems
  const coinPrice = 0.001204;

  const TVL = bonded * coinPrice;

  return {
    TVL,
  };
})();
