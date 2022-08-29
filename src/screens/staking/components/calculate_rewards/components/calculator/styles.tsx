import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
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
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      borderColor: 'transparent',
    },
    [theme.breakpoints.up('laptop')]: {
      //   gridColumn: '1 / span 5',
      //   gridRow: '2 / span 1',
    },
  }),
};
