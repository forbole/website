/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Box, Button, List, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useWindowDimensions } from '@src/hooks';
import { LangIcon } from '@icons';
import useStyles from './useStyles';
import useColor from '@src/styles/useColor';
import { useRecoilState } from 'recoil';
import { anchorElState } from '@recoil/settings/anchorEl';

const LangMenuButton = () => {
  const { t, lang } = useTranslation("common");
  const { locales, pathname, query, locale } = useRouter();
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  const [anchor, setAnchor] = React.useState<Element>();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] =useRecoilState(anchorElState);
  const handleClose=()=>{
    setAnchorEl(null)
  }
  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor]);

  React.useEffect(() => {
    onClose();
  }, [lang]);
  const colors = useColor();
  let lan = "";
  switch (lang) {
    case "en":
      lan = "EN";
      break;
    case "zh-HK":
      lan = "繁";
      break;
    case "zh-CN":
      lan = "简";
      break;
    default:
      lan = "EN";
      break;
  }
  return (
    <>
      {/* {onlyLargeScreen ? ( */}
        <Box css={styles.desktop}>
          <Button
            aria-label="language"
            onClick={(e) => setAnchor(e.currentTarget)}
            css={styles.navBarButton}
            startIcon={<LangIcon
              width={20}
              height={20}
              fill={theme.palette.common.white}
            />}
          >
            <Typography component="span" style={{ color: colors.primary }}>{lan}</Typography>
          </Button>
          <Menu
            anchorEl={anchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            open={!!anchor}
            onClose={onClose}
            id="basic-menu"
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              sx: {
                backgroundImage: "none",
                borderRadius: theme.spacing(3),
                width: theme.spacing(27.5),
                top: `${theme.spacing(9)} !important` as any,
                right: `${width - width / 4}px!important` as any,
                background: 'rgba(255, 255, 255)',
                boxShadow: '0px 10px 32px -4px rgba(2, 38, 225, 0.10), 0px 6px 14px -6px rgba(2, 38, 225, 0.12)',
                // backdropFilter: 'blur(12px)',
              },
            }}
          >
            {locales?.map((l) => (
              <div key={l}>
                <Link href={{ pathname, query }} locale={l} passHref>
                  <MenuItem
                    component="a"
                    sx={{
                      display: "flex",
                      color: theme.palette.custom.forbole.indigo,
                      gap:'8px',
                      justifyContent: "flex-start",
                      fontSize: theme.spacing(2),
                      fontWeight: 700,
                      height: theme.spacing(7),
                      padding: theme.spacing(0, 4),
                      "> a": {
                        width: "100%",
                        textAlign: "left",
                        textDecoration: "none",
                      },
                      "&:hover": {
                        color: theme.palette.common.white,
                        background: "linear-gradient(to right,#623DF5,#362187)",
                      },
                    }}
                  >
                    <LangIcon
                      width={20}
                      height={20}
                      fill='currentColor'
                    />{t(l)}
                  </MenuItem>
                </Link>
              </div>
            ))}
          </Menu>
        </Box>
        <List
        css={styles.mobile}
          component="div"
          disablePadding
          sx={{ background: "rgba(107, 97, 254, 0.24)" }}
        >
          {locales?.map((l) => (
            <div key={l} style={{display:lang!=l?'block':"none"}}>
              <Link href={{ pathname, query }} locale={l} passHref>
                <MenuItem
                  onClick={handleClose}
                  component="a"
                  sx={{
                    display: "flex",
                    gap:'8px',
                    justifyContent: "flex-start",
                    fontSize: theme.spacing(2),
                    fontWeight: 700,
                    height: theme.spacing(7),
                    padding: theme.spacing(0, 4),
                    color: theme.palette.custom.forbole.indigo,
                    "> a": {
                      width: "100%",
                      textAlign: "left",
                      textDecoration: "none",
                    },
                    "&:hover": {
                      color: theme.palette.common.white,
                      background: "linear-gradient(to right,#623DF5,#362187)",
                    },
                  }}
                >
                   <LangIcon
                      width={20}
                      height={20}
                      fill='currentColor'
                    />{t(l)}
                </MenuItem>
              </Link>
            </div>
          ))}
        </List>
      {/* )} */}
    </>
  );
};

export default LangMenuButton;
