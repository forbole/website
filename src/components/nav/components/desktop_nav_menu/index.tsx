/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { Box, useTheme } from '@mui/material';
import { navItems } from '../config';

interface NavMenuProps {
  link: string | null;
}

const DesktopNavMenu = ({ link }: NavMenuProps) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
    >
      {navItems.map((item, i) => {
        let mainColor = 'none';
        if (item.link === link && theme.palette.mode === 'light') {
          mainColor = theme.palette.custom.forbole.indigo;
        } else if (item.link === link && theme.palette.mode === 'dark') {
          mainColor = 'rgba(116, 136, 188, 0.45)';
        }
        return (
          <Box
            key={i}
            sx={{
              borderRadius: '220px',
              background: mainColor,
              margin: item.link === link ? 0 : theme.spacing(0, 2),
              padding: item.link === link ? '13px 16px' : 0,
              '> a': {
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: theme.spacing(2),
                color:
                  theme.palette.mode === 'dark' || item.link === link
                    ? theme.palette.primary.main
                    : '#202A43',
              },
            }}
          >
            <Link href={item.link} key={item.display}>
              <a>{t(item.display)}</a>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default DesktopNavMenu;
