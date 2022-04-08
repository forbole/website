import type { NextPage } from "next";
import BlogDetails from "@screens/blog_details";
import { getSinglePost } from "@api/posts";
import { Post } from "@models";
import { removeInternalTags } from "@utils/remove_internal_tags";

const BlogDetailsPage: NextPage = (props: any) => {
  return <BlogDetails {...props} />;
};

export async function getServerSideProps(context) {
  try {
    const { query } = context;
    const { title } = query;
    const post = await getSinglePost(title);
    if (post) {
      post.tags = removeInternalTags(post.tags);

      const formattedPost = Post.fromJson(post);

      return { props: { post: JSON.parse(JSON.stringify(formattedPost)) } };
    } else {
      return { post: null };
    }
  } catch (err) {
    console.log(err, "error");
  }
}

export default BlogDetailsPage;
