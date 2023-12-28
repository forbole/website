import { Box } from "@mui/material";
import { useRouter } from "next/router";

import { Facebook, LinkedIn, Telegram, Twitter } from "@src/components/icons";

import * as styles from "./index.module.scss";

const SocialMedia = ({ title = "Forbole " }: any) => {
  const router = useRouter();
  const path = router.asPath;
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}${path}`;

  const handleClick = (url: string) => {
    const config: { [key: string]: number | string } = {
      centerscreen: "yes",
      chrome: "yes",
      directories: "no",
      height: 400,
      location: "no",
      menubar: "no",
      resizable: "no",
      scrollbars: "yes",
      status: "no",
      toolbar: "no",
      width: 550,
    };

    window.open(
      url,
      "",
      Object.keys(config)
        .map((key) => `${key}=${config[key]}`)
        .join(", "),
    );
  };

  return (
    <Box className={styles.wrapper}>
      <button
        aria-label="Share on Telegram"
        onClick={() =>
          handleClick(
            `https://telegram.me/share/?url=${shareUrl}&text=${title}`,
          )
        }
      >
        <Telegram />
      </button>
      <button
        aria-label="Share on Facebook"
        onClick={() =>
          handleClick(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${title}`,
          )
        }
      >
        <Facebook />
      </button>
      <button
        aria-label="Share on Twitter"
        onClick={() =>
          handleClick(
            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
          )
        }
      >
        <Twitter />
      </button>
      <button
        aria-label="Share on LinkedIn"
        onClick={() =>
          handleClick(
            `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${title}`,
          )
        }
      >
        <LinkedIn />
      </button>
    </Box>
  );
};

export default SocialMedia;
