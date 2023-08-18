import React, { useState, ReactNode } from 'react';
import { Box, useTheme, useMediaQuery, Collapse, SvgIcon } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useWindowDimensions } from '@src/hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';
import { navigationId } from '@recoil/settings';
import Link from 'next/link';
import ProductsMenuButton from '../products_menu_button';

interface config {
  link: string;
  display: string;
  status: boolean;
}

const StakenowMenuButton = () => {
  const { t } = useTranslation('common');

  const navigation = useRecoilValue(navigationId);

  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));

  const [openShowStakeNow, setOpenShowStakeNow] = React.useState(false);
  const handlerCLickShowStakeNow = () => {
    setOpenShowStakeNow((prevState) => !prevState);
  };

  const menuStakeNowList = [
    {
      name: 'About',
      link: '/about',
    },
    {
      name: 'Career',
      link: '/career',
    },
    {
      name: 'Contact',
      link: '/contact',
    },
  ];

  return (
    <>
      {onlyLargeScreen ? (
        <>
          <Box sx={{}}>
            <List component="div" disablePadding>
              <ListItem
                onClick={() => {
                  handlerCLickShowStakeNow();
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontSize: theme.spacing(2),
                  fontWeight: 700,
                  // color: theme.palette.common.white,
                  color: '#362187',
                  height: theme.spacing(5),
                  padding: theme.spacing(0, 3),
                  '> a': {
                    width: '100%',
                    textAlign: 'left',
                    textDecoration: 'none',
                  },
                  '&:hover': {
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.custom.forbole.indigo,
                  },
                }}
              >
                <Box
                  sx={{
                    marginRight: '10px',
                    lineHeight: '100%',
                  }}
                >
                  <SvgIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <title>earth</title>
                      <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                  </SvgIcon>
                </Box>

                {'Forbole Validator Webbsite'}
                {openShowStakeNow ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openShowStakeNow} timeout="auto" unmountOnExit>
                {/* <ProductsMenuButton /> */}
                <div>跳转连接</div>
              </Collapse>
            </List>
          </Box>
        </>
      ) : (
        <>
          <List component="div" disablePadding>
            {menuStakeNowList?.map((l, i) => (
              <div key={i}>
                <Link href={l.link} passHref>
                  <MenuItem
                    component="a"
                    sx={{
                      display: 'flex',
                      color: theme.palette.common.white,
                      justifyContent: 'flex-start',
                      fontSize: theme.spacing(2),
                      fontWeight: 700,
                      height: theme.spacing(5),
                      padding: theme.spacing(0, 3),
                      '> a': {
                        width: '100%',
                        textAlign: 'left',
                        textDecoration: 'none',
                      },
                      '&:hover': {
                        // backgroundColor: theme.palette.custom.forbole.indigo,
                        background: 'linear-gradient(to right,#623DF5,#362187)',
                      },
                    }}
                  >
                    {l.name}
                  </MenuItem>
                </Link>
              </div>
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default StakenowMenuButton;
