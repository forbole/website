/* eslint-disable consistent-return */

/* eslint-disable no-console */
import { getNetworkPosts } from "@api/networks";
import { getSinglePost } from "@api/posts";
import { Post } from "@models";
// import BlogDetails from '@screens/blog_details';
// import CareersDetails from '@screens/careers_details';
// import Guide from '@screens/network_guides/components/guide';
import NetworkGuides from "@screens/network_guides";
import { removeInternalTags } from "@utils/remove_internal_tags";
import type { NextPage } from "next";

const StakingDetailsPage: NextPage = (props: any) => {
  return <NetworkGuides {...props} />;
};

export async function getServerSideProps(context: { query: any; res: any }) {
  let formattedSidePosts = [];
  try {
    const { query } = context;
    const { title } = query;
    const post = await getSinglePost(title);
    const [sidePosts] = await Promise.all([
      getNetworkPosts({
        limit: 2,
      }),
    ]);
    const formattedPost = Post.fromJson(post);
    formattedSidePosts = sidePosts.map((sidePost: any) =>
      Post.fromJson(sidePost, {}),
    );
    if (post) {
      post.tags = removeInternalTags(post.tags);

      return {
        props: {
          post: JSON.parse(JSON.stringify(formattedPost)),
          sidePosts: JSON.parse(JSON.stringify(formattedSidePosts)),
        },
      };
    }
    return { post: null };
  } catch (err) {
    console.log(err, "error");
  }
}

export default StakingDetailsPage;
