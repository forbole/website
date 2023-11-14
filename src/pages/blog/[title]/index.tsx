import type { NextPage } from "next";

import { getSinglePost } from "@api/posts";
import { Post } from "@models";
import BlogDetails from "@screens/blog_details";
import { removeInternalTags } from "@utils/remove_internal_tags";

const BlogDetailsPage: NextPage = (props: any) => <BlogDetails {...props} />;

export async function getServerSideProps(context: { query: any }) {
  try {
    const { query } = context;
    const { title } = query;
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
  return { post: null };
}

export default BlogDetailsPage;
