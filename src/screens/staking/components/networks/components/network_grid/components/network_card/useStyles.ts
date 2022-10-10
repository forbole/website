import { alpha, css, useTheme } from '@mui/material';

const useStyles = () => {
  const theme = useTheme();
  return {
    root: css({
      minWidth: theme.spacing(15),
      minHeight: theme.spacing(10),
      borderRadius: theme.spacing(3),
      backgroundColor: alpha(theme.palette.common.white, 0.6),
      /* Shadow/Secondary (Validator)/Drop Shadow 02 */
      boxShadow:
        '0px 6px 14px -6px rgba(2, 38, 225, 0.12), 0px 10px 32px -4px rgba(2, 38, 225, 0.1)',
      display: 'inline-flex',
      justifyContent: 'center',
      flexFlow: 'row wrap',
      alignItems: 'center',
      textAlign: 'center',
      '& .MuiLinearProgress-root': {
        width: '100%',
      },
      '&:hover': {
        backgroundColor: theme.palette.grey.A200,
      },
      '& .MuiTypography-h3, & .MuiTypography-h6, & .MuiTypography-body1': {
        whiteSpace: 'nowrap',
      },
      '& .image': {
        minWidth: theme.spacing(6),
        minHeight: theme.spacing(6),
        maxWidth: theme.spacing(6),
        maxHeight: theme.spacing(6),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        padding: 0,
        margin: 0,
        border: '2px solid rgba(2, 38, 225, 0.16)',
        /* Shadow/Secondary (Validator)/Drop Shadow 01 */
        boxShadow:
          '0px 8px 22px -6px rgba(2, 38, 225, 0.12), 0px 14px 64px -4px rgba(2, 38, 225, 0.12)',
      },
      '& .networkbox__explore-btn': {
        // ...theme.mixins.button:
        padding: '0.75rem 1rem',
        borderRadius: '200px',
        /* Primary Color/BD Red Gradient 02 */
        backgroundColor: '#F6504B',
        backgroundImage: 'linear-gradient(286.17deg, #D431EE 0%, #FF426B 100%)',
        /* Neutral Color/White */
        color: '#FFFFFF',
        '&:hover': {
          filter: 'brightness(1.2)',
        },
        // additional style:
        fontSize: theme.typography.body1.fontSize,
      },
      '& .networkbox__close-btn': {
        position: 'absolute',
        right: theme.spacing(2),
        marginTop: `-${theme.spacing(1)}`,
        [theme.breakpoints.up('tablet')]: {
          display: 'none',
        },
      },
      '& .networkbox__desktop-anchor, & .networkbox__mobile-anchor': {
        /* Secondary Color/Royal Blue 01 */
        color: theme.palette.custom.forbole.indigo6,
        fontSize: theme.spacing(2),
        borderRadius: theme.spacing(1.5),
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'row wrap',
        gap: theme.spacing(0.5),
        padding: '20% 0',
        '&:hover': {
          opacity: 1,
        },
      },
      '& .networkbox__desktop-anchor': {
        display: 'none',
        position: 'relative',
        cursor: 'pointer',
        [theme.breakpoints.up('tablet')]: {
          display: 'flex',
          '&:hover .networkbox__popover': {
            display: 'flex !important',
          },
        },
        '& .networkbox__popover': {
          pointerEvents: 'none',
        },
        '&:hover .networkbox__popover': {
          [theme.breakpoints.up('tablet')]: {
            display: 'flex !important',
          },
        },
        '& .networkbox__explore-btn': {
          display: 'none',
        },
      },
      '& .networkbox__mobile-anchor': {
        display: 'flex',
        position: 'static',
        gap: theme.spacing(3),
        '&:hover': {
          backgroundColor: theme.palette.grey[500],
        },
        [theme.breakpoints.up('tablet')]: {
          display: 'none',
        },
      },
      '& .networkbox__mobile-popover-contaier': {
        display: 'block',
        alignSelf: 'flex-start',
        cursor: 'pointer',
        [theme.breakpoints.up('tablet')]: {
          display: 'none',
        },
        '&.networkbox__active .networkbox__popover': {
          display: 'flex !important',
        },
        '& .networkbox__popover': {
          left: theme.spacing(3),
          right: theme.spacing(3),
        },
        '& .MuiTypography-h3': {
          // fontSize: theme.typography.h5.fontSize,
          fontSize: theme.spacing(2),
          color: theme.palette.custom.forbole.indigo6,
        },
        '& .MuiTypography-h6, & .MuiTypography-body1': {
          // fontSize: theme.typography.body2.fontSize,
          fontSize: theme.spacing(2),
          color: theme.palette.custom.forbole.indigo6,
        },
      },
      '& .MuiTypography-h4': {
        textOverflow: 'clip',
        width: '100%',
        overflow: 'hidden',
        fontSize: theme.spacing(2),
        fontWeight: 600,
        color: theme.palette.custom.forbole.indigo6,
        [theme.breakpoints.down('mobile')]: {
          fontSize: theme.typography.h6.fontSize,
        },
      },
      '& .networkbox__popover': {
        position: 'absolute',
        display: 'none',
        zIndex: 3,
        padding: theme.spacing(3),
        [theme.breakpoints.down('tablet')]: {
          marginTop: `-${theme.spacing(1)}`,
        },
        [theme.breakpoints.up('tablet')]: {
          minWidth: '125%',
          minHeight: '125%',
          maxWidth: theme.spacing(34),
          maxHeight: theme.spacing(27.25),
        },
        boxShadow:
          '10px 8px 12px -6px rgba(2, 38, 225, 0.08), 18px 14px 24px -4px rgba(2, 38, 225, 0.04), inset 6px 6px 6px rgba(255, 255, 255, 0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          zIndex: -1,
          display: 'block',
          boxShadow:
            '10px 8px 12px -6px rgba(2, 38, 225, 0.08), 18px 14px 24px -4px rgba(2, 38, 225, 0.04), inset 6px 6px 6px rgba(255, 255, 255, 0.2)',
          background:
            'linear-gradient(269.66deg, rgba(2, 158, 225, 0.4) -12.39%, rgba(2, 38, 225, 0.2) 99.38%), rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          width: '100%',
          height: '100%',
          borderRadius: theme.spacing(3),
          [theme.breakpoints.down('tablet')]: {
            marginTop: `-${theme.spacing(1)}`,
          },
          [theme.breakpoints.up('tablet')]: {
            maxWidth: theme.spacing(34),
            maxHeight: theme.spacing(27.25),
          },
        },
        color: theme.palette.text.primary,
        borderRadius: theme.spacing(3),
        flexFlow: 'row wrap',
        gap: theme.spacing(2),
        justifyContent: 'center',
        alignItems: 'flex-start',
        '& .MuiTypography-h6': {
          textAlign: 'left',
        },
        '& .MuiTypography-body1': {
          textAlign: 'right',
        },
        '& > .MuiBox-root:nth-of-type(1)': {
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: theme.spacing(1),
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: theme.typography.fontWeightBold,
          width: '100%',
        },
        '& > .MuiBox-root:nth-of-type(2)': {
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          gap: theme.spacing(1),
          width: '100%',
          '& > .MuiBox-root': {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            gap: theme.spacing(3),
            alignItems: 'center',
            '& > .MuiBox-root': {
              flex: '1 0 auto',
            },
            '& > .MuiBox-root:nth-of-type(1)': {
              fontWeight: theme.typography.fontWeightBold,
              textAlign: 'left',
            },
            '& > .MuiBox-root:nth-of-type(2)': {
              textAlign: 'right',
            },
          },
        },
      },
    }),
  };
};

export default useStyles;
