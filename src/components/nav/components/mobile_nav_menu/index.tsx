/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import useTranslation from 'next-translate/useTranslation';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LangIcon, MenuIcon } from '@components/icons';
import { Collapse, ListItem, Stack, useTheme } from '@mui/material';
import { useWindowDimensions } from '@src/hooks';
import LangMenuButton from '../lang_menu_button';
import CompanyMenuButton from '../company_menu_button';
import ProductsMenuButton from '../products_menu_button';
import { Forbole as ForboleLogo } from '@icons';

import CtaButton from '@src/components/cta-button';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { anchorElState } from '@src/recoil/settings/anchorEl';

interface NavMenuProps {
  link: string | null;
}

const MobileNavMenu = ({ link }: NavMenuProps) => {
  const router = useRouter();
  const { t,lang } = useTranslation("common");
  const theme = useTheme();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  const [anchorEl, setAnchorEl] =useRecoilState(anchorElState);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleDropdownClick = () => {
    setOpenDrawer((prevState) => !prevState);
    setOpenShowCompany(() => false);
    setOpenShowProducts(() => false);
  };

  const [openShowCompany, setOpenShowCompany] = React.useState(false);
  const handlerCLickShowCompany = () => {
    setOpenDrawer(() => false);
    setOpenShowCompany((prevState) => !prevState);
    setOpenShowProducts(() => false);
  };
  const [openShowProducts, setOpenShowProducts] = React.useState(false);
  const handlerCLickShowProducts = () => {
    setOpenDrawer(() => false);
    setOpenShowCompany(() => false);
    setOpenShowProducts((prevState) => !prevState);
  };
  //close other drawer
  React.useEffect(() => {
    setOpenDrawer(() => false);
    setOpenShowCompany(() => false);
    setOpenShowProducts(() => false);
  },[open])

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          [theme.breakpoints.up("laptop")]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
          },
        }}
      >
        <MenuIcon color={"#fff"} />
      </IconButton>
      <Menu
        id="basic-menu"
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
                // left: `${width / 6}px!important` as any,
                left: "0",
                right: "16px",
                backgroundColor: "#FFFFFF",
                background: "rgba(255, 255, 255)",
                boxShadow:
                  "0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)",
                // backdropFilter: "blur(12px)",
              },
            },
          },
        }}
      >
        <Stack
          direction={"row"}
          px="32px"
          py="16px"
          mb="24px"
          justifyContent={"space-between"}
          alignItems={"center"}
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
            display: "flex",
            justifyContent: "space-between",
            fontSize: theme.spacing(2),
            fontWeight: 700,
            height: theme.spacing(7),
            padding: theme.spacing(0, 4),
            "> a": {
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            },
            background: openShowProducts
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            color: openShowProducts
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
          }}
        >
          <div
            onClick={() => {
              router.push("/products").finally(handleClose);
            }}
          >
            {t("Products")}
          </div>
          <div
            onClick={() => {
              handlerCLickShowProducts();
            }}
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: theme.spacing(2),
            fontWeight: 700,

            height: theme.spacing(7),
            padding: theme.spacing(0, 4),
            "> a": {
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            },
            background: openShowCompany
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            color: openShowCompany
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
          }}
          onClick={() => {
            handlerCLickShowCompany();
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

        {/* <ListItem
          onClick={() => {
            handlerCLickShowStakeNow()
          }}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: theme.spacing(2),
            fontWeight: 700,
            height: theme.spacing(5),
            padding: theme.spacing(0, 3),
            '> a': {
              width: '100%',
              textAlign: 'left',
              textDecoration: 'none',
            },
            background: openShowStakeNow?'linear-gradient(139deg, #623DF5 0%, #362187 100%)':'',
            color:openShowStakeNow?theme.palette.common.white:theme.palette.custom.forbole.indigo,
          }}
        >
          {t('StakeNow')}
          {openShowStakeNow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ListItem>
        <Collapse in={openShowStakeNow} timeout="auto" unmountOnExit>
          <StakenowMenuButton />
        </Collapse> */}

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: theme.spacing(2),
            fontWeight: 700,

            height: theme.spacing(7),
            padding: theme.spacing(0, 4),
            "> a": {
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            },
            background: openDrawer
              ? "linear-gradient(139deg, #623DF5 0%, #362187 100%)"
              : "",
            color: openDrawer
              ? theme.palette.common.white
              : theme.palette.custom.forbole.indigo,
          }}
          onClick={handleDropdownClick}
        >
          <Stack direction={"row"} gap="8px" alignItems={"center"}>
            <LangIcon
              width={20}
              height={20}
              fill={
                openDrawer
                  ? theme.palette.common.white
                  : theme.palette.custom.forbole.indigo
              }
            />
            {t(lang)}
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
