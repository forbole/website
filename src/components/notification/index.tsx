import type { PropsWithChildren, ReactNode } from "react";
import type { ToastOptions } from "react-toastify";
import { toast } from "react-toastify";

import * as styles from "./index.module.scss";

const NotificationTitle = ({ children }: PropsWithChildren) => (
  <div className={styles.notificationTitle}>{children}</div>
);

const NotificationSubtitle = ({ children }: PropsWithChildren) => (
  <div className={styles.notificationSubtitle}>{children}</div>
);

const NotificationBox = ({ children }: PropsWithChildren) => (
  <div className={styles.notificationBox}>{children}</div>
);

const NotificationContent = ({ children }: PropsWithChildren) => (
  <div className={styles.notificationContent}>{children}</div>
);

type NotificationIconProps = {
  icon: string;
};

const NotificationIcon = ({ icon }: NotificationIconProps) => (
  <div className={styles.notificationIcon}>
    <img alt="" src={icon} />
  </div>
);

type ToastOptsBase = {
  subtitle?: ReactNode;
  title: ReactNode;
};

type ToastOpts = ToastOptsBase & {
  icon: null | string;
};

const NotificationBase = ({ icon, subtitle, title }: ToastOpts) => (
  <NotificationBox>
    {icon && <NotificationIcon icon={icon} />}
    <NotificationContent>
      <NotificationTitle>{title}</NotificationTitle>
      {subtitle && <NotificationSubtitle>{subtitle}</NotificationSubtitle>}
    </NotificationContent>
  </NotificationBox>
);

export const toastSuccess = (
  props: ToastOptsBase,
  toastOpts: ToastOptions = {},
) => {
  toast(<NotificationBase {...props} icon="checkmarkFilled" />, {
    className: styles.success,
    position: "top-right",
    ...toastOpts,
  });
};

export const toastError = (
  props: ToastOptsBase,
  toastOpts: ToastOptions = {},
) => {
  toast(<NotificationBase {...props} icon="errorCross" />, {
    className: styles.error,
    position: "top-right",
    ...toastOpts,
  });
};
