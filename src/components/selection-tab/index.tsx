import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import type { ReactElement, ReactNode, SyntheticEvent } from "react";

interface StyledTabsProps {
  children?: ReactNode;
  className?: string;
  onChange: (event: SyntheticEvent, newValue: number) => void;
  value: number;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "padding": "4px",
  "borderRadius": "24px",
  "background": "#1D1E22",
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
  className?: string;
  disabled?: boolean;
  icon?: ReactElement | string;
  label: string;
  onClick?: (e: any) => void;
  value?: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} iconPosition="start" />
))(({ theme }) => ({
  "textTransform": "none",
  "minHeight": "45px",
  "color": "#fff",
  "borderRadius": "200px",
  "fontSize": "16px",
  "fontWeight": 590,
  "textShadow": "none",
  "&.Mui-selected": {
    background:
      "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%)",
  },
  "&.Mui-hover": {
    background:
      "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))",
    boxShadow: "4px 8px 24px 0px rgba(42, 34, 194, 0.16)",
  },
  "&.Mui-disabled": {
    color: "#fff",
    boxShadow: "4px 8px 24px 0px rgba(42, 34, 194, 0.16)",
    opacity: "0.5",
  },
  [theme.breakpoints.down("laptop")]: {
    fontSize: "12px",
  },
}));
