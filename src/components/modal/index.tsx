import { Modal } from "@mui/material";
import type { PropsWithChildren } from "react";

import * as styles from "./index.module.scss";

interface Props extends PropsWithChildren {
  className?: string;
  disableEnforceFocus?: boolean;
  onClose?: (b: boolean) => void;
  open?: boolean;
}

const ModalBase = ({
  children,
  className,
  disableEnforceFocus,
  onClose,
  open = false,
}: Props) => (
  <Modal
    className={styles.modal}
    disableEnforceFocus={disableEnforceFocus}
    onClose={onClose}
    open={open}
    slotProps={{
      backdrop: {
        sx() {
          return {
            backdropFilter: "blur(8px)",
            background: "rgba(123, 123, 123, 0.20)",
          };
        },
      },
    }}
  >
    <div className={[styles.wrapper, className || ""].join(" ")}>
      {children}
    </div>
  </Modal>
);

export default ModalBase;
