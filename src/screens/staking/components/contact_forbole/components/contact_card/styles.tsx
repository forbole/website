import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  nameBox: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.palette.custom.forbole.indigo6,
  }),
  inputField: (theme) => ({
    '> .MuiOutlinedInput-root': {
      boxShadow:
        '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
      borderRadius: theme.spacing(1),
    },
  }),
  select: (theme) => ({
    '.MuiFormControl-root': {
      width: '100%',
      boxShadow:
        '0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)',
      borderRadius: theme.spacing(1),
    },
    '.MuiFormLabel-root': {
      color: '#878787',
    },
  }),
  paper: (theme) => ({
    backgroundColor: theme.palette.primary.main,
  }),
  buttonDiv: (theme) => ({
    padding: theme.spacing(0, 0, 3, 3),
  }),
  button: (theme) => ({
    background: 'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
    boxShadow:
      '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.25, 2),
  }),
};
