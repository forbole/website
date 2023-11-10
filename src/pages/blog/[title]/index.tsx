/* eslint-disable consistent-return */

/* eslint-disable no-console */
import { getSinglePost } from "@api/posts";
import { Post } from "@models";
import BlogDetails from "@screens/blog_details";
import { removeInternalTags } from "@utils/remove_internal_tags";
import type { NextPage } from "next";

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
    return { post: null };
  } catch (err) {
    console.log(err, "error");
  }
}

export default BlogDetailsPage;
