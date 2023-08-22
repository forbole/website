/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { RefObject } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { Forbole as ForboleLogo, ForboleShadowIcon } from '@icons';
import { MobileNavMenu, DesktopNavMenu } from './components';
import { useNavHook } from './hooks';

interface NavProps {
  navLink: string | null;
  staking?: boolean;
  stakeNowRef?: RefObject<HTMLElement>;
}

const Nav = ({ navLink, staking, stakeNowRef }: NavProps) => {
  const theme = useTheme();
  const { displayBackground } = useNavHook();
  const scrollToRef = (e: any) => {
    e.preventDefault();
    if (stakeNowRef !== undefined && stakeNowRef.current !== null) {
      window.scrollTo({
        left: 0,
        top: stakeNowRef.current?.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 5,
        width: '100%',
        height: '100px',
        background:
          displayBackground && !staking
            ? 'rgba(114, 28, 78, 0.1)'
            : displayBackground && staking
            ? ' rgba(47, 58, 86, 0.4)'
            : 'transparent',
        backdropFilter: displayBackground ? 'blur(16px)' : 'none',
        webkitBackdropFilter: 'blur(16px)',
        [theme.breakpoints.up('laptop')]: {
          height: '100px',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          position: 'fixed',
          top: 0,
          overflowY: 'hidden',
          overflowX: 'hidden',
          zIndex: 2,
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
            width: '100%',
            height: 'auto',
            position: 'fixed',
            top: 30,
            margin: 'auto',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          },
        }}
      >
        <Box
          sx={{
            background: 'transparent',
            padding: theme.spacing(4, 3, 0, 3),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(4, 0, 0, 0),
              justifyContent: 'space-between',
              height: '100px',
              overflowY: 'hidden',
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up('laptop')]: {
                margin: 0,
                width: '40%',
              },
            }}
          >
            <a
              href="https://www.forbole.com/"
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {staking ? (
                <ForboleShadowIcon />
              ) : (
                <ForboleLogo
                  color={
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.custom.forbole.red
                  }
                />
              )}
            </a>
          </Box>
          {staking ? (
            <Button
              variant="contained"
              onClick={(e: React.MouseEvent<HTMLElement>) => scrollToRef(e)}
              sx={{
                width: '97px',
                height: '32px',
                lineHeight: '17px',
                fontWeight: 600,
                padding: 0,
                background:
                  'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
                borderRadius: theme.spacing(3),
                color: 'primary.main',
                boxShadow: 'none',
                [theme.breakpoints.up('laptop')]: {
                  width: '111px',
                  height: '45px',
                },
              }}
            >
              Stake Now
            </Button>
          ) : (
            <>
              <Box
                sx={{
                  [theme.breakpoints.down('laptop')]: {
                    position: 'absolute',
                    top: theme.spacing(4),
                    right: theme.spacing(4),
                  },
                  [theme.breakpoints.up('laptop')]: {
                    display: 'none',
                  },
                }}
              >
                <MobileNavMenu link={navLink} />
              </Box>
              <Box
                sx={{
                  [theme.breakpoints.down('laptop')]: { display: 'none' },
                  [theme.breakpoints.up('laptop')]: {
                    display: 'flex',
                    width: '60%',
                    height: '100px',
                  },
                }}
              >
                <DesktopNavMenu link={navLink} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;
