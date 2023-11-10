/* eslint-disable react/require-default-props */
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useWindowDimensions } from "@src/hooks";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

import CtaButton from "../cta-button";
import { FooterItems, SocialMedia } from "./components";
import { FooterProps } from "./types";

const Footer = ({ red, itemColor }: FooterProps) => {
  const theme = useTheme();
  const { isTablet, isMobile } = useWindowDimensions();
  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        zIndex: 1,
        userSelect: "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color:
          itemColor ||
          (red
            ? theme.palette.primary.main
            : theme.palette.custom.forbole.indigo),
        backgroundImage: red ? "url(/images/footer/foot.png)" : "",
        [theme.breakpoints.down("laptop")]: {
          backgroundImage: red ? "url(/images/footer/foot_m.png)" : "",
          minHeight: "320px",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {red && (
        <Container
          disableGutters
          maxWidth={isTablet ? "tablet" : "desktop"}
          sx={{
            pt: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Stack alignItems="center" direction="column" justifyContent="center">
            <Box
              sx={{
                mt: "20px",
                position: "relative",
                [theme.breakpoints.up("laptop")]: {
                  width: "983px",
                  height: "286px",
                  mt: "90px",
                },
              }}
            >
              {isMobile ? (
                <Image
                  alt="Picture of the author"
                  objectFit="contain"
                  src={require("/public/images/footer/Build_m@2x.png")}
                />
              ) : (
                <Image
                  alt="Picture of the author"
                  objectFit="contain"
                  src={require("/public/images/footer/Build@2x.png")}
                />
              )}
            </Box>

            <Typography
              sx={{
                color: "white",
                fontSize: "40px",
                fontWeight: "590",
                marginTop: "-60px",
                letterSpacing: "1.12px",
                [theme.breakpoints.down("laptop")]: {
                  marginTop: "-20px",
                },
              }}
            >
              together today
            </Typography>
            <Link href="/staking" passHref>
              <a>
                <CtaButton
                  sx={{
                    mt: "24px",
                    [theme.breakpoints.down("laptop")]: {
                      mb: "76px",
                    },
                  }}
                >
                  {t("StakeNow")}
                </CtaButton>
              </a>
            </Link>
          </Stack>
        </Container>
      )}
      <Container
        disableGutters
        sx={{
          background:
            "linear-gradient(180deg, rgba(114, 28, 78, 0.00) 0%, rgba(114, 28, 78, 0.10) 31.25%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack
          margin="0 auto"
          maxWidth={isTablet ? "tablet" : "desktop"}
          sx={{
            pt: "64px",
            px: "16px",
            pb: "40px",
            gap: "32px",

            [theme.breakpoints.up("laptop")]: {
              gap: "24px",
              pb: "32px",
            },
          }}
        >
          <SocialMedia />
          <FooterItems staking={!red || undefined} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
