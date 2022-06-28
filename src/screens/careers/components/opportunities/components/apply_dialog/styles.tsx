import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  dialog: (theme) => ({
    backgroundColor: 'rgba(29, 30, 34, 0.5)',
    '& .MuiDialog-paper': {
      [theme.breakpoints.up('laptop')]: {
        backgroundColor: 'rgba(29, 30, 34, 0.5)',
        // backgroundColor: 'black',
        backdropFilter: 'blur(24px)',
        borderRadius: theme.spacing(2),
        backgroundImage: 'none',
      },
    },
    '& .MuiDialogContent-root': {
      [theme.breakpoints.up('laptop')]: {
        width: '70%',
        margin: 'auto',
      },
    },
  }),
  closeButton: (theme) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  }),
  inputField: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: theme.spacing(5),
  }),
  fileField: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  }),
  textField: (theme) => ({
    color: theme.palette.primary.main,
    alignSelf: 'stretch',
    '& .MuiOutlinedInput-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      background: 'transparent',
      borderRadius: theme.spacing(1),
      border: '1px solid rgba(255, 255, 255, 1)',
      '& fieldset': {
        borderColor: 'primary.main',
      },
    },
    '& .MuiFormHelperText-root': {
      color: 'red',
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
  buttonDiv: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 5,
    [theme.breakpoints.up('laptop')]: {
      // display: 'none',
    },
  }),
};
