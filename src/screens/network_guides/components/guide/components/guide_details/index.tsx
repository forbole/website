import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import HighlightButton from "@src/components/highlight-button";
import { getNetworkInfo } from "@src/utils/network_info";

import * as styles from "./index.module.scss";

const GuideDetails = ({ post }: any) => {
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

  const ctaLink = !!networkData?.delegate ? (
    <div className={styles.stakeButtonWrapper}>
      <Link
        href={networkData?.delegate ? networkData.delegate : ""}
        target="_blank"
      >
        <HighlightButton>{t("stake_now")}</HighlightButton>
      </Link>
    </div>
  ) : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.guideContent}>
          <div
            className={styles.guideContentBox}
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </div>
        {ctaLink}
      </div>
    </div>
  );
};

export default GuideDetails;
