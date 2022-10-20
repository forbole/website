import { css, useTheme } from '@mui/material';

const useStyles = () => {
  const theme = useTheme();
  return {
    navBarButton: css({}),
  };
};

export default useStyles;
