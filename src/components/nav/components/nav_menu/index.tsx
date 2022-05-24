/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuIcon } from '@components/icons';
import { useTheme } from '@mui/material';
import { navItems } from './config';

export interface NavMenuProps {
  link: string;
}

const NavMenu = ({ link }: NavMenuProps) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [width, setWidth] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    setWidth(window.innerWidth);
  });
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          [theme.breakpoints.up('laptop')]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
          },
          '&:hover': {
            backgroundColor: 'rgba(29, 30, 34, 0.3)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1D1E22',
            borderRadius: theme.spacing(2.25),
            width: theme.spacing(27.5),
            left: `${width - width / 4}px!important` as any,
            [theme.breakpoints.down('tablet')]: {
              width: '70%',
              top: '80px!important' as any,
              left: `${width / 6}px!important` as any,
              backgroundColor: '#1D1E22',
              borderRadius: theme.spacing(2.25),
            },
          },
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.display}
            // selected={anchorEl}
            onClick={handleClose}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: theme.spacing(2),
              fontWeight: 900,
              height: theme.spacing(8),
              '> a': {
                color:
                  item.link === link
                    ? theme.palette.custom.forbole.purple
                    : theme.palette.primary.main,
                textDecoration: 'none',
              },
              '&:hover': {
                backgroundColor: theme.palette.custom.forbole.indigo,
              },
            }}
          >
            <Link href={item.link} key={item.display}>
              <a>{t(item.display)}</a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NavMenu;
