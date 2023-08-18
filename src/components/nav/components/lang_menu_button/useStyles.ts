import { css,useTheme } from "@mui/material";

const useStyles = () => {
  const theme = useTheme();
  return {
    navBarButton: css({
      // width: "68px",
      padding: "8px 12px",
      fontSize: "16px",
      borderRadius:'40px',
      backgroundColor:"transparent",
      "&:hover":{
        backgroundColor:"rgba(107, 97, 254, 0.24)"
      }
    }),
    desktop:css({
      display: "none",
      [theme.breakpoints.up('laptop')]:{
        display:'block',
      }
    }),
    mobile:css({
      display:'block',
      [theme.breakpoints.up('laptop')]:{
        display: "none",
      }
    })
  };
};

export default useStyles;
