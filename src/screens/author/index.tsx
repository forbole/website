import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import Layout from "@src/components/layout";

import AuthorPosts from "./components/author_posts";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";
import type { AuthorMeta } from "./types";

type Props = {
  author: any;
  meta: AuthorMeta;
  post: any;
  tags: any;
};

const AuthorTitlePosts = ({ author, meta, post, tags }: Props) => {
  const { t } = useTranslation("blog");

  const { error, excerpt, featureImage } = post;

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
                "agentInteractionStatistic": {
                  "@type": "InteractionCounter",
                  "interactionType": "https://schema.org/WriteAction",
                  "userInteractionCount": meta.pagination?.total,
                },
                "alternateName": author.slug,
                "brand": {
                  "@type": "Organization",
                  "name": "Forbole",
                  "url": "https://www.forbole.com/",
                },
                "identifier": author.id,
                "image": author.profile_image,
                "name": author.name,
                "url": `https://www.forbole.com/author/${author.slug}/`,
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <div className={styles.imgWrapper}>
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
                <span className={styles.authorName}>{author.name}</span>
              </span>
            </div>
            <AuthorPosts blogs={post.slice(1)} main={post[0]} meta={meta} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorTitlePosts;
