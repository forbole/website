import React from 'react';
import {
  Button,
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

interface LangMenuButtonProp {
  open: boolean;
}

const LangMenuButton: React.FC<LangMenuButtonProp> = (props: any) => {
  const { t, lang } = useTranslation('common');
  const { open } = props;
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
      {/* {onlyLargeScreen ? (
        <IconButton
          aria-label="language"
          onClick={(e) => setAnchor(e.currentTarget)}
          css={styles.navBarButton}
        >
          <LangIcon />
        </IconButton>
      ) : (
        <Button
          onClick={(e) => setAnchor(e.currentTarget)}
          css={styles.navBarButton}
        >
          {t(lang)}
        </Button>
      )} */}
      <List component="div" disablePadding>
        {/* <Menu
        anchorEl={anchor}
        //   getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        // open={!!anchor}
        onClose={onClose}
        id="basic-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // anchorEl={anchorEl}
        open={open}
        // onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundImage: 'none',
            borderRadius: theme.spacing(2.25),
            width: theme.spacing(27.5),
            left: `${width - width / 4}px!important` as any,
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
      > */}
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
                    // color:
                    //   item.link === link
                    //     ? theme.palette.custom.forbole.purple
                    //     : theme.palette.primary.main,
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
        {/* </Menu> */}
      </List>
    </>
  );
};

export default LangMenuButton;
