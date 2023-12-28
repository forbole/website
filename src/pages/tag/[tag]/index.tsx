import type { GetStaticPaths, GetStaticProps } from "next";

import { getPosts, getTags } from "@src/api/posts";
import { getPostsByTag } from "@src/api/tags";
import Post from "@src/models/post";
import Tag from "@src/models/tag";
import TagTitlePosts from "@src/screens/tag";
import { locales } from "@src/utils/i18next";
import { removeInternalTags } from "@src/utils/remove_internal_tags";

const TagDetailsPage = (props: any) => <TagTitlePosts {...props} />;

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.QUICK_BUILD === "true") {
    return {
      fallback: "blocking",
      paths: [],
    };
  }

  const tags = await getTags("1000");

  const paths = locales
    .map((locale) =>
      tags.map((tag: any) => ({
        locale,
        params: {
          tag: tag.slug,
        },
      })),
    )
    .flat();

  return { fallback: "blocking", paths };
};

export const getStaticProps: GetStaticProps<any, { tag: string }> = async (
  context,
) => {
  let formattedPost: any = [];
  let formattedSidePosts = [];
  let formattedTags: Tag[] = [];
  let meta = {};
  let error = false;

  try {
    const { params } = context;
    const fetchQuery: any = {};

    if (params?.tag) {
      fetchQuery.tag = params.tag;
    }

    const [tags, posts, sidePosts] = await Promise.all([
      getTags(),
      getPostsByTag(fetchQuery),
      getPosts({
        limit: 10,
      }),
    ]);

    formattedSidePosts = sidePosts.map((post: any) => Post.fromJson(post, {}));
    formattedTags = removeInternalTags(tags).map((tag) => Tag.fromJson(tag));
    meta = posts?.meta;

    formattedPost = posts.map((y: any) => Post.fromJson(y, {}));

    formattedPost.tags = posts.map((x: { tags: any[] }) =>
      removeInternalTags(x.tags),
    );
  } catch (err) {
    error = true;
    // eslint-disable-next-line no-console
    console.log(error, "error");
  }

  return {
    props: {
      error,
      meta: JSON.parse(JSON.stringify(meta)),
      post: JSON.parse(JSON.stringify(formattedPost)),
      sidePosts: JSON.parse(JSON.stringify(formattedSidePosts)),
      tags: JSON.parse(JSON.stringify(formattedTags)),
    },
  };
};

export default TagDetailsPage;
