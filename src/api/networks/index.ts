import { ghostApi as api } from "../index";
import type { IPost } from "./interface";

/** Gets posts from remote */
export const getNetworkPosts = async ({
  // filter = "tag:-[hash-zhs,hash-zht]",
  filter = "tags:[staking]",
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
