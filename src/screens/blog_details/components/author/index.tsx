import Image from "next/image";
import Link from "next/link";

import * as styles from "./index.module.scss";

const Author = ({ post }: any) => {
  const { primaryAuthor: author, publishedAt } = post;

  return (
    <div className={styles.wrapper}>
      <Image
        alt={author.name}
        className={styles.img}
        height={40}
        src={(() => {
          if (!author.profileImage) {
            return "/images/assets/blog-placeholder.png";
          }

          return `https:${author.profileImage
            .replace("https:", "")
            .replace("http:", "")}`;
        })()}
        width={40}
      />
      <Link className={styles.contentLink} href={`/author/${author.slug}`}>
        <span className={styles.name}>{author.name}</span>
        <span className={styles.time}>{publishedAt}</span>
      </Link>
    </div>
  );
};

export default Author;
