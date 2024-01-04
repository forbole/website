import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import * as styles from "./index.module.scss";

type BaseTag = {
  name: string;
  slug: string;
};

interface TagsProps {
  details?: boolean;
  noPadding?: boolean;
  tags: BaseTag[];
}

const Tags = ({ details, noPadding, tags }: TagsProps) => {
  const { t } = useTranslation("blog");

  if (!tags?.length) return null;

  return (
    <div
      className={[
        styles.wrapper,
        details ? styles.details : "",
        noPadding ? styles.noPadding : "",
      ].join(" ")}
    >
      <h3>{t("tags")}</h3>
      <ul className={styles.tag}>
        {tags.map((tag) => (
          <li className={styles.list} key={tag.slug}>
            <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
