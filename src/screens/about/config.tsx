import { ContactIIcon, ContactIIIcon, ContactIIIIcon } from '@icons';

interface AwardProps {
  year?: number;
  title: string;
  desc: string;
  timeline: string;
}

export const awards: AwardProps[] = [
  { year: 2021, title: 'new BD', desc: 'new BD desc', timeline: 'new BD time' },
  {
    year: 2020,
    title: 'interchain',
    desc: 'interchain desc',
    timeline: 'interchain time',
  },
  { title: 'desmos', desc: 'desmos desc', timeline: 'desmos time' },
  {
    year: 2019,
    title: 'appWorks',
    desc: 'appWorks desc',
    timeline: 'appWorks time',
  },
  { title: 'inception', desc: 'inception desc', timeline: 'inception time' },
  { year: 2018, title: 'debut', desc: 'debut desc', timeline: 'debut time' },
  { title: 'BD', desc: 'BD desc', timeline: 'BD time' },
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
