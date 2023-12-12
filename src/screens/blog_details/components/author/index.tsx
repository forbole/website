import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { NoSSR } from "@src/components/no-ssr";
import useHKT from "@src/hooks/useHKT";

import * as styles from "./index.module.scss";

const Author = ({ post }: any) => {
  const { primaryAuthor: author, publishedAt } = post;
  const time = useHKT(publishedAt);

  return (
    <Box className={styles.wrapper}>
      <Image
        alt={author.name}
        className={styles.img}
        height={40}
        src={(() => {
          if (author.profileImage == null) {
            return "/images/assets/blog-placeholder.png";
          }

          return `https:${author.profileImage
            .replace("https:", "")
            .replace("http:", "")}`;
        })()}
        width={40}
      />
      <Box className={styles.content}>
        <Link
          className={styles.contentLink}
          href={`/author/${author.slug}`}
          key={post.id}
        >
          <Typography className={styles.name} variant="body1">
            {author.name}
          </Typography>
          <NoSSR>
            <Typography className={styles.time} variant="body1">
              {time}
            </Typography>
          </NoSSR>
        </Link>
      </Box>
    </Box>
  );
};

export default Author;
