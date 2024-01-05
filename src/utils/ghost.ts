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
      "description": excerpt,
      "hiringOrganization": {
        "@type": "Organization",
        "logo": "https://www.forbole.com/icons/favicon-96x96.png",
        "name": "Forbole",
        "sameAs": "https://www.forbole.com/",
      },
      "industry": "Cryptocurrencies Validators and Blockchain Development",
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Hong Kong",
          "addressLocality": "Kennedy Town",
          "addressRegion": "Hong Kong Island",
          "postalCode": "-",
          "streetAddress":
            "7/F, Cheung Hing Industrial Building, 12P Smithfield",
        },
      },
      title,
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
