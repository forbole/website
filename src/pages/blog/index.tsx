import type { NextPage } from "next";

import { getAllPosts, getPosts, getTags } from "@src/api/posts";
import Post from "@src/models/post";
import Tag from "@src/models/tag";
import Blog from "@src/screens/blog";
import { removeInternalTags } from "@src/utils/remove_internal_tags";

const BlogPage: NextPage = (props: any) => <Blog {...props} />;

export async function getServerSideProps(context: { query: any }) {
  let formattedPosts = [];
  let formattedSidePosts = [];
  let formattedTags: Tag[] = [];
  let meta = {};
  let error = false;

  try {
    const { query } = context;
    const fetchQuery: any = {};
    let posts: any = [];

    if (query.page) {
      fetchQuery.page = query.page;
      posts = await getPosts(fetchQuery);
    } else if (query.limit) {
      fetchQuery.limit = query.limit;
      posts = await getAllPosts(fetchQuery);
    } else {
      posts = await getPosts(fetchQuery);
    }

    const [tags, sidePosts] = await Promise.all([
      getTags(),
      getPosts({
        limit: 10,
      }),
    ]);

    formattedPosts = posts.map((post: any) => Post.fromJson(post, {}));
    formattedSidePosts = sidePosts.map((post: any) => Post.fromJson(post, {}));
    formattedTags = removeInternalTags(tags).map((tag) => Tag.fromJson(tag));
    meta = posts.meta;
  } catch (err) {
    error = true;
    // eslint-disable-next-line no-console
    console.log(err, "error");
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(formattedPosts)),
      tags: JSON.parse(JSON.stringify(formattedTags)),
      sidePosts: JSON.parse(JSON.stringify(formattedSidePosts)),
      meta: JSON.parse(JSON.stringify(meta)),
      error,
    },
  };
}

export default BlogPage;
