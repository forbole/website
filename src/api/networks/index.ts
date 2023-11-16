import { ghostApi as api } from "../index";
import type { IPost } from "./interface";

/** Gets posts from remote */
export const getNetworkPosts = async ({
  limit = 11,
  page = 1,
  // filter = "tag:-[hash-zhs,hash-zht]",
  filter = "tags:[staking]",
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
