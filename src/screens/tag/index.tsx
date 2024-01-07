import useTranslation from "next-translate/useTranslation";

import Layout from "@src/components/layout";
import Tags from "@src/components/tags";

import TitlePosts from "../blog/components/title_posts";
import TagPosts from "./components/tag_posts";
import { useBlogHook } from "./hooks";
import * as styles from "./index.module.scss";

const TagTitlePosts = ({ error, meta, post, sidePosts = [], tags }: any) => {
  const { t } = useTranslation("blog");

  useBlogHook(error, t);

  if (!post) return null;

  const currentPage = meta?.pagination?.page;

  return (
    <Layout
      blueBg
      footer
      noIndex={Number(currentPage) !== 1}
      title={t("title")}
    >
      <div className={styles.flex}>
        <div className={styles.wrapper}>
          <TagPosts blogs={post.slice(1)} main={post[0]} meta={meta} />
          <div className={styles.side}>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagTitlePosts;
