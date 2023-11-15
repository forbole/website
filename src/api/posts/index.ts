import { ghostApi as api } from "../index";
import type { IPost } from "./interface";

/** Gets posts from remote */
export const getPosts = async ({
  limit = 11,
  page = 1,
  filter = "tags:-[careers]",
}: IPost) => {
  try {
    return await api.posts.browse({
      include: "tags,authors",
      limit,
      page,
      filter,
      formats: "html",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return [];
  }
};

/** Gets posts from remote based on See More on mobile device */
export const getAllPosts = async ({
  limit,
  filter = "tags:-[careers]",
}: IPost) => {
  try {
    return await api.posts.browse({
      include: "tags,authors",
      limit,
      filter,
      formats: "html",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return [];
  }
};

/** Get single post by slug */
export const getSinglePost = async (slug: string) => {
  try {
    return await api.posts.read(
      { slug },
      {
        include: "tags,authors",
        formats: "html",
      },
    );
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return null;
  }
};

/** Get all post tags */
export const getTags = async () => {
  try {
    return await api.tags.browse({
      order: "count.posts DESC",
      limit: "15",
      include: "count.posts",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return [];
  }
};
