import { CopyIcon } from "@icons";
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
import React from "react";

import { getNetworkInfo } from "@src/utils/network_info";
import { getMiddleEllipsis } from "@utils/get_middle_ellipsis";

import { InfoCard } from "./components";
import { useNetworkGuidesHook } from "./hooks";
import { ContentBox, ContentCSS } from "./styles";

const excludedImgChains = new Set([
  "archway",
  "coreum",
  "gitopia",
  "solana",
  "sui",
]);

const mappings: Record<string, string> = {
  "archway-network": "archway",
  "crypto-org": "crypto.org",
  "mars-protocol": "mars",
};

const NetworkInfo = ({ post }: any) => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const { title, tags, excerpt, featureImage } = post;
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up("laptop"));
  const [isCopySuccess, setIsCopySuccess] = React.useState(false);
  const [readMore, setReadMore] = React.useState(false);
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

  const { cosmosNetworkGuides } = useNetworkGuidesHook();

  const networkStats = cosmosNetworkGuides[networkData?.graphql || ""];

  const copyText = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
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
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      sx={{
        padding: theme.spacing(15, 3),
        [theme.breakpoints.up("laptop")]: {
          padding: theme.spacing(0, 3),
        },
      }}
    >
      <Box
        sx={{
          [theme.breakpoints.up("laptop")]: {
            maxWidth: "1200px",
          },
        }}
      >
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
            component="img"
            height={onlyLargeScreen ? 240 : 106}
            image={coverImage || featureImage}
            sx={{
              objectFit: "cover",
              objectPosition: "0% 37%",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              paddingTop: 0,
              marginTop: theme.spacing(-5),
              [theme.breakpoints.up("laptop")]: {
                justifyContent: "space-between",
                marginTop: theme.spacing(-7),
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
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
                  <Typography
                    sx={{
                      background: "rgba(255, 255, 255, 0.7)",
                      borderRadius: theme.spacing(1),
                      fontSize: theme.spacing(2),
                      fontWeight: 600,
                      padding: theme.spacing(1),
                      paddingBottom: theme.spacing(1),
                    }}
                    variant="h3"
                  >
                    {networkData.name}
                  </Typography>
                )}
                {networkData?.address && (
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    mt={-1}
                  >
                    <Typography
                      className="value"
                      color="#76819B"
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
                  href={networkData?.delegate ? networkData.delegate : ""}
                  sx={{
                    display: "none",
                    width: "97px",
                    height: "32px",
                    lineHeight: "17px",
                    fontWeight: 600,
                    padding: 0,
                    background:
                      "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                    borderRadius: theme.spacing(3),
                    color: "primary.main",
                    boxShadow: "none",
                    [theme.breakpoints.up("laptop")]: {
                      width: "111px",
                      height: "45px",
                      display: "inline-flex",
                    },
                  }}
                  variant="contained"
                >
                  {t("stake_now")}
                </Button>
              </Box>
            )}
          </CardContent>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                [theme.breakpoints.up("laptop")]: {
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              }}
            >
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
                      key={i}
                      info={networkData?.key}
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
