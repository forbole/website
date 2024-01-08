import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, ListItem, Stack, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useContext, useEffect, useState } from "react";

import { CtaLink } from "@src/components/cta-button";
import ForboleLogo from "@src/components/icons/forbole";
import LangIcon from "@src/components/icons/icon_language.svg";
import MenuIcon from "@src/components/icons/menu";
import { useWindowDimensions } from "@src/hooks/get_screen_size";
import { anchorElContext } from "@src/utils/menu";

import CompanyMenuButton from "../company_menu_button";
import LangMenuButton from "../lang_menu_button";
import ProductsMenuButton from "../products_menu_button";
import * as styles from "./index.module.scss";

const MobileNavMenu = () => {
  const { lang, t } = useTranslation("common");
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  const { anchorEl, setAnchorEl } = useContext(anchorElContext);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const langToDisplay = {
    "en": t("en"),
    "zh-CN": t("zh-CN"),
    "zh-HK": t("zh-HK"),
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openShowCompany, setOpenShowCompany] = useState(false);
  const [openShowProducts, setOpenShowProducts] = useState(false);

  const handleDropdownClick = () => {
    setOpenDrawer((prevState) => !prevState);
    setOpenShowCompany(() => false);
    setOpenShowProducts(() => false);
  };

  const handlerCLickShowCompany = () => {
    setOpenDrawer(() => false);
    setOpenShowCompany((prevState) => !prevState);
    setOpenShowProducts(() => false);
  };

  const handlerCLickShowProducts = () => {
    setOpenDrawer(() => false);
    setOpenShowCompany(() => false);
    setOpenShowProducts((prevState) => !prevState);
  };

  useEffect(() => {
    setOpenDrawer(() => false);
    setOpenShowCompany(() => false);
    setOpenShowProducts(() => false);
  }, [open]);

  return (
    <div>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        aria-label="more"
        id="long-button"
        onClick={handleClick}
        sx={{
          [theme.breakpoints.up("laptop")]: {
            height: theme.spacing(7),
            width: theme.spacing(7),
          },
        }}
      >
        <MenuIcon color="#fff" />
      </IconButton>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={anchorEl}
        id="basic-menu"
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: "none",
              borderRadius: theme.spacing(3),
              left: `${width - width / 4}px` as any,
              [theme.breakpoints.down("laptop")]: {
                background: "rgba(255, 255, 255)",
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
                left: "0",
                right: "16px",
                top: "100px!important" as any,
                width: "100%",
              },
              width: theme.spacing(27.5),
            },
          },
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          mb="24px"
          px="32px"
          py="16px"
        >
          <ForboleLogo color="#BD081C" height="20px" width="106px" />
          <CtaLink href="/staking">{t("StakeNow")}</CtaLink>
        </Stack>
        <ListItem
          sx={{
            "> a": {
              textAlign: "left",
              textDecoration: "none",
              width: "100%",
            },
            "background": openShowProducts
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            "color": openShowProducts
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
            "display": "flex",
            "fontSize": theme.spacing(2),
            "fontWeight": 700,
            "height": theme.spacing(7),
            "justifyContent": "space-between",
            "padding": theme.spacing(0, 4),
          }}
        >
          <Link href="/products" style={{ color: "inherit" }}>
            <button className={styles.button}>{t("Products")}</button>
          </Link>
          <button
            className={styles.button}
            onClick={() => {
              handlerCLickShowProducts();
            }}
          >
            {openShowProducts ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </button>
        </ListItem>
        <Collapse in={openShowProducts} timeout="auto" unmountOnExit>
          <ProductsMenuButton />
        </Collapse>

        <ListItem
          onClick={() => {
            handlerCLickShowCompany();
          }}
          sx={{
            "> a": {
              textAlign: "left",
              textDecoration: "none",
              width: "100%",
            },
            "background": openShowCompany
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            "color": openShowCompany
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
            "display": "flex",

            "fontSize": theme.spacing(2),
            "fontWeight": 700,
            "height": theme.spacing(7),
            "justifyContent": "space-between",
            "padding": theme.spacing(0, 4),
          }}
        >
          <div>{t("Company")}</div>
          {openShowCompany ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </ListItem>
        <Collapse in={openShowCompany} timeout="auto" unmountOnExit>
          <CompanyMenuButton />
        </Collapse>

        <ListItem
          onClick={handleDropdownClick}
          sx={{
            "> a": {
              textAlign: "left",
              textDecoration: "none",
              width: "100%",
            },
            "background": openDrawer
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            "color": openDrawer
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
            "display": "flex",
            "fontSize": theme.spacing(2),
            "fontWeight": 700,

            "height": theme.spacing(7),
            "justifyContent": "space-between",
            "padding": theme.spacing(0, 4),
          }}
        >
          <Stack alignItems="center" direction="row" gap="8px">
            <LangIcon
              fill={
                openDrawer
                  ? theme.palette.common.white
                  : theme.palette.custom.forbole.indigo
              }
              height={20}
              width={20}
            />
            {langToDisplay[lang as keyof typeof langToDisplay]}
          </Stack>
          {openDrawer ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ListItem>
        <Collapse in={openDrawer} timeout="auto" unmountOnExit>
          <LangMenuButton />
        </Collapse>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;
