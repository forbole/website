/* eslint-disable no-console */
import Careers from '@screens/careers';
import type { NextPage } from 'next';
import { getJobPosts } from '@api/jobs';
import { Post } from '@models';

const CareersPage: NextPage = (props: any) => {
  return <Careers {...props} />;
};

export async function getServerSideProps(context: { query: any }) {
  let formattedPosts = [];
  let meta = {};
  let error = false;
  try {
    const { query } = context;
    const fetchQuery: any = {};
    if (query.page) {
      fetchQuery.page = query.page;
    }

    const [posts] = await Promise.all([
      getJobPosts({
        limit: 10,
      }),
    ]);

    formattedPosts = posts.map((post: any) => Post.fromJson(post, {}));
    meta = posts?.meta;
  } catch (err) {
    error = true;
    console.log(error, 'error');
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(formattedPosts)),
      meta: JSON.parse(JSON.stringify(meta)),
      error,
    },
  };
}

export default CareersPage;
