import { ghostApi as api } from "../index";

export const getPostsByTag = async (query: { tag: string; page?: number }) => {
  try {
    const posts = await api.posts.browse({
      filter: `tags:${query.tag}`,
      include: "tags,authors",
      limit: 10,
      page: query?.page || 1,
      formats: "html",
    });
    return posts ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`tag: ${err}`);
    return [];
  }
};
