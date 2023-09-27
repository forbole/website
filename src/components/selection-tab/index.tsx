import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Opacity } from "@mui/icons-material";


interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan"  /> }}
  />
))({
  
  padding: "4px",
  borderRadius: "24px",
  background: "#1D1E22",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
  },
});

interface StyledTabProps {
  label: string;
  icon?: string | React.ReactElement;
  disabled?: boolean;
  value?:string;
  onClick?: (e:any)=>void
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} iconPosition='start' />
))(({ theme }) => ({
  textTransform: "none",
  minHeight:'45px',
  color: "#fff",
  borderRadius: "200px",
  fontSize: "16px",
  fontWeight: 590,
  textShadow:'none',
  "&.Mui-selected": {
    background: "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%)",
  },
  "&.Mui-hover": {
    background: "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))",
    boxShadow: '4px 8px 24px 0px rgba(42, 34, 194, 0.16)'
  },
  "&.Mui-disabled": {
    color:'#fff',
    // background: "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))",
    boxShadow: '4px 8px 24px 0px rgba(42, 34, 194, 0.16)',
    opacity:'0.5'
  },
  [theme.breakpoints.down('laptop')]:{
    fontSize:'12px',
  }
}));