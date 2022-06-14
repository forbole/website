import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  sideCSS: (theme) => ({
    [theme.breakpoints.up('laptop')]: {
      width: '30%',
      minWidth: '300px',
      marginLeft: theme.spacing(4),
    },
  }),
};
