import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import type { MouseEvent, RefObject } from "react";

import {
  Forbole as ForboleLogo,
  ForboleShadowIcon,
} from "@src/components/icons";
import useColor from "@src/styles/useColor";
import { AnchorElContextProvider } from "@src/utils/menu";

import { DesktopNavMenu, MobileNavMenu } from "./components";
import LangMenuButton from "./components/lang_menu_button";
import { useNavHook } from "./hooks";
import * as styles from "./index.module.scss";

interface NavProps {
  itemColor?: string;
  stakeNowRef?: RefObject<HTMLElement>;
  staking?: boolean;
}

const Nav = ({ itemColor, stakeNowRef, staking }: NavProps) => {
  const colors = useColor();
  const { displayBackground } = useNavHook();
  const { t } = useTranslation("staking");

  const scrollToRef = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (stakeNowRef !== undefined && stakeNowRef.current !== null) {
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: stakeNowRef.current?.offsetTop,
      });
    }
  };

  const navStyle = {
    style: {
      backdropFilter: displayBackground ? "blur(16px)" : "none",
      background: (() => {
        if (displayBackground && !staking) {
          return "rgba(47, 58, 86, 0.60)";
        }

        return displayBackground && staking
          ? " rgba(47, 58, 86, 0.60)"
          : "transparent";
      })(),
    },
  };

  return (
    <AnchorElContextProvider>
      <nav className={styles.nav} data-test="nav" {...navStyle}>
        <div className={styles.navWrapper}>
          <div className={styles.container}>
            <div className={styles.logoWrapper}>
              <Link
                aria-label={t("common:forboleLogo")}
                className={styles.logoLink}
                href="/"
              >
                {staking ? (
                  <ForboleShadowIcon />
                ) : (
                  <ForboleLogo color={itemColor || colors.primary} />
                )}
              </Link>
            </div>
            {staking ? (
              <div className={styles.stakingWrapper}>
                <button className={styles.stakeNowButton} onClick={scrollToRef}>
                  {t("stake_now")}
                </button>
                <div className={styles.stakingLang}>
                  <LangMenuButton />
                </div>
              </div>
            ) : (
              <>
                <div className={styles.mobileNavMenu}>
                  <MobileNavMenu />
                </div>
                <div className={styles.desktopNavMenu}>
                  <DesktopNavMenu />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </AnchorElContextProvider>
  );
};

export default Nav;
