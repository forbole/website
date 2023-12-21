import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useCallback, useContext } from "react";

import { anchorElContext } from "@src/utils/menu";

import * as styles from "./index.module.scss";

type Props = {
  menuList: {
    icon?: React.ReactNode;
    link: string;
    locale?: string;
    name: string;
  }[];
  className?: string;
};

const MenuList = ({ menuList, className }: Props) => {
  const { setAnchorEl } = useContext(anchorElContext);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <List
      className={[styles.list, className || ""].join(" ")}
      component="div"
      disablePadding
    >
      {menuList?.map((l, i) => (
        <Link className={styles.link} href={l.link} key={i} locale={l.locale}>
          <MenuItem
            className={[
              styles.menuItem,
              l.link !== "#!" ? styles.noFilter : "",
            ].join(" ")}
            component="span"
            onClick={handleClose}
          >
            {l.icon ? <span className={styles.icon}>{l.icon}</span> : null}
            {l.name}
          </MenuItem>
        </Link>
      ))}
    </List>
  );
};

export default MenuList;
