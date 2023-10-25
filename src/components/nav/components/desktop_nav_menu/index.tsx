/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, useTheme } from "@mui/material";
import CtaButton from "@src/components/cta-button";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import * as React from "react";

import CompanyMenuButton from "../company_menu_button";
import { navItems } from "../config";
import LangMenuButton from "../lang_menu_button";
import ProductsMenuButton from "../products_menu_button";
import classes from "./index.module.css";

interface NavMenuProps {
  itemColor: string | undefined;
}

const DesktopNavMenu = ({ itemColor }: NavMenuProps) => {
  const { t } = useTranslation("common");
  const theme = useTheme();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
      gap="16px"
    >
      {navItems.map((item, i) => {
        return (
          <Box
            key={i}
            className={classes.navItem}
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: theme.spacing(2),
              "&:hover": {
                color: itemColor || theme.palette.custom.forbole.indigo,
              },
              userSelect: "none",
            }}
          >
            <Link href={item.link} passHref>
              <Box
                component="a"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {t(item.display)}
              </Box>
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
        );
      })}
      <Box>
        <Link href="https://www.forbole.com/staking" passHref>
          <a>
            <CtaButton>{t("StakeNow")}</CtaButton>
          </a>
        </Link>
      </Box>
      <Box>
        <LangMenuButton />
      </Box>
    </Box>
  );
};

export default DesktopNavMenu;
