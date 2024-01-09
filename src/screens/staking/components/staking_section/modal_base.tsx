/* eslint-disable no-console */
import { Modal } from "@mui/material";
import type { ReactNode } from "react";

import * as styles from "./modal_base.module.scss";

type Props = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title?: string;
};

const ModalBase = ({ children, onClose, open, title }: Props) => {
  if (!open) return null;

  return (
    <Modal
      className={styles.modal}
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
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {title && <span>{title}</span>}
          <button onClick={onClose}>X</button>
        </h2>
        {children}
      </div>
    </Modal>
  );
};

export default ModalBase;
