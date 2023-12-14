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

import { InfoCard } from "./components";
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
        <Card
          sx={{
            background: theme.palette.common.white,
            /* Shadow/Secondary (Validator)/Drop Shadow 01 */
            boxShadow:
              "0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)",
            borderRadius: 2,
          }}
        >
          <CardMedia
            alt="network feature image"
            className={styles.coverImage}
            component="img"
            height={onlyLargeScreen ? 240 : 106}
            image={coverImage || featureImage}
          />
          <CardContent className={styles.cardContent}>
            <Box className={styles.cardContentBox}>
              <Box
                sx={{
                  "> span": {
                    borderRadius: "50%",
                    border: "8px solid #FFFFFF !important" as any,
                  },
                }}
              >
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
                  <Box
                    style={{
                      height: onlyLargeScreen ? 90 : 52,
                      width: onlyLargeScreen ? 90 : 52,
                    }}
                  />
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
                <Box sx={{ padding: theme.spacing(0, 2) }} textAlign="center">
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
                        className="value"
                        color={theme.palette.custom.forbole.blue}
                        sx={{
                          display: "contents",
                          textAlign: "center",
                          WebkitLineClamp: readMore ? "unset" : "inherit",
                        }}
                        variant="body2"
                      >
                        {excerpt}
                      </Typography>
                      <Button
                        onClick={() => setReadMore((prevCheck) => !prevCheck)}
                        sx={{
                          color: "#007FFF",
                          display: readMore ? "none" : "inline-block",
                          padding: 0,
                        }}
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
                <Box
                  sx={{
                    display: "grid",
                    padding: "12px 8px",
                    gridGap: theme.spacing(2),
                    gridTemplateColumns: "repeat(1, 1fr)",
                    paddingTop: theme.spacing(3),
                    width: "100%",
                    [theme.breakpoints.up("laptop")]: {
                      gridTemplateRows: "repeat(2, 1fr)",
                      gridTemplateColumns: "1fr 1fr",
                      paddingTop: 0,
                      width: "50%",
                    },
                  }}
                >
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
        onClose={() => setIsCopySuccess(false)}
        open={isCopySuccess}
        sx={{ justifyContent: "center" }}
      >
        <Alert onClose={() => setIsCopySuccess(false)} severity="success">
          {t("copied to clipboard")}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default NetworkInfo;
