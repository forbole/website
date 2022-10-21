/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  List,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useWindowDimensions } from '@src/hooks';
import { LangIcon } from '@icons';
import useStyles from './useStyles';

const LangMenuButton: React.FC = () => {
  const { t, lang } = useTranslation('common');
  const { locales, pathname, query } = useRouter();
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const { width } = windowDimensions;
  const [anchor, setAnchor] = React.useState<Element>();
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('laptop'));

  const onClose = React.useCallback(() => setAnchor(undefined), [setAnchor]);

  React.useEffect(() => {
    onClose();
  }, [lang]);

  return (
    <>
      {onlyLargeScreen ? (
        <>
          <IconButton
            aria-label="language"
            onClick={(e) => setAnchor(e.currentTarget)}
            css={styles.navBarButton}
          >
            <LangIcon
              width={20}
              height={20}
              fill={theme.palette.common.white}
            />
          </IconButton>
          <Menu
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            open={!!anchor}
            onClose={onClose}
            id="basic-menu"
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              sx: {
                backgroundImage: 'none',
                borderRadius: theme.spacing(2.25),
                width: theme.spacing(27.5),
                top: `${theme.spacing(9)} !important` as any,
                right: `${width - width / 4}px!important` as any,
                [theme.breakpoints.down('laptop')]: {
                  width: '70%',
                  top: '75% !important' as any,
                  bottom: '20px!important' as any,
                  left: `${width / 6}px!important` as any,
                  backgroundColor: '#1D1E22',
                  borderRadius: theme.spacing(2.25),
                  color: theme.palette.common.white,
                },
              },
            }}
          >
            {locales?.map((l) => (
              <div key={l}>
                <Link href={{ pathname, query }} locale={l} passHref>
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
                        backgroundColor: theme.palette.custom.forbole.indigo,
                      },
                    }}
                  >
                    {t(l)}
                  </MenuItem>
                </Link>
              </div>
            ))}
          </Menu>{' '}
        </>
      ) : (
        <List component="div" disablePadding>
          {locales?.map((l) => (
            <div key={l}>
              <Link href={{ pathname, query }} locale={l} passHref>
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
                      backgroundColor: theme.palette.custom.forbole.indigo,
                    },
                  }}
                >
                  {t(l)}
                </MenuItem>
              </Link>
            </div>
          ))}
        </List>
      )}
    </>
  );
};

export default LangMenuButton;
