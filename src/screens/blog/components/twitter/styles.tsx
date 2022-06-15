import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  twitterCSS: (theme) => ({
    padding: theme.spacing(0, 3, 0, 3),
    color: theme.palette.primary.main,
    [theme.breakpoints.up('laptop')]: {
      padding: theme.spacing(3.75),
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: theme.spacing(0.75),
      marginTop: theme.spacing(5),
    },
  }),
};
