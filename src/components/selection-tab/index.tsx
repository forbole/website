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
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
  },
  "background": "#1D1E22",
  "borderRadius": "24px",
  "padding": "4px",
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
  "&.Mui-disabled": {
    boxShadow: "4px 8px 24px 0px rgba(42, 34, 194, 0.16)",
    color: "#fff",
    opacity: "0.5",
  },
  "&.Mui-hover": {
    background:
      "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32))",
    boxShadow: "4px 8px 24px 0px rgba(42, 34, 194, 0.16)",
  },
  "&.Mui-selected": {
    background:
      "linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%),linear-gradient(175.41deg, #623DF5 11.57%, #362187 173.5%)",
  },
  "borderRadius": "200px",
  "color": "#fff",
  "fontSize": "16px",
  "fontWeight": 590,
  "minHeight": "45px",
  "textShadow": "none",
  "textTransform": "none",
  [theme.breakpoints.down("laptop")]: {
    fontSize: "12px",
  },
}));
