import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getNetworkPosts } from "@src/api/networks";
import { getPosts, getSinglePost, stakingGuidePrefix } from "@src/api/posts";
import Post from "@src/models/post";
import NetworkGuides from "@src/screens/network_guides";
import { locales } from "@src/utils/i18next";
import { removeInternalTags } from "@src/utils/remove_internal_tags";

const StakingDetailsPage: NextPage = (props: any) => (
  <NetworkGuides {...props} />
);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({
    limit: 1000,
  });

  const paths = locales
    .map((locale) =>
      posts.filter(Boolean).map((post: any) => ({
        locale,
        params: {
          title: post.slug,
        },
      })),
    )
    .flat()
    .filter(
      (path) =>
        path.params.title && path.params.title.startsWith(stakingGuidePrefix),
    );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
  { post: any },
  { title: string }
> = async (context) => {
  let formattedSidePosts = [];
  try {
    const { params } = context;
    if (!params) throw new Error("No params");
    const { title } = params;
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

  return { props: { post: null } };
};

export default StakingDetailsPage;
