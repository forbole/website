/* eslint-disable no-console */
import { getAuthorBySlug, getPostsByAuthor } from "@api/authors";
import { getPosts, getTags } from "@api/posts";
import { Post, Tag } from "@models";
import AuthorTitlePosts from "@screens/author";
import { removeInternalTags } from "@utils/remove_internal_tags";

const AuthorDetailsPage = (props: any) => {
  return <AuthorTitlePosts {...props} />;
};

export async function getServerSideProps(context: { query: any }) {
  let authorPosts: any = [];
  let authorInfo = {};
  let formattedSidePosts = [];
  let formattedTags: Tag[] = [];
  let meta = {};
  let error = false;
  try {
    const { query } = context;
    const fetchQuery: any = {};
    if (query.page) {
      fetchQuery.page = query.page;
    }
    if (query.author) {
      fetchQuery.author = query.author;
    }
    const [tags, posts, authorDetails, sidePosts] = await Promise.all([
      getTags(),
      getPostsByAuthor(fetchQuery),
      getAuthorBySlug(fetchQuery),
      getPosts({
        limit: 10,
      }),
    ]);
    authorInfo = authorDetails;
    formattedSidePosts = sidePosts.map((post: any) => Post.fromJson(post, {}));
    formattedTags = removeInternalTags(tags).map((tag) => Tag.fromJson(tag));
    meta = posts?.meta;
    authorPosts = posts.map((y: any) => Post.fromJson(y, {}));
    authorPosts.tags = posts.map((x: { tags: any[] }) =>
      removeInternalTags(x.tags),
    );
  } catch (err) {
    error = true;
    console.log(error, "error");
  }
  return {
    props: {
      author: JSON.parse(JSON.stringify(authorInfo)),
      post: JSON.parse(JSON.stringify(authorPosts)),
      tags: JSON.parse(JSON.stringify(formattedTags)),
      sidePosts: JSON.parse(JSON.stringify(formattedSidePosts)),
      meta: JSON.parse(JSON.stringify(meta)),
      error,
    },
  };
}

export default AuthorDetailsPage;
