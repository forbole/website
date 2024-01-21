import DOMPurify from "isomorphic-dompurify";

import * as styles from "./index.module.scss";

const GuideDetails = ({ post }: any) => {
  const { sanitize } = DOMPurify;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.guideContent}>
          <div
            className={styles.guideContentBox}
            dangerouslySetInnerHTML={{ __html: sanitize(post.html) }}
          />
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
