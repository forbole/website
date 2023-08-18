/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { Box, useTheme } from "@mui/material";
import { navItems } from "../config";
import LangMenuButton from "../lang_menu_button";
import CompanyMenuButton from "../company_menu_button";
import ProductsMenuButton from "../products_menu_button";
import StakenowMenuButton from "../stakenow_menu_button";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { navigationId } from "@recoil/settings";
import classes from "./index.module.css";
import useColor from "@src/styles/useColor";
import CtaButton from "@src/components/cta-button";

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
              color: 'white',
                fontWeight: 600,
                fontSize: theme.spacing(2),
              "&:hover": {
                color: theme.palette.custom.forbole.indigo,
              },
              userSelect:'none',
            }}
          >
            <div onClick={()=>{router.push(item.link)}}>{t(item.display)}</div>
            {i === 0 && (
              <Box className={classes.boxItem} >
                <Box className={classes.boxItemList}>
                  <ProductsMenuButton />
                </Box>
              </Box>
            )}
            {i === 1 && (
              <Box className={classes.boxItem} >
                <Box className={classes.boxItemList}>
                  <CompanyMenuButton />
                </Box>
              </Box>
            )}
          </Box>
        );
      })}
      <Box>
       <CtaButton onClick={()=>{router.push('https://www.forbole.com/staking')}}>{t('StakeNow')}</CtaButton>
      </Box>
      <Box>
        <LangMenuButton />
      </Box>
    </Box>
  );
};

export default DesktopNavMenu;
