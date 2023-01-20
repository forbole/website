/* eslint-disable no-useless-computed-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import * as R from 'ramda';

interface IStringIndex extends Record<string, any> {}

/**
 * Takes the key name and returns the location. Will return null if undefined
 */

const logos: IStringIndex = {
  cosmos: {
    image: '/images/network/cosmos_hub.png',
    name: 'Cosmos Hub',
    label: 'Cosmos Hub - ATOM',
    key: 'cosmos',
    graphql: 'cosmos',
    value: 'cosmos',
    denom: 'ATOM',
    address: 'cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj',
    color: '#ba3fd9',
    bigDipper: 'https://cosmos.bigdipper.live/',
    delegate:
      'https://cosmos.bigdipper.live/validators/cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj/delegate',
    heightSocket: 'wss://ws.cosmoshub.forbole.com',
    guide: 'how-to-stake-atom-on-cosmos-hub',
    calculator: {
      bonded: 'http://lcd.cosmoshub.bigdipper.live/staking/pool',
      inflation: 'http://lcd.cosmoshub.bigdipper.live/minting/inflation',
      supply: 'http://lcd.cosmoshub.bigdipper.live/supply/total/uatom',
      stakingParams:
        'http://lcd.cosmoshub.bigdipper.live/staking/validators/cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj',
    },
  },
  agoric: {
    image: '/images/network/agoric.png',
    name: 'Agoric',
    denom: 'bld',
    key: 'agoric',
    graphql: 'agoric',
    address: 'agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g',
    delegate:
      'https://wallet.keplr.app/#/agoric/stake?tab=inactive-validators&modal=detail&validator=agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g',
    bigDipper: 'https://testnet.explorer.agoric.net/',
    guide: 'how-to-stake-bld-on-agoric',
  },
  akash: {
    image: '/images/network/akash.png',
    name: 'Akash',
    label: 'Akash - AKT',
    key: 'akash',
    graphql: 'akash',
    denom: 'AKT',
    color: '#eb3825',
    bigDipper: 'https://akash.bigdipper.live/',
    address: 'akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073',
    delegate:
      'https://akash.bigdipper.live/validator/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073/delegate',
    heightSocket: 'wss://ws.akash.forbole.com',
    guide: 'how-to-stake-akt-on-akash',
    calculator: {
      bonded: 'https://api.akash.forbole.com/staking/pool',
      inflation: 'https://api.akash.forbole.com/minting/inflation',
      supply: 'https://api.akash.forbole.com/bank/total/uakt',
      stakingParams:
        'https://api.akash.forbole.com/staking/validators/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073',
    },
  },
  ['band-protocol']: {
    image: '/images/network/band_protocol.png',
    name: 'Band Protocol',
    label: 'Band Protocol - BAND',
    key: 'band-protocol',
    graphql: 'band',
    denom: 'BAND',
    address: 'bandvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0wz502z',
    color: '#516FFA',
    heightSocket: 'wss://ws.band.forbole.com',
    bigDipper: 'https://band.bigdipper.live/',
    delegate: 'https://atomicwallet.io/band-staking',
    calculator: {
      bonded: 'http://lcd.band.forbole.com/staking/pool',
      inflation: 'http://lcd.band.forbole.com/minting/inflation',
      supply: 'http://lcd.band.forbole.com/supply/total/uband',
      stakingParams:
        'http://lcd.band.forbole.com/staking/validators/bandvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0wz502z',
    },
  },
  bitsong: {
    image: '/images/network/bitsong.png',
    name: 'BitSong',
    denom: 'btsg',
    key: 'bitsong',
    graphql: 'bitsong',
    address: 'bitsongvaloper125hdkukw4pu2urhj4nv366q0avdqv24twga2kd',
    delegate: 'https://wallet.bitsong.io/#/authentication/login',
    guide: 'how-to-stake-btsg-on-bitsong',
  },
  'crypto.org': {
    image: '/images/network/crypto_org.png',
    name: 'Crypto.org',
    label: 'Crypto.org - CRO',
    denom: 'cro',
    key: 'crypto-org',
    graphql: 'cro',
    delegate:
      'https://crypto-org.bigdipper.live/validator/crocncl15xphw2m025acwnjd2ucq9t5ku4ggaqyecekzqa',
    bigDipper: 'https://crypto-org.bigdipper.live/',
    address: 'crocncl15xphw2m025acwnjd2ucq9t5ku4ggaqyecekzqa',
    guide: 'how-to-stake-cro-on-crypto-org',
  },
  desmos: {
    image: '/images/network/desmos.png',
    name: 'Desmos',
    denom: 'dsm',
    key: 'desmos',
    graphql: 'desmos',
    bigDipper: 'https://morpheus.desmos.network/',
  },
  ['e-money']: {
    image: '/images/network/e_money.png',
    name: 'eMoney',
    denom: 'ngm',
    key: 'e-money',
    graphql: 'emoney',
    address: 'emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y',
    color: '#1e5877',
    bigDipper: 'https://e-money.network/',
    delegate:
      'https://wallet.e-money.com/earn/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y',
    heightSocket: 'wss://ws.emoney.forbole.com',
    guide: 'how-to-stake-ngm-on-e-money',
    calculator: {
      bonded: 'http://lcd.emoney.forbole.com/staking/pool',
      inflation: 'http://lcd.emoney.forbole.com/minting/inflation',
      supply: 'http://lcd.emoney.forbole.com/supply/total/nanolike',
      stakingParams:
        'http://lcd.emoney.forbole.com/staking/validators/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y',
    },
  },
  evmos: {
    image: '/images/network/evmos.png',
    name: 'Evmos',
    label: 'Evmos - EVMOS',
    denom: 'evmos',
    key: 'evmos',
    graphql: 'evmos',
    delegate: 'https://app.evmos.org/staking',
    address: 'evmosvaloper1ak9t7kwk44azu6cefqdydqmy3hen28nvdjjvz0',
    guide: 'how-to-stake-evmos-on-evmos',
  },
  ['fetch-ai']: {
    image: '/images/network/fetch_ai.png',
    name: 'Fetch.ai',
    label: 'Fetch.ai - FET',
    denom: 'fet',
    key: 'fetch-ai',
    graphql: 'fetchai',
    delegate:
      'https://explore.fetch.ai/validator/fetchvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0dzxfx3',
    bigDipper: 'https://explore.fetch.ai/',
    address: 'fetchvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0dzxfx3',
  },
  comdex: {
    image: '/images/network/comdex.png',
    name: 'Comdex',
    label: 'Comdex - CMDX',
    denom: 'cmdx',
    key: 'comdex',
    graphql: 'comdex',
    address: 'comdexvaloper1e4wjh48ks5j5d9702d35q360ffmf3jj2xpuf3f',
    guide: 'how-to-stake-cmdx-on-comdex',
    delegate: 'https://comdex.omniflix.co/',
  },
  axelar: {
    image: '/images/network/axelar.png',
    name: 'Axelar',
    label: 'Axelar - AXL',
    denom: 'axl',
    key: 'axelar',
    graphql: 'axelar',
    address: 'axelarvaloper1r7ppsrmzpslqu3d3yf344kzjv32n9dn4xyt0sw',
    guide: 'how-to-stake-axl-on-axelar',
    delegate: 'https://wallet.keplr.app/chains/axelar',
  },
  bitcanna: {
    image: '/images/network/bitcanna.png',
    name: 'Bitcanna',
    label: 'BitCanna - BCNA',
    denom: 'bcna',
    key: 'bitcanna',
    graphql: 'bitcanna',
    address: 'bcnavaloper1kkpevanspcg0zkxhnvptjszus52svxpcwe32yp',
    guide: 'how-to-stake-bcna-on-bitcanna',
    delegate: 'https://wallet.bitcanna.io/',
  },
  // bifrost: {
  //   guide: 'how-to-stake-bnc-on-bifrost',
  // },
  cheqd: {
    image: '/images/network/cheqd.png',
    name: 'Cheqd',
    label: 'CHEQD Network - CHEQ',
    denom: 'cheq',
    key: 'cheqd',
    graphql: 'cheqd',
    address: 'cheqdvaloper1pknp3fyss23xeezcj6ypd8pl6d2ql4758zpxej',
    guide: 'how-to-stake-cheq-on-cheqd',
    delegate: 'https://wallet.cheqd.io',
  },
  chihuahua: {
    image: '/images/network/chihuahua.png',
    name: 'Chihuahua',
    label: 'Chihuahua Chain - HUAHUA',
    denom: 'huahua',
    key: 'chihuahua',
    graphql: 'chihuahua',
    address: 'chihuahuavaloper14kn0kk33szpwus9nh8n87fjel8djx0y0teaa9l',
    guide: 'how-to-stake-huahua-on-chihuahua',
    delegate: 'https://chihuahua.omniflix.co/',
  },
  ['terra_classic']: {
    image: '/images/network/terra_classic.png',
    name: 'Terra Classic',
    label: 'Terra Classic - LUNC',
    denom: 'LUNC',
    key: 'terra_classic',
    graphql: 'terra_classic',
    address: 'terravaloper1v6pfkm0nxpudgantwxwhz786l8me0wfs4lnpuw',
  },
  persistence: {
    image: '/images/network/persistence.png',
    name: 'Persistence',
    label: 'Persistence - XPRT',
    denom: 'xprt',
    key: 'persistence',
    graphql: 'persistence',
    address: 'persistencevaloper17qamc7jjwfr6ye7cffranxkgxfum6esxe89vvv',
    guide: 'how-to-stake-xprt-on-persistence',
    delegate: 'https://wallet.keplr.app/chains/persistence',
  },
  crescent: {
    image: '/images/network/crescent.png',
    name: 'Crescent',
    label: 'Crescent Network - CRE',
    denom: 'cre',
    key: 'crescent',
    graphql: 'crescent',
    address: 'crevaloper1ls9w867xu0q5zjze5vrakfa2zluahtv44gwn7y',
    guide: 'how-to-stake-cre-on-crescent',
    delegate: 'https://crescent.disperze.network/',
  },
  ixo: {
    image: '/images/network/ixo.png',
    name: 'ixo',
    label: 'IXO - IXO',
    denom: 'ixo',
    key: 'ixo',
    graphql: 'ixo',
    address: 'ixovaloper1dvr6jp0j7jqjrzqp4xz333h2s85pxvzgzsdula',
    guide: 'how-to-stake-ixo-on-ixo',
    delegate: 'https://wallet.keplr.app/chains/ixo',
  },
  injective: {
    image: '/images/network/injective.png',
    name: 'Injective',
    label: 'Injective - INJ',
    denom: 'inj',
    key: 'injective',
    graphql: 'injective',
    address: 'injvaloper12s9d7l53ef2c8avrn7pgd6dfeeg2yzel58ztfx',
  },
  juno: {
    image: '/images/network/juno.png',
    name: 'Juno',
    label: 'Juno - JUNO',
    denom: 'juno',
    key: 'juno',
    graphql: 'juno',
  },
  kava: {
    image: '/images/network/kava.png',
    name: 'Kava',
    label: 'Kava - KAVA',
    denom: 'kava',
    key: 'kava',
    graphql: 'kava',
    address: 'kavavaloper14kn0kk33szpwus9nh8n87fjel8djx0y02c7me3',
    guide: 'how-to-stake-kava-on-kava',
    delegate: 'https://wallet.keplr.app/chains/kava',
  },
  band: {
    image: '/images/network/band_protocol.png',
    name: 'Band',
    denom: 'band',
    label: 'Band Protocol - BAND',
    key: 'band',
    graphql: 'band',
    address: 'bandvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0wz502z',
  },
  likecoin: {
    image: '/images/network/likecoin.png',
    name: 'Likecoin',
    label: 'Likecoin - LIKE',
    denom: 'like',
    key: 'likecoin',
    graphql: 'likecoin',
    address: 'likevaloper1v8njts96gl5eqstnen4gksdy5k860fau6nxc04',
    guide: 'how-to-stake-like-on-likecoin',
    delegate: 'https://dao.like.co/',
  },
  assetmantle: {
    image: '/images/network/assetmantle.png',
    name: 'Assetmantle',
    label: 'Assetmantle - MNTL',
    denom: 'mntl',
    key: 'assetmantle',
    graphql: 'assetmantle',
    address: 'mantlevaloper14kn0kk33szpwus9nh8n87fjel8djx0y09q0ln7',
    guide: 'how-to-stake-mntl-on-assetmantle',
    delegate: 'https://wallet.assetmantle.one/',
  },
  osmosis: {
    image: '/images/network/osmosis.png',
    name: 'Osmosis',
    label: 'Osmosis - OSMO',
    denom: 'osmo',
    key: 'osmosis',
    graphql: 'osmosis',
    address: 'osmovaloper14kn0kk33szpwus9nh8n87fjel8djx0y0fhtak5',
    guide: 'how-to-stake-osmo-on-osmosis',
    delegate: 'https://wallet.keplr.app/chains/osmosis',
  },
  provenance: {
    image: '/images/network/provenance.png',
    name: 'Provenance',
    denom: 'hash',
    key: 'provenance',
    graphql: 'provenance',
    address: 'pbvaloper1plh34z4gmfcypecdzudcfhytcyeulyxj0l8t75',
  },
  regen: {
    image: '/images/network/regen.png',
    name: 'Regen',
    label: 'Regen - REGEN',
    denom: 'regen',
    key: 'regen',
    graphql: 'regen',
    address: 'regenvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0c7xhe5',
  },
  secret: {
    image: '/images/network/secret.png',
    name: 'Secret',
    label: 'Secret - SCRT',
    denom: 'scrt',
    key: 'secret',
    graphql: 'secret',
    address: 'secretvaloper1kvp570cd6zvzh8ffrhz7lmytt6v6u2gxz8tl0g',
    guide: 'how-to-stake-scrt-on-secret-network',
    delegate: 'https://wallet.keplr.app/chains/secret-network',
  },
  sentinel: {
    image: '/images/network/sentinel.png',
    name: 'Sentinel',
    label: 'Sentinel - DVPN',
    denom: 'dvpn',
    key: 'sentinelhub',
    graphql: 'sentinelhub',
    address: 'sentvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0l9e6u8',
    guide: 'how-to-stake-dvpn-on-sentinel',
    delegate: 'https://wallet.keplr.app/chains/sentinel',
  },
  shentu: {
    image: '/images/network/shentu.png',
    name: 'Shentu',
    label: 'Shentu - CTK',
    denom: 'ctk',
    key: 'shentu',
    graphql: 'shentu',
    address: 'certikvaloper17agcmyws85x5yw08r60zwgdqa6zqy38d7zm33g',
  },
  sifchain: {
    image: '/images/network/sifchain.png',
    name: 'Sifchain',
    label: 'Sifchain - EROWAN',
    denom: 'erowan',
    key: 'sifchain',
    graphql: 'sifchain',
    address: 'sifvaloper1kcgt2phy70a06a5uspw5gc37a2mkv0lxlwnadx',
    guide: 'how-to-stake-rowan-on-sifchain',
    delegate: 'https://wallet.keplr.app/chains/sifchain',
  },
  sommelier: {
    image: '/images/network/sommelier.png',
    name: 'Sommelier',
    label: 'Sommelier - SOMM',
    denom: 'somm',
    key: 'sommelier',
    graphql: 'sommelier',
    address: 'sommvaloper1l449zpgsn74y7vneh27malgfc8yg76ckpz6w78',
  },
  stafihub: {
    image: '/images/network/stafihub.png',
    name: 'Stafihub',
    label: 'Stafi - FIS',
    denom: 'fis',
    key: 'stafihub',
    graphql: 'stafihub',
    address: 'stafivaloper1pvwqfze548z95sdhun58trrvxhlhfrvkwtr9vz',
  },
  stride: {
    image: '/images/network/stride.png',
    name: 'Stride',
    label: 'Stride - STRD',
    denom: 'strd',
    key: 'stride',
    graphql: 'stride',
    address: 'stridevaloper19d8a9dr4kh85zcl5kq7fj64ad9r9dqfky93dgq',
  },
  elrond: {
    image: '/images/network/elrond.png',
    name: 'Elrond',
    denom: 'egld',
    key: 'elrond',
    graphql: 'elrond',
    address: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40llllsfjmn54',
  },
  solana: {
    image: '/images/network/solana.png',
    name: 'Solana',
    denom: 'SOL',
    key: 'solana',
    graphql: 'solana',
    address: '76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQfF66jZhQ857',
  },
  cardano: {
    image: '/images/network/cardano.png',
    name: 'Cardano',
    denom: 'ADA',
    key: 'cardano',
    graphql: 'cardano',
  },
  ethereum: {
    image: '/images/network/ethereum.png',
    name: 'Ethereum',
    denom: 'ETH',
    key: 'ethereum',
    graphql: 'ethereum',
  },
  ['gravity_bridge']: {
    image: '/images/network/gravity_bridge.png',
    name: 'Gravity Bridge',
    denom: 'GRAVITON',
    key: 'gravity_bridge',
    graphql: 'gravitybridge',
    guide: 'how-to-stake-grav-on-gravity-bridge',
    delegate: 'https://wallet.keplr.app/chains/gravity-bridge',
    address: 'gravityvaloper1xwkkam88aep5jcu2hcj0a2hy79eyvcw6yhfgv6',
  },
  jackal: {
    image: '/images/network/jackal.png',
    name: 'Jackal Protocol',
    denom: 'JKL',
    key: 'jackal',
    graphql: 'jackal',
  },
  kusama: {
    image: '/images/network/kusama.png',
    name: 'Kusama',
    denom: 'KSM',
    key: 'kusama',
    graphql: 'kusama',
  },
  terra: {
    image: '/images/network/terra.png',
    name: 'Terra',
    denom: 'LUNA',
    key: 'terra',
    graphql: 'terra',
  },
  nomic: {
    image: '/images/network/nomic.png',
    name: 'Nomic Network',
    denom: 'NOM',
    key: 'nomic',
    graphql: 'nomic',
    // need staking guide stats:
    guide: 'how-to-stake-nom-on-nomic',
    delegate: 'https://app.nomic.io/',
    address: 'nomic1yvzvykkvqruhrvwn7776tm6ppmaf4gcnazas2e',
  },
  nym: {
    image: '/images/network/nym.png',
    name: 'NYM',
    denom: 'NYX',
    key: 'nym',
    graphql: 'nym',
  },
  oasis: {
    image: '/images/network/oasis.png',
    name: 'Oasis Network',
    denom: 'ROSE',
    key: 'oasis',
    graphql: 'oasis',
  },
  omniflix: {
    image: '/images/network/omniflix.png',
    name: 'Omniflix Network',
    denom: 'FLIX',
    key: 'omniflix',
    graphql: 'omniflix',
  },
  passage: {
    image: '/images/network/passage.png',
    name: 'Passage',
    denom: 'PASG',
    key: 'passage',
    graphql: 'passage',
  },
  celer: {
    image: '/images/network/celer.png',
    name: 'Celer',
    denom: 'CELER',
    key: 'celer',
    graphql: 'celer',
  },
  quicksilver: {
    image: '/images/network/quicksilver.png',
    name: 'Quicksilver Protocol',
    denom: 'QCK',
    key: 'quicksilver',
    graphql: 'quicksilver',
  },
  radix: {
    image: '/images/network/radix.png',
    name: 'Radix',
    denom: 'XRD',
    key: 'radix',
    graphql: 'radix',
  },
  ssv: {
    image: '/images/network/ssv.png',
    name: 'SSV Network',
    denom: 'SSV',
    key: 'ssv',
    graphql: 'ssv',
  },
  stargaze: {
    image: '/images/network/stargaze.png',
    name: 'Stargaze',
    denom: 'STARS',
    key: 'stargaze',
    graphql: 'stargaze',
  },
  teritori: {
    image: '/images/network/teritori.png',
    name: 'Teritori',
    denom: 'TORI',
    key: 'teritori',
    graphql: 'teritori',
  },
  tgrade: {
    image: '/images/network/tgrade.png',
    name: 'Tgrade',
    denom: 'TGD',
    key: 'tgrade',
    graphql: 'tgrade',
  },
  wormhole: {
    image: '/images/network/wormhole.png',
    name: 'Wormhole',
    // denom: 'NUL',
    key: 'wormhole',
    graphql: 'wormhole',
  },
  vsys: {
    image: '/images/network/v-systems.png',
    name: 'V Systems',
    denom: 'VSYS',
    key: 'vsys',
    graphql: 'vsys',
  },
  ununifi: {
    image: '/images/network/ununifi.png',
    name: 'Ununifi',
    denom: 'GUU',
    key: 'ununifi',
    graphql: 'ununifi',
  },
  xpla: {
    image: '/images/network/xpla.png',
    name: 'XPLA',
    denom: 'XPLA',
    key: 'xpla',
    graphql: 'xpla',
  },
};

export const getNetworkInfo = (key: string | number) => {
  return logos[key] ?? {};
};
