export const removeInternalTags = (tags: any[]) =>
  tags.filter((x) => x.visibility === "public");
