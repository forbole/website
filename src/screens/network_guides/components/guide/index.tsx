/* eslint-disable no-unused-vars */
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import DOMPurify from "isomorphic-dompurify";
import { Box, Typography, useTheme } from "@mui/material";
import { GuideDetails } from "./components";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const Guide = ({ post }: any) => {
  const theme = useTheme();
  const { t } = useTranslation("staking");
  const { title } = post;
  const { sanitize } = DOMPurify;
  const cmsLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const titleArray = title.split(" ");
  const coloredTitle = title.split(" ")[2] + title.split(" ")[3];
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        sx={{
          padding: theme.spacing(5, 3),
          "> .h3": {
            fontWeight: 700,
            fontSize: theme.spacing(3),
            textAlign: "center",
            [theme.breakpoints.up("laptop")]: {
              fontSize: theme.spacing(5),
            },
            "> .h3": {
              fontWeight: 700,
              fontSize: theme.spacing(3),
              textAlign: "center",
              display: "inline",
              [theme.breakpoints.up("laptop")]: {
                fontSize: theme.spacing(5),
              },
            },
          },
          [theme.breakpoints.up("laptop")]: {
            maxWidth: "1200px",
            "> .h3": {
              margin: "auto",
              width: "65%",
              paddingBottom: 5,
            },
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textShadow:
              "0px 1px 8px rgba(16, 24, 40, 0.06), 0px 1px 10px rgba(16, 24, 40, 0.05)",
            fontWeight: 600,
            fontSize: theme.spacing(2),
            textAlign: "center",
            paddingBottom: theme.spacing(3),
            color: theme.palette.custom.forbole.blue,
            [theme.breakpoints.up("laptop")]: {
              fontWeight: 700,
              fontSize: theme.spacing(3),
            },
          }}
        >
          {t("guideline")}
        </Typography>
        <Trans
          i18nKey={t("staking title", {
            title1: titleArray.slice(0, 1).join(" "),
            coloredTitle,
            title2: titleArray.slice(4).join(" "),
          })}
          components={[
            <Box
              className="h3"
              sx={{
                color: theme.palette.custom.forbole.indigo6,
              }}
            />,
            <Box
              className="h3"
              sx={{
                background:
                  "linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            />,
          ]}
        />
        <GuideDetails post={post} />
      </Box>
    </Box>
  );
};

export default Guide;
