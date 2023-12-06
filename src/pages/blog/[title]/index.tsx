import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getPosts, getSinglePost } from "@api/posts";
import { Post } from "@models";
import BlogDetails from "@screens/blog_details";
import { locales } from "@src/utils/i18next";
import { removeInternalTags } from "@utils/remove_internal_tags";

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
    .flat();

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
