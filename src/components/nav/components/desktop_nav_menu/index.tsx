import { Box } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useMemo } from "react";

import CtaButton from "@src/components/cta-button";

import CompanyMenuButton from "../company_menu_button";
import LangMenuButton from "../lang_menu_button";
import ProductsMenuButton from "../products_menu_button";
import * as styles from "./index.module.scss";

const DesktopNavMenu = () => {
  const { t } = useTranslation("common");
  const navItems = useMemo(
    () => [
      {
        display: t("Products"),
        inner: <ProductsMenuButton />,
        link: "/products",
      },
      {
        display: t("Company"),
        inner: <CompanyMenuButton />,
        link: "#!",
      },
    ],
    [t],
  );

  return (
    <Box className={styles.wrapper}>
      {navItems.map((item) => (
        <Box className={styles.navItem} key={item.display}>
          <Link className={styles.link} href={item.link}>
            <Box component="span">{item.display}</Box>
          </Link>
          <Box className={styles.boxItem}>
            <Box className={styles.boxItemList}>{item.inner}</Box>
          </Box>
        </Box>
      ))}
      <Link href="/staking">
        <CtaButton>{t("StakeNow")}</CtaButton>
      </Link>
      <LangMenuButton />
    </Box>
  );
};

export default DesktopNavMenu;
