import { Box, Button, useTheme } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";

import { getNetworkInfo } from "@src/utils/network_info";

import * as styles from "./index.module.scss";
import { GuideContentBox, GuideContentCSS } from "./styles";

const GuideDetails = ({ post }: any) => {
  const theme = useTheme();
  const { tags } = post;
  const { t } = useTranslation("staking");

  const networkData =
    // eslint-disable-next-line no-nested-ternary
    tags.length <= 1
      ? null
      : tags[1].slug === "crypto-org"
        ? getNetworkInfo("crypto.org")
        : getNetworkInfo(tags[1].slug);

  const { sanitize } = DOMPurify;

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.content}>
        <GuideContentCSS theme={theme}>
          <GuideContentBox
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </GuideContentCSS>
        {!!networkData?.delegate && (
          <Box className={styles.stakeButtonWrapper}>
            <Button
              className={styles.stakeButton}
              href={networkData?.delegate ? networkData.delegate : ""}
              variant="contained"
            >
              {t("stake_now")}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GuideDetails;
