import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { FC } from "react";

import ForboleLogo from "@src/components/icons/forbole";
import ForboleShadowIcon from "@src/components/icons/icon_forbole_shadow.svg";
import { AnchorElContextProvider } from "@src/utils/menu";

import { DesktopNavMenu, MobileNavMenu } from "./components";
import LangMenuButton from "./components/lang_menu_button";
import { useNavHook } from "./hooks";
import * as styles from "./index.module.scss";

const StakingWidget = dynamic(
  () => import("@src/screens/staking/components/staking_widget"),
  {
    ssr: false,
  },
) as unknown as FC;

interface NavProps {
  itemColor?: string;
  staking?: boolean;
}

const Nav = ({ itemColor, staking }: NavProps) => {
  const { displayBackground } = useNavHook();
  const { t } = useTranslation("staking");

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
                  <ForboleLogo color={itemColor || "#fff"} />
                )}
              </Link>
            </div>
            {staking ? (
              <div className={styles.stakingWrapper}>
                <StakingWidget />
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
