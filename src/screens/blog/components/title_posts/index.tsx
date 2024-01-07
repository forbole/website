import { Divider } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import * as styles from "./index.module.scss";

const TitlePosts = ({ posts }: any) => {
  const { t } = useTranslation("blog");

  return (
    <ul className={styles.titlePost}>
      <h3 className={styles.contents}>{t("contents")}</h3>
      {posts.map((post: any, i: number) => (
        <div key={post.id}>
          <div className={styles.post}>
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <li className={styles.listItem}>{post.title}</li>
            </Link>
          </div>
          {i === posts.length - 1 ? null : (
            <Divider className={styles.divider} />
          )}
        </div>
      ))}
    </ul>
  );
};

export default TitlePosts;
