import { ghostApi as api } from "../index";

export const getAuthorBySlug = async (query: { author: string }) => {
  try {
    const authorInfo = await api.authors.read({
      slug: `${query.author}`,
    });

    return authorInfo ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`tag: ${err}`);

    return [];
  }
};

export const getPostsByAuthor = async (query: {
  author: string;
  page?: number;
}) => {
  try {
    const posts = await api.posts.browse({
      filter: `author:${query.author}`,
      include: "tags,authors",
      limit: 5,
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
