import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  infoBox: (theme) => ({
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.1)',
    // border: 'none',
    border: '2px solid rgba(195, 204, 226, 0.3)',
    borderLeft: 'none',
    borderRadius: theme.spacing(0, 2, 2, 0),
    height: '100%',
    [theme.breakpoints.down('laptop')]: {
      width: '100%',
      marginBottom: 5,
      border: 'none',
      borderRadius: theme.spacing(2),
    },
  }),
  flexBox: (theme) => ({
    [theme.breakpoints.up('laptop')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
  }),
  content: (theme) => ({
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    '& svg': {
      width: '10%',
    },
    ' & .MuiTypography-root': {
      width: '90%',
    },
    [theme.breakpoints.down('laptop')]: {
      width: '100%',
      paddingBottom: 3.75,
    },
  }),
  buttonDiv: (theme) => ({
    [theme.breakpoints.down('laptop')]: {
      display: 'none',
    },
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 3,
  }),
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
