/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import CtaButton from "@src/components/cta-button";
import Link from "next/link";
import { navItems } from "../config";
import LangMenuButton from "../lang_menu_button";
import CompanyMenuButton from "../company_menu_button";
import ProductsMenuButton from "../products_menu_button";
import classes from "./index.module.css";

interface NavMenuProps {
  link: string | null;
}

const DesktopNavMenu = ({ link }: NavMenuProps) => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const router = useRouter();

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
                color: theme.palette.custom.forbole.indigo,
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
        <Link href="/staking" passHref>
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
