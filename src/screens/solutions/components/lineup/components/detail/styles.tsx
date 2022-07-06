import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  button: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    backgroundColor: 'secondary.main',
    width: theme.spacing(7),
    borderRadius: theme.spacing(20),
    '&.Mui-disabled': {
      opacity: 0.3,
    },
  }),
};
