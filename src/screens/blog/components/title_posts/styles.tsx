import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  titlePostCSS: (theme) => ({
    padding: theme.spacing(7, 3, 0, 3),
    color: 'primary.main',
    listStyleType: 'none',
    '& a': {
      color: 'primary.main',
      fontSize: theme.spacing(2),
      fontWeight: 600,
      textDecoration: 'none',
    },
    [theme.breakpoints.up('laptop')]: {
      // padding: 0,
      padding: theme.spacing(3.75),
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: theme.spacing(0.75),
      marginBottom: theme.spacing(5),
    },
  }),
};