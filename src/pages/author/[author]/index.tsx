import { getAuthorBySlug, getPostsByAuthor } from "@src/api/authors";
import { getPosts, getTags } from "@src/api/posts";
import Post from "@src/models/post";
import Tag from "@src/models/tag";
import AuthorTitlePosts from "@src/screens/author";
import { removeInternalTags } from "@src/utils/remove_internal_tags";

const AuthorDetailsPage = (props: any) => <AuthorTitlePosts {...props} />;

export async function getServerSideProps(context: {
  locale: string;
  query: any;
}) {
  let authorPosts: any = [];
  let authorInfo = {};
  let formattedSidePosts = [];
  let formattedTags: Tag[] = [];
  let meta = {};
  let error = false;

  try {
    const { locale, query } = context;
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

    formattedSidePosts = sidePosts.map((post: any) =>
      Post.fromJson(post, { locale }),
    );

    formattedTags = removeInternalTags(tags).map((tag) => Tag.fromJson(tag));
    meta = posts?.meta;
    authorPosts = posts.map((y: any) => Post.fromJson(y, { locale }));

    authorPosts.tags = posts.map((x: { tags: any[] }) =>
      removeInternalTags(x.tags),
    );
  } catch (err) {
    error = true;
    // eslint-disable-next-line no-console
    console.log(error, "error");
  }

  return {
    props: {
      author: JSON.parse(JSON.stringify(authorInfo)),
      error,
      meta: JSON.parse(JSON.stringify(meta)),
      post: JSON.parse(JSON.stringify(authorPosts)),
      sidePosts: JSON.parse(JSON.stringify(formattedSidePosts)),
      tags: JSON.parse(JSON.stringify(formattedTags)),
    },
  };
}

export default AuthorDetailsPage;
