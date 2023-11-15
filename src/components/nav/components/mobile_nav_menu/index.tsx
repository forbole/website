import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse, ListItem, Stack, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import type { MouseEvent} from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { Forbole as ForboleLogo, LangIcon, MenuIcon } from "@components/icons";
import CtaButton from "@src/components/cta-button";
import { useWindowDimensions } from "@src/hooks";
import { anchorElState } from "@src/recoil/settings/anchorEl";

import CompanyMenuButton from "../company_menu_button";
import LangMenuButton from "../lang_menu_button";
import ProductsMenuButton from "../products_menu_button";

const MobileNavMenu = () => {
  const router = useRouter();
  const { t, lang } = useTranslation("common");
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  const [anchorEl, setAnchorEl] = useRecoilState(anchorElState);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const langToDisplay = {
    "en": t("en"),
    "zh-HK": t("zh-HK"),
    "zh-CN": t("zh-CN"),
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
            width: theme.spacing(7),
            height: theme.spacing(7),
          },
        }}
      >
        <MenuIcon color="#fff" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="basic-menu"
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: "none",
              borderRadius: theme.spacing(3),
              width: theme.spacing(27.5),
              left: `${width - width / 4}px` as any,
              [theme.breakpoints.down("laptop")]: {
                width: "100%",
                top: "100px!important" as any,
                left: "0",
                right: "16px",
                backgroundColor: "#FFFFFF",
                background: "rgba(255, 255, 255)",
                boxShadow:
                  "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
              },
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
          <CtaButton
            onClick={() => {
              router.push("/staking");
            }}
          >
            {t("StakeNow")}
          </CtaButton>
        </Stack>
        <ListItem
          sx={{
            "display": "flex",
            "justifyContent": "space-between",
            "fontSize": theme.spacing(2),
            "fontWeight": 700,
            "height": theme.spacing(7),
            "padding": theme.spacing(0, 4),
            "> a": {
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            },
            "background": openShowProducts
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            "color": openShowProducts
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
          }}
        >
          <div
            onClick={() => {
              router.push("/products").finally(handleClose);
            }}
            role="button"
          >
            {t("Products")}
          </div>
          <div
            onClick={() => {
              handlerCLickShowProducts();
            }}
            role="button"
          >
            {openShowProducts ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
        </ListItem>
        <Collapse in={openShowProducts} timeout="auto" unmountOnExit>
          <ProductsMenuButton />
        </Collapse>

        <ListItem
          onClick={() => {
            handlerCLickShowCompany();
          }}
          sx={{
            "display": "flex",
            "justifyContent": "space-between",
            "fontSize": theme.spacing(2),
            "fontWeight": 700,

            "height": theme.spacing(7),
            "padding": theme.spacing(0, 4),
            "> a": {
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            },
            "background": openShowCompany
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            "color": openShowCompany
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
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
            "display": "flex",
            "justifyContent": "space-between",
            "fontSize": theme.spacing(2),
            "fontWeight": 700,

            "height": theme.spacing(7),
            "padding": theme.spacing(0, 4),
            "> a": {
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            },
            "background": openDrawer
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            "color": openDrawer
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
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
