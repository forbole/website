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
      marginBottom: 3,
    },
  }),
  formDiv: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    [theme.breakpoints.up('laptop')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(2, 1fr)',
      gridGap: theme.spacing(5),
    },
  }),
  nameBox: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('laptop')]: {
      gridRow: '1 / span 1',
      gridColumn: '1 / span 1',
    },
  }),
  inputField: (theme) => ({
    color: theme.palette.primary.main,
    alignSelf: 'stretch',
    '& .MuiOutlinedInput-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '& fieldset': {
        borderColor: 'primary.main',
      },
    },
    '& label': {
      color: 'rgba(255, 255, 255, 0.3)',
    },
  }),
  emailBox: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('laptop')]: {
      gridRow: '1 / span 1',
      gridColumn: '2 / span 1',
    },
  }),
  messageBox: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('laptop')]: {
      gridRow: '2 / span 1',
      gridColumn: '1 / span 2',
    },
  }),
  buttonDiv: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 3,
    [theme.breakpoints.up('laptop')]: {
      display: 'none',
    },
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
