import { getLanguageFromLocale } from "./i18next";

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

// https://schema.org/TechArticle

export const getBlogPostSchema = (
  isGuide: boolean,
  post: PostDetail,
  locale: string | undefined,
) => {
  const {
    excerpt,
    featureImage,
    primaryAuthor: author,
    publishedAt,
    tags,
    title,
  } = post;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    ...(excerpt && { abstract: excerpt }),
    "headline": title,
    "image": [featureImage],
    "inLanguage": getLanguageFromLocale(locale),
    "datePublished": publishedAt,
    "url": `https://www.forbole.com/${isGuide ? "staking" : "blog"}/${
      post.slug
    }`,
    ...(!!tags?.length && {
      keywords: tags
        .map((x: { name: any }) => x.name ?? "")
        .filter(Boolean)
        .join(", "),
    }),
    "author": [
      {
        "@type": "Person",
        "alternateName": author.slug,
        "image": author.profileImage,
        "name": author.name,
        "url": `https://www.forbole.com/author/${author.slug}`,
      },
    ],
  });
};
