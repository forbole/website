import Link from "next/link";

import {
  Forbole as ForboleLogo,
  ForboleShadowIcon,
} from "@src/components/icons";

import { useNavHook } from "./hooks";
import * as styles from "./index.module.scss";

interface GuideNavProps {
  staking?: boolean;
}

const GuideNav = ({ staking }: GuideNavProps) => {
  const { displayBackground } = useNavHook();

  return (
    <div
      className={[styles.wrapper, displayBackground ? styles.bg : ""].join(" ")}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Link
              href="/"
              style={{
                alignItems: "center",
                display: "flex",
                height: "100%",
              }}
            >
              {staking ? <ForboleShadowIcon /> : <ForboleLogo color="#fff" />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideNav;
