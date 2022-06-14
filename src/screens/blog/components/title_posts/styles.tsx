import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  titlePostCSS: (theme) => ({
    padding: theme.spacing(7, 1.5),
    color: 'primary.main',
    listStyleType: 'none',
    '& a': {
      color: 'primary.main',
      fontSize: theme.spacing(2),
      fontWeight: 600,
      textDecoration: 'none',
    },
  }),
};
