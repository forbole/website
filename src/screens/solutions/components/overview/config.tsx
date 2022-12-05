export interface ProductCardProps {
  icon: string;
  title: string;
  desc: string;
  url?: string;
}

export const products: ProductCardProps[] = [
  {
    icon: '/images/assets/icon_forbole.png',
    title: 'staking provider',
    desc: 'staking provider desc',
    url: 'https://www.forbole.com/staking',
  },
  {
    icon: '/images/assets/icon_desmos.png',
    title: 'desmos network',
    desc: 'desmos network desc',
    url: 'https://desmos.network/',
  },
  {
    icon: '/images/assets/icon_big_dipper.png',
    title: 'big dipper',
    desc: 'big dipper desc',
    url: 'https://bigdipper.live/',
  },
  {
    icon: '/images/assets/icon_forbole_ventures.png',
    title: 'forbole ventures',
    desc: 'forbole ventures desc',
    url: 'https://ventures.forbole.com/',
  },
  {
    icon: '/images/assets/icon_forbole_blue.png',
    title: 'launching soon',
    desc: 'launching desc',
  },
];
