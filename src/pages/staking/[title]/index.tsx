/* eslint-disable consistent-return */
/* eslint-disable no-console */
import type { NextPage } from 'next';
// import BlogDetails from '@screens/blog_details';
// import CareersDetails from '@screens/careers_details';
import Guide from '@screens/network_guides/components/guide';
import { getSinglePost } from '@api/posts';
import { getNetworkPosts } from '@api/networks';
import { Post } from '@models';
import { removeInternalTags } from '@utils/remove_internal_tags';

const StakingDetailsPage: NextPage = (props: any) => {
  return <Guide {...props} />;
};

export async function getServerSideProps(context: { query: any }) {
  let formattedSidePosts = [];
  try {
    const { query } = context;
    const { title } = query;
    console.log('hiii', title);
    const post = await getSinglePost(title);
    const [sidePosts] = await Promise.all([
      getNetworkPosts({
        limit: 2,
      }),
    ]);
    const formattedPost = Post.fromJson(post);
    formattedSidePosts = sidePosts.map((sidePost: any) =>
      Post.fromJson(sidePost, {})
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
    console.log(err, 'error');
  }
}

export default StakingDetailsPage;
