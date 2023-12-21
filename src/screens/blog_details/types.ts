type Author = {
  name: string;
  profileImage: string;
  slug: string;
};

type Tag = {
  name: string;
  slug: string;
};

export type PostDetail = {
  excerpt: string;
  featureImage: string;
  featureImageCaption: string;
  html: string;
  primaryAuthor: Author;
  publishedAt: string;
  slug: string;
  tags: Tag[];
  title: string;
};
