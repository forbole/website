import { forwardRef } from "react";

import * as styles from "./index.module.scss";

type Props = {
  children?: React.ReactNode;
  // @deprecated
  imageHref?: string;
  imageHrefs?: string[];
  imgFull?: boolean;
  index: number;
  title?: string;
  value: number;
};

const productPanel = forwardRef<HTMLDivElement, Props>(
  ({ children, imageHref, imageHrefs, imgFull, index, title, value }, ref) => {
    // eslint-disable-next-line eqeqeq
    if (index != value) {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>;
    }

    return (
      <div className={styles.wrapper} ref={ref}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div
          className={[styles.container, imgFull ? styles.imgFull : ""].join(
            " ",
          )}
        >
          <div className={styles.imgWrapper}>
            {imageHrefs ? (
              <>
                <img
                  alt=""
                  className={styles.imgMobile}
                  loading="lazy"
                  src={imageHrefs[0]}
                />
                <img
                  alt=""
                  className={styles.imgDesktop}
                  loading="lazy"
                  src={imageHrefs[1]}
                />
              </>
            ) : (
              <img
                alt=""
                loading="lazy"
                src={imageHref}
                style={{ display: "block" }}
              />
            )}
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  },
);

export default productPanel;
