import { alpha, useTheme } from '@mui/material';

const useStyles = () => {
  const theme = useTheme();
  return {
    root: {
      [theme.breakpoints.down('tablet')]: {
        width: '100%',
      },
      '&&.searchbox__focused': {
        [theme.breakpoints.down('tablet')]: {
          position: 'fixed !important',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          height: theme.spacing(8),
          display: 'flex',
          gap: theme.spacing(2),
          alignItems: 'center',
          padding: theme.spacing(0, 2, 0, 4),
          backdropFilter: 'blur(16px)',
          background:
            'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
          '& .searchbox__cancel-btn': {
            display: 'inline-flex',
          },
        },
      },
      '& .MuiAutocomplete-inputRoot': {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
      },
      '&& .searchbox__cancel-btn': {
        color: theme.palette.secondary.contrastText,
        display: 'none',
      },
      '& .MuiAutocomplete-root': {
        width: '100%',
        [theme.breakpoints.up('tablet')]: {
          width: theme.spacing(36.375),
          minWidth: theme.spacing(36.375),
          height: theme.spacing(4.75),
          float: 'right',
        },
        '& .MuiInputBase-root': {
          padding: `${theme.spacing(0.5, 2.25, 0.5, 2.25)} !important`,
          mixBlendMode: 'normal',
          backdropFilter: 'blur(4px)',
          borderRadius: theme.spacing(3),
          background: theme.palette.common.white,
          border: '1px solid rgba(219, 219, 219, 0.2) !important' as any,
          boxShadow:
            '0px 6px 14px -6px rgb(2 38 225 / 12%), 0px 10px 32px -4px rgb(2 38 225 / 10%)',
        },
      },
    },
    textField: {
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
    listItem: {
      height: `${theme.spacing(7)} !important`,
      display: 'flex !important',
      flexFlow: 'row nowrap !important',
      justifyContent: 'space-between !important',
      alignItems: 'center !important',
      cursor: 'pointer !important',
      padding: `0 !important`,
      '& .MuiListItemIcon-root': {
        flex: `0 0 ${theme.spacing(7)} !important`,
        justifyContent: 'center !important',
        width: theme.spacing(7),
        '& .image': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: `${theme.spacing(3)} !important`,
          height: `${theme.spacing(3)} !important`,
          borderRadius: '100%',
          padding: 0,
          margin: 0,
          border: '1px solid rgba(177, 177, 242, 0.3)',
          /* Shadow/Secondary (Validator)/Drop Shadow 01 */
          boxShadow:
            '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
        },
      },
      '& .MuiListItemText-root': {
        flexFlow: 'row wrap !important',
        flex: `1 0 ${theme.spacing(3)} !important`,
        padding: '0 !important',
        /* Neutral Color/Light Grey 01 */
        color: theme.palette.custom.forbole.indigo6,
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: theme.typography.body2.fontSize,
        lineHeight: 1.42,
      },
    },
    paper: {
      margin: theme.spacing(2, 0),
      /* Secondary Color/Royal Blue Transparent 04 */
      backgroundColor: alpha(theme.palette.primary.main, 0.9),
      backdropFilter: 'blur(24px)',
      borderRadius: theme.spacing(1.5),
    },
    popper: {
      zIndex: '2001 !important',
      '& .MuiAutocomplete-listbox': {
        maxHeight: `calc(50vh - ${theme.spacing(10)})`,
        [theme.breakpoints.up('tablet')]: {
          maxHeight: '70vh',
        },
      },
      [theme.breakpoints.down('tablet')]: {
        position: 'fixed !important',
        top: `${theme.spacing(8)} !important`,
        bottom: '0 !important',
        left: '0 !important',
        right: '0 !important',
        padding: `${theme.spacing(0, 4)} !important`,
        width: '100% !important',
        backgroundColor:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%) !important',
        backdropFilter: 'blur(16px)',
        transform: 'none !important',
        /* Shadow/Secondary (Validator)/Drop Shadow 02 */
        boxShadow:
          '0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)',
      },
    },
  };
};

export default useStyles;
