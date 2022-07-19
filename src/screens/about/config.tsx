import { ContactIIcon, ContactIIIcon, ContactIIIIcon } from '@icons';

interface AwardProps {
  year?: number;
  title: string;
  desc: string;
  timeline: string;
}

export const awards: AwardProps[] = [
  {
    year: 2022,
    title: 'grant',
    desc: 'grant desc',
    timeline: 'grant time',
  },
  {
    title: 'desmos osmosis',
    desc: 'desmos osmosis desc',
    timeline: 'desmos osmosis time',
  },
  {
    year: 2021,
    title: 'airdrop',
    desc: 'airdrop desc',
    timeline: 'airdrop time',
  },
  { title: 'BD v2', desc: 'BD v2 desc', timeline: 'BD v2 time' },
  {
    year: 2020,
    title: 'interchain',
    desc: 'interchain desc',
    timeline: 'interchain time',
  },
  { title: 'desmos', desc: 'desmos desc', timeline: 'desmos time' },
  {
    year: 2019,
    title: 'inception',
    desc: 'inception desc',
    timeline: 'inception time',
  },
  {
    title: 'appWorks',
    desc: 'appWorks desc',
    timeline: 'appWorks time',
  },
  { year: 2018, title: 'BD', desc: 'BD desc', timeline: 'BD time' },
  { title: 'debut', desc: 'debut desc', timeline: 'debut time' },
  {
    year: 2017,
    title: 'forbole',
    desc: 'forbole desc',
    timeline: 'forbole time',
  },
];

interface IconProps {
  icon: any;
  title: string;
  picture: any;
}

export const icons: IconProps[] = [
  {
    icon: ContactIIcon,
    picture: '/images/assets/icon01.png',
    title: 'title 1',
  },
  {
    icon: ContactIIIcon,
    picture: '/images/assets/icon02.png',
    title: 'title 2',
  },
  {
    icon: ContactIIIIcon,
    picture: '/images/assets/icon03.png',
    title: 'title 3',
  },
];
