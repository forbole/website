import { Box, Button, useTheme } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import useTranslation from "next-translate/useTranslation";

import { getNetworkInfo } from "@src/utils/network_info";

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
    <Box
      sx={{
        maxWidth: "100%",
        margin: "auto",
        boxShadow: "4px 8px 24px rgba(116, 81, 255, 0.16)",
        borderRadius: 5,
        [theme.breakpoints.up("laptop")]: {
          background: theme.palette.primary.main,
          boxShadow:
            "0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)",
          borderRadius: theme.spacing(3),
          maxWidth: "70%",
        },
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(5, 2),
          [theme.breakpoints.up("laptop")]: {
            padding: theme.spacing(8, 9),
          },
        }}
      >
        <GuideContentCSS theme={theme}>
          <GuideContentBox
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </GuideContentCSS>
        {!!networkData?.delegate && (
          <Box
            sx={{
              paddingTop: theme.spacing(6),
              display: "flex",
              justifyContent: "flex-start",
              [theme.breakpoints.up("laptop")]: {
                justifyContent: "center",
              },
            }}
          >
            <Button
              href={networkData?.delegate ? networkData.delegate : ""}
              sx={{
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
                },
              }}
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
