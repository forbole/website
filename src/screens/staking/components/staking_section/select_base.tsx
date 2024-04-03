import IconChevronDown from "@src/components/icons/icon_chevron_down.svg";

import * as styles from "./select_base.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const IconComponent = ({ className }: { className: string }) => (
  <IconChevronDown
    className={[
      className,
      styles.trigger,
      className.includes("disabled") ? styles.disabled : "",
    ].join(" ")}
  />
);

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const selectStyles = {
  control: styles.control,
  select: styles.select,
};
