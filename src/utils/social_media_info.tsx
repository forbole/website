import type { FunctionComponent } from "react";

import Github from "@src/components/icons/github";
import Instagram from "@src/components/icons/instagram";
import LinkedIn from "@src/components/icons/linkedin";
import Medium from "@src/components/icons/medium";
import Telegram from "@src/components/icons/telegram";
import Twitter from "@src/components/icons/twitter";

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
  instagram: {
    component: Instagram,
    key: "instagram",
    url: "https://www.instagram.com/forbole",
  },
  instagram_zh: {
    component: Instagram,
    key: "instagram_zh",
    url: "https://www.instagram.com/forbole.hk",
  },
  linkedin: {
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
