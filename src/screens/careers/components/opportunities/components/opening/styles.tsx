import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  button: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1.5, 2),
    backgroundColor: 'secondary.main',
    borderRadius: theme.spacing(20),
    fontWeight: 600,
    fontSize: theme.spacing(2),
    letterSpacing: '0.036em',
  }),
};
