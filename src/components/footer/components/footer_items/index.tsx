import { Box, Divider, Typography, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import { FooterProps } from "../../types";
import useStyles from "./useStyles";

const FooterItems = ({ staking }: FooterProps) => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const today = new Date();
  const year = today.getFullYear();
  const styles = useStyles();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("laptop")]: {
          flexDirection: "column-reverse",
          gap: "32px",
          fontSize: "20px",
        },
        [theme.breakpoints.up("laptop")]: {
          flexDirection: "row",
          fontSize: "14px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          [theme.breakpoints.down("laptop")]: {
            pt: "12px",
            gap: "8px",
            borderTop: `1px solid ${theme.palette.custom.forbole.grey02}`,
          },
          [theme.breakpoints.up("laptop")]: {
            "flexDirection": "row",
            "& hr": {
              mx: 2,
            },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "590",
            lineHeight: "20px",
            letterSpacing: "0.336px",
          }}
        >
          {t("copyright", { year })}
        </Typography>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            my: "4px",
            borderColor: staking
              ? theme.palette.custom.forbole.indigo
              : theme.palette.primary.main,
            [theme.breakpoints.down("laptop")]: {
              display: "none",
            },
          }}
          variant="middle"
        />
        <Link href="/terms-and-conditions" passHref>
          <Typography component="a" css={styles.word}>
            {t("tnc")}
          </Typography>
        </Link>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            my: "4px",
            borderColor: staking
              ? theme.palette.custom.forbole.indigo
              : theme.palette.primary.main,
            [theme.breakpoints.down("laptop")]: {
              display: "none",
            },
          }}
          variant="middle"
        />
        <Link href="/privacy-policy" passHref>
          <Typography component="a" css={styles.word}>
            {t("policy")}
          </Typography>
        </Link>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.down("laptop")]: {
              gap: "12px",
            },
            [theme.breakpoints.up("laptop")]: {
              "flexDirection": "row",
              "alignItems": "center",
              "paddingTop": 0,
              "paddingBottom": 0,
              "& hr": {
                mx: 2,
              },
            },
          }}
        >
          <Link
            href="https://drive.google.com/drive/folders/1w93woI10nRmH3ei6rfFQm4eZxyvk_4-2"
            passHref
          >
            <Typography component="a" css={styles.word}>
              {t("brand guide")}
            </Typography>
          </Link>
          <Divider
            flexItem
            orientation="vertical"
            sx={{
              my: "4px",
              borderColor: staking
                ? theme.palette.custom.forbole.indigo
                : theme.palette.primary.main,
              [theme.breakpoints.down("laptop")]: {
                display: "none",
              },
            }}
            variant="middle"
          />
          <Link href="/blog" passHref>
            <Typography component="a" css={styles.word}>
              {t("blog")}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterItems;
