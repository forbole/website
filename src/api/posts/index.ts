import { ghostApi as api } from "../index";
import type { IPost } from "./interface";

export const stakingGuidePrefix = "how-to-stake";

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
