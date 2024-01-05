import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";

import * as commonStyles from "@src/screens/staking/common.module.scss";
import { type PostDetail, getBlogPostSchema } from "@src/utils/ghost";

import GuideDetails from "./components/guide_details";
import * as styles from "./index.module.scss";

const Guide = ({ post }: { post: PostDetail }) => {
  const { locale } = useRouter();
  const { t } = useTranslation("staking");

  const { title } = post;

  const titleArray = title.split(" ");
  const coloredTitle = [titleArray[2], titleArray[3]].join(" ");

  return (
    <Box className={styles.wrapper} data-test="staking-guide-info">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBlogPostSchema(true, post, locale)),
          }}
          type="application/ld+json"
        />
      </Head>
      <Box className={commonStyles.stakingContent}>
        <Typography className={commonStyles.stakingTitle}>
          {t("guideline")}
        </Typography>
        <h1 className={["h3", styles.tr0].join(" ")}>
          {titleArray.slice(0, 2).join(" ")}{" "}
          <span className={["h3", styles.tr1].join(" ")}>{coloredTitle}</span>{" "}
          {titleArray.slice(4).join(" ")}
        </h1>
        <GuideDetails post={post} />
      </Box>
    </Box>
  );
};

export default Guide;
