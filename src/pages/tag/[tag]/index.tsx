import { getPosts, getTags } from "@src/api/posts";
import { getPostsByTag } from "@src/api/tags";
import Post from "@src/models/post";
import Tag from "@src/models/tag";
import TagTitlePosts from "@src/screens/tag";
import { removeInternalTags } from "@src/utils/remove_internal_tags";

const TagDetailsPage = (props: any) => <TagTitlePosts {...props} />;

export async function getServerSideProps(context: { query: any }) {
  let formattedPost: any = [];
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

    if (query.tag) {
      fetchQuery.tag = query.tag;
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
      post: JSON.parse(JSON.stringify(formattedPost)),
      tags: JSON.parse(JSON.stringify(formattedTags)),
      sidePosts: JSON.parse(JSON.stringify(formattedSidePosts)),
      meta: JSON.parse(JSON.stringify(meta)),
      error,
    },
  };
}

export default TagDetailsPage;
