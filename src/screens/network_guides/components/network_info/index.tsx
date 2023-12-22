import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useCallback } from "react";

import { CopyIcon } from "@src/components/icons";
import { getMiddleEllipsis } from "@src/utils/get_middle_ellipsis";
import { getNetworkInfo } from "@src/utils/network_info";

import InfoCard from "./components/info_card";
import { useNetworkGuidesHook } from "./hooks";
import * as styles from "./index.module.scss";
import { ContentBox, ContentCSS } from "./styles";

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
  const { title, tags, excerpt, featureImage } = post;
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const [isCopySuccess, setIsCopySuccess] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { sanitize } = DOMPurify;

  const cmsLoader = ({ src, width, quality }: any) =>
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
    <Box className={styles.wrapper}>
      <Box className={styles.container}>
        <Card className={styles.card}>
          <CardMedia
            alt="network feature image"
            className={styles.coverImage}
            component="img"
            height={onlyLargeScreen ? 240 : 106}
            image={coverImage || featureImage}
          />
          <CardContent className={styles.cardContent}>
            <Box className={styles.cardContentBox}>
              <Box className={styles.logoBox}>
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
                  <Box className={styles.logo} />
                )}
              </Box>
              <Box pl={onlyLargeScreen && networkData?.address ? 2 : 1}>
                {networkData?.name && (
                  <Typography className={styles.networkName} variant="h3">
                    {networkData.name}
                  </Typography>
                )}
                {networkData?.address && (
                  <Box className={styles.address}>
                    <Typography
                      className="value"
                      color="#ba6600"
                      fontWeight={700}
                      variant="body2"
                    >
                      {!onlyLargeScreen
                        ? getMiddleEllipsis(networkData.address, {
                            beginning: 15,
                            ending: 5,
                          })
                        : networkData.address}
                    </Typography>

                    <IconButton onClick={copyText}>
                      <CopyIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
            {!!networkData?.delegate && (
              <Box>
                <Button
                  className={styles.stakeButton}
                  href={networkData?.delegate ? networkData.delegate : ""}
                  variant="contained"
                >
                  {t("stake_now")}
                </Button>
              </Box>
            )}
          </CardContent>
          <CardContent>
            <Box className={styles.contentBox}>
              {!onlyLargeScreen ? (
                <Box className={styles.post}>
                  {readMore ? (
                    <ContentCSS theme={theme}>
                      <ContentBox
                        dangerouslySetInnerHTML={{
                          __html: sanitize(post.html),
                        }}
                      />
                    </ContentCSS>
                  ) : (
                    <>
                      <Typography
                        className={[
                          "value",
                          styles.excerpt,
                          readMore ? styles.readMore : "",
                        ].join(" ")}
                        variant="body2"
                      >
                        {excerpt}
                      </Typography>
                      <Button
                        className={[
                          styles.readMoreButton,
                          readMore ? styles.readMore : "",
                        ].join(" ")}
                        onClick={() => setReadMore((prevCheck) => !prevCheck)}
                      >
                        {t("more")}
                      </Button>
                    </>
                  )}
                </Box>
              ) : (
                <ContentCSS theme={theme}>
                  <ContentBox
                    dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
                  />
                </ContentCSS>
              )}
              {!!networkStats?.length && (
                <Box className={styles.infoBox}>
                  {networkStats.map((info, i) => (
                    <InfoCard
                      info={networkData?.key}
                      key={i}
                      stats={info.stats}
                      title={info.title}
                      type={info.type}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
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
    </Box>
  );
};

export default NetworkInfo;
