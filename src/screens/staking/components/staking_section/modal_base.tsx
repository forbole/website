/* eslint-disable no-console */
import { Modal } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
};

const ModalBase = ({ children, onClose, open }: Props) => {
  if (!open) return null;

  return (
    <Modal
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
      sx={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          left: "50%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalBase;
