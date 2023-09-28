import { Telegram, Medium, Twitter, Github, LinkedIn, Instagram } from "@icons";
import * as React from "react";
import { useRouter } from "next/router";

interface SocialMediaProps {
  key: string;
  url: string;
  component: React.FunctionComponent<{ fill?: string }>;
}

interface SocialMediasProps {
  [key: string]: SocialMediaProps;
}

const socialMedia: SocialMediasProps = {
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

export const getSocialMediaInfo = (keyParam: string) => {
  let key = keyParam;
  const { locale } = useRouter();
  if (key === "Instagram") {
    if (locale !== "en") {
      key += "_zh";
    }
  }
  return socialMedia[key] ?? {};
};
