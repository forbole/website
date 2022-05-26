/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Box, useTheme } from '@mui/material';
import { Forbole as ForboleLogo } from '@icons';
import { NavMenu } from './components';

export interface NavProps {
  navLink: string;
}

const Nav = ({ navLink }: NavProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        background: 'transparent',
        backdropFilter: 'blur(16px)',
        webkitBackdropFilter: 'blur(16px)',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          [theme.breakpoints.up('laptop')]: {
            maxWidth: '1200px',
            width: '100%',
            position: 'fixed',
            top: 0,
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
              padding: theme.spacing(4, 2, 0, 2),
              justifyContent: 'space-between',
            },
          }}
        >
          <Box
            sx={{
              // margin: 'auto',
              [theme.breakpoints.up('laptop')]: {
                margin: 0,
              },
            }}
          >
            <Link href="/">
              <a>
                <ForboleLogo />
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
            }}
          >
            <NavMenu link={navLink} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;