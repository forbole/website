/* eslint-disable no-unused-vars */
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

export const styles: { [index: string]: SxProps<Theme> } = {
  select: (theme) => ({
    '.MuiOutlinedInput-root': {
      background: theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      '> .MuiSvgIcon-root': {
        fill: '#878787',
      },
      '.MuiSelect-select': {
        '> .MuiBox-root': {
          '> span': {
            borderRadius: '50%',
            boxShadow:
              '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
          },
        },
      },
    },
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
    '& .MuiSelect-icon': {
      margin: theme.spacing(0.5, 2.5, 0, 0),
    },
    [theme.breakpoints.up('laptop')]: {
      //   gridColumn: '1 / span 5',
      //   gridRow: '2 / span 1',
    },
  }),
  input: (theme) => ({
    '.MuiOutlinedInput-root': {
      width: '100%',
      boxShadow:
        '0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)',
      borderRadius: theme.spacing(1),
      background: theme.palette.primary.main,
    },
    '.MuiFormLabel-root': {
      color: '#878787',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      borderColor: 'transparent',
    },
  }),
  slider: (theme) => ({
    '& .MuiSlider-thumb': {
      height: theme.spacing(2.25),
      width: theme.spacing(2.25),
      background: 'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
      border: '2px solid linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
      boxShadow: 'none',
      '&:focus, &:hover, &.Mui-active': {
        boxShadow: 'none',
        '@media (hover: none)': {
          boxShadow:
            '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        },
      },
    },
    '& .MuiSlider-track': {
      height: 2.5,
      background: 'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
    },
    '& .MuiSlider-rail': {
      color: '#76819B',
      height: 2.5,
    },
  }),
  inputBase: (theme) => ({
    height: theme.spacing(7),
    display: 'flex',
    justifyContent: 'flex-end',
    boxShadow:
      '0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)',
    borderRadius: theme.spacing(1),
    background: theme.palette.primary.main,
    paddingRight: 1,
    '> input': {
      padding: theme.spacing(0.5, 0, 0.5, 1.5),
      width: 'fit-content',
    },
  }),
  card: (theme) => ({
    width: '100%',
    boxShadow:
      '0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)',
    borderRadius: theme.spacing(1),
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('laptop')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
  }),
  tokenResult: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    '& .image': {
      width: `${theme.spacing(3.5)} !important`,
      height: `${theme.spacing(3.5)} !important`,
      borderRadius: '100%',
      boxShadow:
        '0px 8px 22px -6px rgb(2 38 225 / 12%), 0px 14px 64px -4px rgb(2 38 225 / 12%)',
    },
    [theme.breakpoints.up('laptop')]: {
      paddingBottom: 0,
    },
  }),
  amountResult: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
  }),
  buttonDiv: (theme) => ({
    width: '100%',
    display: 'flex',
    paddingTop: 3,
    justifyContent: 'center',
    [theme.breakpoints.up('laptop')]: {
      paddingTop: 4,
      justifyContent: 'flex-end',
    },
  }),
  button: (theme) => ({
    background: 'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
    boxShadow:
      '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1.25, 2),
    fontSize: theme.spacing(2),
  }),
};