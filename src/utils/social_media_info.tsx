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
  component: FunctionComponent<{ fill?: string }>;
  key: string;
  url: string;
}

interface SocialMediasProps {
  [key: string]: SocialMediaProps;
}

export const socialMedia: SocialMediasProps = {
  github: {
    component: Github,
    key: "github",
    url: "https://github.com/forbole",
  },
  Instagram: {
    component: Instagram,
    key: "Instagram",
    url: "https://www.instagram.com/forbole",
  },
  Instagram_zh: {
    component: Instagram,
    key: "Instagram",
    url: "https://www.instagram.com/forbole.hk",
  },
  linkedIn: {
    component: LinkedIn,
    key: "linkedin",
    url: "https://www.linkedin.com/company/forbole/",
  },
  medium: {
    component: Medium,
    key: "medium",
    url: "https://medium.com/forbole",
  },
  telegram: {
    component: Telegram,
    key: "telegram",
    url: "https://t.me/forbole",
  },
  twitter: {
    component: Twitter,
    key: "twitter",
    url: "https://twitter.com/forbole",
  },
};
