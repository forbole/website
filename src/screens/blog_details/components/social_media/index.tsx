import { Box } from "@mui/material";
import { useRouter } from "next/router";

import { Facebook, LinkedIn, Telegram, Twitter } from "@src/components/icons";

import * as styles from "./index.module.scss";

const SocialMedia = (props: any) => {
  const { title = "Forbole " } = props;
  const router = useRouter();
  const path = router.asPath;
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}${path}`;

  const handleClick = (url: string) => {
    const config: { [key: string]: string | number } = {
      height: 400,
      width: 550,
      location: "no",
      toolbar: "no",
      status: "no",
      directories: "no",
      menubar: "no",
      scrollbars: "yes",
      resizable: "no",
      centerscreen: "yes",
      chrome: "yes",
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
      <span
        onClick={() =>
          handleClick(
            `https://telegram.me/share/?url=${shareUrl}&text=${title}`,
          )
        }
        role="button"
      >
        <Telegram />
      </span>
      <span
        onClick={() =>
          handleClick(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${title}`,
          )
        }
        role="button"
      >
        <Facebook />
      </span>
      <span
        onClick={() =>
          handleClick(
            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
          )
        }
        role="button"
      >
        <Twitter />
      </span>
      <span
        onClick={() =>
          handleClick(
            `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${title}`,
          )
        }
        role="button"
      >
        <LinkedIn />
      </span>
    </Box>
  );
};

export default SocialMedia;
