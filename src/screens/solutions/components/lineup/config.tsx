export interface DetailCardProps {
  image: string;
  icon: string;
  title: string;
  desc1: string;
  desc2: string;
  desc3: string;
  url: string;
  last?: boolean;
}

export interface BlockchainProps {
  networkIcon: string;
  key: string;
}

export interface BDStatsProps {
  stats: number;
  desc: string;
}

export const details: DetailCardProps[] = [
  {
    image: '/images/assets/image_staking_provider.png',
    icon: '/images/assets/icon_forbole.png',
    title: 'staking provider',
    desc1: 'staking provider desc 1',
    desc2: 'staking provider desc 2',
    desc3: 'staking provider desc 3',
    url: 'https://www.forbole.com/stake-now',
  },
  {
    image: '/images/assets/image_desmos_desktop.png',
    icon: '/images/assets/icon_desmos.png',
    title: 'desmos network',
    desc1: 'desmos network desc 1',
    desc2: 'desmos network desc 2',
    desc3: 'desmos network desc 3',
    url: 'https://desmos.network/',
  },
  {
    image: '/images/assets/image_big_dipper.png',
    icon: '/images/assets/icon_big_dipper.png',
    title: 'big dipper',
    desc1: 'big dipper desc 1',
    desc2: 'big dipper desc 2',
    desc3: 'big dipper desc 3',
    url: 'https://bigdipper.live/',
  },
  {
    image: '/images/assets/image_forbole_ventures.png',
    icon: '/images/assets/icon_forbole_ventures.png',
    title: 'forbole ventures',
    desc1: 'forbole ventures desc 1',
    desc2: 'forbole ventures desc 2',
    desc3: 'forbole ventures desc 3',
    url: 'https://ventures.forbole.com/',
    last: true,
  },
];

export const blockchains: BlockchainProps[] = [
  {
    networkIcon: '/images/network/agoric.png',
    key: 'agoric',
  },
  {
    networkIcon: '/images/network/akash.png',
    key: 'akash',
  },
  {
    networkIcon: '/images/network/band_protocol.png',
    key: 'band-protocol',
  },
  {
    networkIcon: '/images/network/celo.png',
    key: 'celo',
  },
  {
    networkIcon: '/images/network/cosmos_hub.png',
    key: 'cosmos-hub',
  },
  {
    networkIcon: '/images/network/desmos.png',
    key: 'desmos',
  },
  {
    networkIcon: '/images/network/e_money.png',
    key: 'e-money',
  },
  {
    networkIcon: '/images/network/flow.png',
    key: 'flow',
  },
  {
    networkIcon: '/images/network/iov.png',
    key: 'iov',
  },
  {
    networkIcon: '/images/network/kava.png',
    key: 'kava',
  },
  {
    networkIcon: '/images/network/likecoin.png',
    key: 'likecoin',
  },
  {
    networkIcon: '/images/network/persistence_one.png',
    key: 'persistence-one',
  },
  {
    networkIcon: '/images/network/sentinel.png',
    key: 'sentinel',
  },
  {
    networkIcon: '/images/network/sharering.png',
    key: 'sharering',
  },
];

export const bd: BDStatsProps[] = [
  {
    stats: 10,
    desc: 'supported blockchains',
  },
  {
    stats: 100,
    desc: 'forked times',
  },
  {
    stats: 140,
    desc: 'countries of traffic',
  },
  {
    stats: 4,
    desc: 'years of journey',
  },
];
