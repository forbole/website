import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import type { ReactElement, ReactNode, SyntheticEvent } from "react";

import * as styles from "./index.module.scss";

interface StyledTabsProps {
  children?: ReactNode;
  className?: string;
  onChange: (event: SyntheticEvent, newValue: number) => void;
  value: number;
}

export const StyledTabs = ({ className, ...props }: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    className={[styles.tabs, className || ""].join(" ")}
  />
);

interface StyledTabProps {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement | string;
  label: string;
  onClick?: (e: any) => void;
  value?: string;
}

export const StyledTab = ({ className, ...props }: StyledTabProps) => (
  <Tab
    disableRipple
    {...props}
    className={[styles.tab, className || ""].join(" ")}
    iconPosition="start"
  />
);
