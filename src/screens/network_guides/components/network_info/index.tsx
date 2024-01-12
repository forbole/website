import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import CopyIcon from "@src/components/icons/icon_copy.svg";
import * as guideStyles from "@src/screens/network_guides/components/guide/components/guide_details/index.module.scss";
import { getMiddleEllipsis } from "@src/utils/get_middle_ellipsis";
import { getNetworkInfo } from "@src/utils/network_info";

import InfoCard from "./components/info_card";
import { useNetworkGuidesHook } from "./hooks";
import * as styles from "./index.module.scss";

const excludedImgChains = new Set([
  "archway",
  "coreum",
  "gitopia",
  "oasis",
  "solana",
  "sui",
]);

const mappings: Record<string, string> = {
  "archway-network": "archway",
  "band-protocol": "band",
  "crypto-org": "crypto.org",
  "mars-protocol": "mars",
};

const NetworkInfo = ({ post }: any) => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const { excerpt, featureImage, tags, title } = post;
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { sanitize } = DOMPurify;

  const cmsLoader = ({ quality, src, width }: any) =>
    `${src}?w=${width}&q=${quality || 75}`;

  const networkData = (() => {
    if (tags.length <= 1) return null;

    const mapping = mappings[tags[1].slug as string];

    if (mapping) {
      return getNetworkInfo(mapping);
    }

    return getNetworkInfo(tags[1].slug);
  })();

  const { networkGuides } = useNetworkGuidesHook();

  const networkStats = networkGuides[networkData?.graphql || ""];

  const copyText = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      navigator.clipboard.writeText(
        networkData ? networkData.address || "" : "coming soon",
      );

      setIsCopySuccess(true);
    },
    [networkData],
  );

  const coverImage =
    networkData?.graphql && !excludedImgChains.has(networkData?.graphql)
      ? `/images/guides/how_to_stake_${networkData.graphql}.png`
      : featureImage;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <CardMedia
            alt="network feature image"
            className={styles.coverImage}
            component="img"
            height={onlyLargeScreen ? 240 : 106}
            image={coverImage || featureImage}
          />
          <CardContent className={styles.cardContent}>
            <div className={styles.cardContentBox}>
              <div className={styles.logoBox}>
                {networkData?.image ? (
                  <Image
                    alt={title}
                    height={onlyLargeScreen ? "90" : "52"}
                    loader={cmsLoader}
                    objectFit="contain"
                    quality={100}
                    src={networkData.image}
                    width={onlyLargeScreen ? "90" : "52"}
                  />
                ) : (
                  <div className={styles.logo} />
                )}
              </div>
              <div className={styles.containerName}>
                {networkData?.name && (
                  <h3 className={styles.networkName}>{networkData.name}</h3>
                )}
                {networkData?.address && (
                  <div className={styles.address}>
                    <span
                      className={["value", styles.addressWrapper].join(" ")}
                    >
                      {!onlyLargeScreen
                        ? getMiddleEllipsis(networkData.address, {
                            beginning: 15,
                            ending: 5,
                          })
                        : networkData.address}
                    </span>

                    <IconButton onClick={copyText}>
                      <CopyIcon />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
            {!!networkData?.delegate && (
              <div>
                <Link href={networkData?.delegate ? networkData.delegate : ""}>
                  <HighlightButton>{t("stake_now")}</HighlightButton>
                </Link>
              </div>
            )}
          </CardContent>
          <CardContent>
            <div className={styles.contentBox}>
              {!onlyLargeScreen ? (
                <div className={styles.post}>
                  {readMore ? (
                    <div className={styles.contentCss}>
                      <div
                        className={guideStyles.guideContentBox}
                        dangerouslySetInnerHTML={{
                          __html: sanitize(post.html),
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <span
                        className={[
                          "value",
                          styles.excerpt,
                          readMore ? styles.readMore : "",
                        ].join(" ")}
                      >
                        {excerpt}
                      </span>
                      <button
                        className={[
                          styles.readMoreButton,
                          readMore ? styles.readMore : "",
                        ].join(" ")}
                        onClick={() => setReadMore((prevCheck) => !prevCheck)}
                      >
                        {t("more")}
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className={styles.contentCss}>
                  <div
                    className={guideStyles.guideContentBox}
                    dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
                  />
                </div>
              )}
              {!!networkStats?.length && (
                <div className={styles.infoBox}>
                  {networkStats.map((info, i) => (
                    <InfoCard
                      info={networkData?.key}
                      key={i}
                      stats={info.stats}
                      title={info.title}
                      type={info.type}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Snackbar
        autoHideDuration={5000}
        className={styles.snackbar}
        onClose={() => setIsCopySuccess(false)}
        open={isCopySuccess}
      >
        <Alert onClose={() => setIsCopySuccess(false)} severity="success">
          {t("copied to clipboard")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NetworkInfo;
