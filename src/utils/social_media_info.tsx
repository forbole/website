import type { FunctionComponent } from "react";

import {
  Github,
  Instagram,
  LinkedIn,
  Medium,
  Telegram,
  Twitter,
} from "@src/components/icons";

interface SocialMediaProps {
  key: string;
  url: string;
  component: FunctionComponent<{ fill?: string }>;
}

interface SocialMediasProps {
  [key: string]: SocialMediaProps;
}

export const socialMedia: SocialMediasProps = {
  telegram: {
    key: "telegram",
    url: "https://t.me/forbole",
    component: Telegram,
  },
  medium: {
    key: "medium",
    url: "https://medium.com/forbole",
    component: Medium,
  },
  twitter: {
    key: "twitter",
    url: "https://twitter.com/forbole",
    component: Twitter,
  },
  github: {
    key: "github",
    url: "https://github.com/forbole",
    component: Github,
  },
  linkedIn: {
    key: "linkedin",
    url: "https://www.linkedin.com/company/forbole/",
    component: LinkedIn,
  },
  Instagram: {
    key: "Instagram",
    url: "https://www.instagram.com/forbole",
    component: Instagram,
  },
  Instagram_zh: {
    key: "Instagram",
    url: "https://www.instagram.com/forbole.hk",
    component: Instagram,
  },
};
