import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  formBox: (theme) => ({
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    background: 'transparent',
    border: '2px solid rgba(195, 204, 226, 0.3)',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('laptop')]: {
      width: '100%',
    },
  }),
};
