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
    },
    '.MuiFormLabel-root': {
      //   width: '100%',
      color: theme.palette.text.primary,
    },
  }),
};
