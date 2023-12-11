import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getPosts, getSinglePost, stakingGuidePrefix } from "@src/api/posts";
import Post from "@src/models/post";
import BlogDetails from "@src/screens/blog_details";
import { locales } from "@src/utils/i18next";
import { removeInternalTags } from "@src/utils/remove_internal_tags";

const BlogDetailsPage: NextPage = (props: any) => <BlogDetails {...props} />;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({
    limit: 1000,
  });

  const paths = locales
    .map((locale) =>
      posts.map((post: any) => ({
        locale,
        params: {
          title: post.slug,
        },
      })),
    )
    .flat()
    .filter(
      (path) =>
        path.params.title && !path.params.title.startsWith(stakingGuidePrefix),
    );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
  { post: any },
  { title: string }
> = async (context) => {
  try {
    const { params } = context;
    if (!params) throw new Error("No params");
    const { title } = params;

    const post = await getSinglePost(title);

    if (post) {
      post.tags = removeInternalTags(post.tags);

      const formattedPost = Post.fromJson(post);

      return { props: { post: JSON.parse(JSON.stringify(formattedPost)) } };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err, "error");
  }

  return {
    props: {
      post: null,
    },
  };
};

export default BlogDetailsPage;
