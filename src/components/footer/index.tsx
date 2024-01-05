import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

import buildImageDesktop from "@src/../public/images/footer/Build@2x.png";
import buildImageMobile from "@src/../public/images/footer/Build_m@2x.png";
import footerDesktop from "@src/../public/images/footer/foot.png";
import footerMobile from "@src/../public/images/footer/foot_m.png";

import { CtaLink } from "../cta-button";
import { FooterItems, SocialMedia } from "./components";
import * as styles from "./index.module.scss";
import type { FooterProps } from "./types";

const Footer = ({ itemColor, red }: FooterProps) => {
  const { t } = useTranslation("common");

  const wrapperStyle = {
    style: itemColor
      ? {
          color: itemColor,
        }
      : {},
  };

  return (
    <footer
      className={[styles.wrapper, red ? styles.red : ""].join(" ")}
      data-test="footer"
      {...wrapperStyle}
    >
      {red && (
        <>
          <div className={styles.redImg}>
            <Image alt="Footer graphic" fill src={footerDesktop} />
          </div>
          <div className={styles.redImgMobile}>
            <Image alt="Footer graphic" fill src={footerMobile} />
          </div>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaStack}>
              <div className={styles.ctaImage}>
                <Image
                  alt="Picture of the author"
                  className={styles.ctaImageMobile}
                  src={buildImageMobile}
                  width={300}
                />
                <Image
                  alt="Picture of the author"
                  className={styles.ctaImageDesktop}
                  fill
                  src={buildImageDesktop}
                />
              </div>

              <span className={styles.ctaText}>together today</span>
              <CtaLink className={styles.ctaButton} href="/staking">
                {t("StakeNow")}
              </CtaLink>
            </div>
          </div>
        </>
      )}
      <div className={styles.container}>
        <div className={styles.mediaStack}>
          <SocialMedia />
          <FooterItems staking={!red || undefined} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
