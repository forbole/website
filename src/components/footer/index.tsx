import { Box, Container, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";

import buildImageDesktop from "@src/../public/images/footer/Build@2x.png";
import buildImageMobile from "@src/../public/images/footer/Build_m@2x.png";
import footerDesktop from "@src/../public/images/footer/foot.png";
import footerMobile from "@src/../public/images/footer/foot_m.png";
import { useWindowDimensions } from "@src/hooks/get_screen_size";

import CtaButton from "../cta-button";
import { FooterItems, SocialMedia } from "./components";
import * as styles from "./index.module.scss";
import type { FooterProps } from "./types";

const Footer = ({ itemColor, red }: FooterProps) => {
  const { isMobile, isTablet } = useWindowDimensions();
  const { t } = useTranslation("common");

  const wrapperStyle = {
    style: itemColor
      ? {
          color: itemColor,
        }
      : {},
  };

  return (
    <Box
      className={[styles.wrapper, red ? styles.red : ""].join(" ")}
      component="footer"
      data-test="footer"
      {...wrapperStyle}
    >
      {red && (
        <>
          <Box className={styles.redImg}>
            <Image alt="Footer graphic" fill src={footerDesktop} />
          </Box>
          <Box className={styles.redImgMobile}>
            <Image alt="Footer graphic" fill src={footerMobile} />
          </Box>
          <Container
            className={styles.ctaContainer}
            disableGutters
            maxWidth={isTablet ? "tablet" : "desktop"}
          >
            <Stack
              alignItems="center"
              direction="column"
              justifyContent="center"
            >
              <Box className={styles.ctaImage}>
                {isMobile ? (
                  <Image
                    alt="Picture of the author"
                    src={buildImageMobile}
                    width={300}
                  />
                ) : (
                  <Image
                    alt="Picture of the author"
                    fill
                    src={buildImageDesktop}
                  />
                )}
              </Box>

              <Typography className={styles.ctaText}>together today</Typography>
              <Link href="/staking">
                <CtaButton className={styles.ctaButton}>
                  {t("StakeNow")}
                </CtaButton>
              </Link>
            </Stack>
          </Container>
        </>
      )}
      <Container className={styles.container} disableGutters>
        <Stack
          className={styles.mediaStack}
          maxWidth={isTablet ? "tablet" : "desktop"}
        >
          <SocialMedia />
          <FooterItems staking={!red || undefined} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
