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
        // background: 'rgba(114, 28, 78, 0.1)',
        backdropFilter: 'blur(16px)',
        '-webkit-backdrop-filter': 'blur(16px)',
        [theme.breakpoints.up('laptop')]: {
          maxWidth: '1200px',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }}
    >
      <Box
        sx={{
          padding: theme.spacing(4),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          [theme.breakpoints.up('laptop')]: {
            padding: theme.spacing(4, 2, 0, 2),
            justifyContent: 'space-between',
          },
        }}
      >
        <Box
          sx={{
            margin: 'auto',
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
            [theme.breakpoints.down('tablet')]: {
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
  );
};

export default Nav;
