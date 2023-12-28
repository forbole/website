import { ghostApi as api } from "../index";
import type { IPost } from "./interface";

export const stakingGuidePrefix = "how-to-stake";

/** Gets posts from remote */
export const getPosts = async ({
  filter = "tags:-[careers]",
  limit = 11,
  page = 1,
}: IPost) => {
  try {
    return await api.posts.browse({
      filter,
      formats: "html",
      include: "tags,authors",
      limit,
      page,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    return [];
  }
};

/** Gets posts from remote based on See More on mobile device */
export const getAllPosts = async ({
  filter = "tags:-[careers]",
  limit,
}: IPost) => {
  try {
    return await api.posts.browse({
      filter,
      formats: "html",
      include: "tags,authors",
      limit,
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
        formats: "html",
        include: "tags,authors",
      },
    );
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);

    return null;
  }
};

/** Get all post tags */
export const getTags = async (limit = "15") => {
  try {
    return await api.tags.browse({
      include: "count.posts",
      limit,
      order: "count.posts DESC",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    return [];
  }
};
