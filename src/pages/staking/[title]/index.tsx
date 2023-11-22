import type { NextPage } from "next";

import { getNetworkPosts } from "@api/networks";
import { getSinglePost } from "@api/posts";
import { Post } from "@models";
import NetworkGuides from "@screens/network_guides";
import { removeInternalTags } from "@utils/remove_internal_tags";

const StakingDetailsPage: NextPage = (props: any) => (
  <NetworkGuides {...props} />
);

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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err, "error");
  }

  return { props: { post: { tags: [] } } };
}

export default StakingDetailsPage;
