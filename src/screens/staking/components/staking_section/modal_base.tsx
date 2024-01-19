import { Modal } from "@mui/material";
import type { ReactNode } from "react";

import IconClose from "@src/components/icons/icon_cross_grey.svg";

import * as styles from "./modal_base.module.scss";

type ModalErrorProps = {
  children: ReactNode;
};

export const ModalError = ({ children, ...rest }: ModalErrorProps) => {
  if (!children) return null;

  return (
    <div {...rest} className={styles.error}>
      {children}
    </div>
  );
};

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
          <button onClick={onClose}>
            <IconClose />
          </button>
        </h2>
        {children}
      </div>
    </Modal>
  );
};

export default ModalBase;
