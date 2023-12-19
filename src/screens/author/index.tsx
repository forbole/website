import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import Layout from "@src/components/layout";

import AuthorPosts from "./components/author_posts";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";

const AuthorTitlePosts = (props: any) => {
  const { t } = useTranslation("blog");
  const { post, tags, author, meta } = props;
  const { featureImage, excerpt, error } = post;

  useBlogHook(error, t);

  return (
    <Layout
      blueBg
      description={excerpt}
      footer
      image={featureImage}
      keywords={tags.map((x: { name: any }) => x.name ?? "")}
      skipLocale
      title={post.title}
      type="article"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": author.name,
                "alternateName": author.slug,
                "identifier": author.id,
                "url": `https://www.forbole.com/blog/author/${author.slug}/`,
                "image": author.profile_image,
                "brand": {
                  "@type": "Organization",
                  "name": "Forbole",
                  "url": "https://www.forbole.com/",
                },
                "agentInteractionStatistic": {
                  "@type": "InteractionCounter",
                  "interactionType": "https://schema.org/WriteAction",
                  "userInteractionCount": meta.pagination?.total,
                },
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <Box className={styles.container}>
        <Box className={styles.content}>
          <Box className={styles.innerContent}>
            <Box className={styles.imgWrapper}>
              <img
                alt={author.name}
                className={styles.img}
                src={
                  author.profile_image == null
                    ? "/images/assets/blog-placeholder.png"
                    : author.profile_image
                }
              />
              <span>
                <Typography className={styles.authorName} variant="body1">
                  {author.name}
                </Typography>
              </span>
            </Box>
            <AuthorPosts blogs={post.slice(1)} main={post[0]} meta={meta} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default AuthorTitlePosts;
