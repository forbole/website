import { useTheme } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import HighlightButton from "@src/components/highlight-button";
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
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <GuideContentCSS theme={theme}>
          <GuideContentBox
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </GuideContentCSS>
        {!!networkData?.delegate && (
          <div className={styles.stakeButtonWrapper}>
            <Link
              href={networkData?.delegate ? networkData.delegate : ""}
              target="_blank"
            >
              <HighlightButton>{t("stake_now")}</HighlightButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideDetails;
