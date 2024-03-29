import { ghostApi as api } from "../index";

export const getPostsByTag = async (query: { page?: number; tag: string }) => {
  try {
    const posts = await api.posts.browse({
      filter: `tags:${query.tag}`,
      formats: "html",
      include: "tags,authors",
      limit: 10,
      page: query?.page || 1,
    });

    return posts ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`tag: ${err}`);

    return [];
  }
};
