/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Box, useTheme } from '@mui/material';
import { Forbole as ForboleLogo } from '@icons';
import { MobileNavMenu, DesktopNavMenu } from './components';
import { useNavHook } from './hooks';

interface NavProps {
  navLink: string;
}

const Nav = ({ navLink }: NavProps) => {
  const theme = useTheme();
  const { displayBackground } = useNavHook();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 2,
        width: '100%',
        background: displayBackground
          ? 'rgba(114, 28, 78, 0.1)'
          : 'transparent',
        backdropFilter: displayBackground ? 'blur(16px)' : 'none',
        webkitBackdropFilter: 'blur(16px)',
        height: '100px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          overflowY: 'scroll',
          overflowX: 'hidden',
          zIndex: 2,
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
            width: '100%',
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
            paddingTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('laptop')]: {
              padding: theme.spacing(4, 0, 0, 0),
              justifyContent: 'space-between',
              height: '100px',
            },
          }}
        >
          <Box
            sx={{
              // margin: 'auto',
              [theme.breakpoints.up('laptop')]: {
                margin: 0,
                width: '40%',
              },
            }}
          >
            <Link href="/">
              <a
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <ForboleLogo
                  color={
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.custom.forbole.red
                  }
                />
              </a>
            </Link>
          </Box>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;
