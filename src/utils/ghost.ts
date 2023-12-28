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
    primaryAuthor,
    publishedAt,
    slug,
    tags,
    title,
  } = post;

  const author = {
    "@type": "Person",
    "alternateName": primaryAuthor.slug,
    "image": primaryAuthor.profileImage,
    "name": primaryAuthor.name,
    "url": `https://www.forbole.com/author/${primaryAuthor.slug}`,
  };

  const keyworkdsObj = !!tags?.length && {
    keywords: tags
      .map((x: { name: any }) => x.name ?? "")
      .filter(Boolean)
      .join(", "),
  };

  const common = {
    "@context": "https://schema.org",
    "image": featureImage,
    "name": title,
    "url": `https://www.forbole.com/${isGuide ? "staking" : "blog"}/${
      post.slug
    }`,
  };

  if (slug?.includes("-opening")) {
    return JSON.stringify({
      ...common,
      "@type": "JobPosting",
      "datePosted": publishedAt,
      "industry": "Cryptocurrencies Validators and Blockchain Development",
    });
  }

  return JSON.stringify({
    ...common,
    ...keyworkdsObj,
    "@type": "TechArticle",
    "headline": title,
    ...(excerpt && { abstract: excerpt }),
    author,
    "datePublished": publishedAt,
    "inLanguage": getLanguageFromLocale(locale),
  });
};
