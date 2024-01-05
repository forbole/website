import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useMemo } from "react";

import { CtaLink } from "@src/components/cta-button";

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
    <div className={styles.wrapper}>
      {navItems.map((item) => (
        <div className={styles.navItem} key={item.display}>
          <Link className={styles.link} href={item.link}>
            <span>{item.display}</span>
          </Link>
          <div className={styles.boxItem}>
            <div className={styles.boxItemList}>{item.inner}</div>
          </div>
        </div>
      ))}
      <CtaLink href="/staking">{t("StakeNow")}</CtaLink>
      <LangMenuButton />
    </div>
  );
};

export default DesktopNavMenu;
