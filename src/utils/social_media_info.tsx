import { Telegram, Medium, Twitter, Github, LinkedIn } from '@icons';
import * as React from 'react';

interface SocialMediaProps {
  key: string;
  url: string;
  component: React.FunctionComponent;
}

interface SocialMediasProps {
  [key: string]: SocialMediaProps;
}

const socialMedia: SocialMediasProps = {
  telegram: {
    key: 'telegram',
    url: 'https://t.me/forbole',
    component: Telegram,
  },
  medium: {
    key: 'medium',
    url: 'https://medium.com/forbole',
    component: Medium,
  },
  twitter: {
    key: 'twitter',
    url: 'https://twitter.com/forbole',
    component: Twitter,
  },
  github: {
    key: 'github',
    url: 'https://github.com/forbole',
    component: Github,
  },
  linkedIn: {
    key: 'linkedin',
    url: 'https://www.linkedin.com/company/forbole/',
    component: LinkedIn,
  },
  //   rss: {
  //     key: 'rss',
  //     url: 'https://www.forbole.com/rss/',
  //     component: RSS,
  //   },
};

export const getSocialMediaInfo = (key: string) => {
  return socialMedia[key] ?? {};
};
