import { Box, useTheme } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useMemo } from "react";

import CtaButton from "@src/components/cta-button";

import CompanyMenuButton from "../company_menu_button";
import LangMenuButton from "../lang_menu_button";
import ProductsMenuButton from "../products_menu_button";
import classes from "./index.module.css";

const DesktopNavMenu = () => {
  const { t } = useTranslation("common");
  const navItems = useMemo(
    () => [
      {
        display: t("Products"),
        link: "/products",
        status: true,
      },
      {
        display: t("Company"),
        link: "#!",
        status: true,
      },
    ],
    [t],
  );
  const theme = useTheme();

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="row"
      gap="16px"
      justifyContent="flex-end"
      width="100%"
    >
      {navItems.map((item, i) => (
        <Box
          className={classes.navItem}
          key={i}
          sx={{
            "color": theme.palette.common.white,
            "textDecoration": "none",
            "fontWeight": 600,
            "fontSize": theme.spacing(2),
            "&:hover": {
              background: "rgba(0,0,0,0.2)",
              borderRadius: "24px",
              color: theme.palette.common.white,
            },
            "userSelect": "none",
          }}
        >
          <Link
            href={item.link}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Box component="span">{item.display}</Box>
          </Link>
          {i === 0 && (
            <Box className={classes.boxItem}>
              <Box className={classes.boxItemList}>
                <ProductsMenuButton />
              </Box>
            </Box>
          )}
          {i === 1 && (
            <Box className={classes.boxItem}>
              <Box className={classes.boxItemList}>
                <CompanyMenuButton />
              </Box>
            </Box>
          )}
        </Box>
      ))}
      <Box>
        <Link href="/staking">
          <CtaButton>{t("StakeNow")}</CtaButton>
        </Link>
      </Box>
      <Box>
        <LangMenuButton />
      </Box>
    </Box>
  );
};

export default DesktopNavMenu;
