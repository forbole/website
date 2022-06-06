import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  mnaBox: (theme) => ({
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 3),
    alignItems: 'center',
    minHeight: '200vh',
  }),
  timeline: {
    borderLeft: '2px solid rgba(195, 204, 226, 0.3)',
    height: '100%',
  },
  card: (theme) => ({
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    background: 'transparent',
    border: '2px solid rgba(195, 204, 226, 1)',
    borderRadius: 2,
    marginLeft: 3,
    marginBottom: 3,
    padding: theme.spacing(3, 2),
  }),
};
