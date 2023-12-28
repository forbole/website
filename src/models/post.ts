import moment from "moment";

import Author from "./author";
import Tag from "./tag";

class Post {
  public canonicalUrl: string;

  public author: string;

  public createdAt: string;

  public customExcerpt: string;

  public excerpt: string;

  public featureImage: string;

  public featureImageCaption: string;

  public featured: boolean;

  public html: string;

  public publishedAt: string;

  public slug: string;

  public title: string;

  public visibility: boolean;

  public primaryAuthor: Author;

  public tags: Tag[];

  public id: string;

  constructor(payload: any) {
    this.id = payload.id;
    this.canonicalUrl = payload.canonicalUrl;
    this.author = payload.primaryAuthor;
    this.createdAt = payload.createdAt;
    this.customExcerpt = payload.customExcerpt;
    this.excerpt = payload.excerpt;
    this.featureImage = payload.featureImage;
    this.featureImageCaption = payload.featureImageCaption;
    this.featured = payload.featured;
    this.html = payload.html;
    this.publishedAt = payload.publishedAt;
    this.slug = payload.slug;
    this.title = payload.title;
    this.visibility = payload.visibility;
    this.primaryAuthor = payload.primaryAuthor;
    this.tags = payload.tags;
  }

  static formatExcerpt(excerpt: string, limit: number) {
    const format = excerpt.slice(0, limit);
    const afterFormat = excerpt.length > limit ? "..." : "";

    return `${format}${afterFormat}`;
  }

  static formatTags(tags: any) {
    return tags.map((x: any) => Tag.fromJson(x));
  }

  static fromJson(data: any, options?: any) {
    const { excerptLimit = 250 } = options ?? {};

    return new Post({
      author: data,
      canonicalUrl: data.canonical_url,
      createdAt: moment(data.created_at).format("Do MMM YYYY, h:mm a"),
      customExcerpt: data.custom_excerpt,
      excerpt: this.formatExcerpt(data.excerpt, excerptLimit),
      featured: data.featured,
      featureImage: data.feature_image,
      featureImageCaption: data.feature_image_caption,
      html: data.html,
      id: data.uuid,
      primaryAuthor: Author.fromJson(data.primary_author),
      publishedAt: moment(data.published_at).format("Do MMM YYYY, h:mm a"),
      slug: data.slug,
      tags: this.formatTags(data.tags),
      title: data.title,
      visibility: data.visibility,
    });
  }
}

export default Post;
