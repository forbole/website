import { css, useTheme } from '@mui/material';

const useStyles = () => {
  const theme = useTheme();
  return {
    grid: css({
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gridGap: theme.spacing(2),
      [theme.breakpoints.up('laptop')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(1, 1fr)',
        gridGap: theme.spacing(3),
      },
    }),
  };
};

export default useStyles;
