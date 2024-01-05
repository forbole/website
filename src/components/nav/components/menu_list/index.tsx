import Link from "next/link";
import { useCallback, useContext } from "react";

import { anchorElContext } from "@src/utils/menu";

import * as styles from "./index.module.scss";

type Props = {
  className?: string;
  menuList: {
    icon?: React.ReactNode;
    link: string;
    locale?: string;
    name: string;
  }[];
};

const MenuList = ({ className, menuList }: Props) => {
  const { setAnchorEl } = useContext(anchorElContext);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <div className={[styles.list, className || ""].join(" ")}>
      {menuList?.map((l, i) => (
        <Link className={styles.link} href={l.link} key={i} locale={l.locale}>
          <button
            className={[
              styles.menuItem,
              l.link !== "#!" ? styles.noFilter : "",
            ].join(" ")}
            onClick={handleClose}
          >
            {l.icon ? <span className={styles.icon}>{l.icon}</span> : null}
            {l.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default MenuList;
