import { pathOr } from "ramda";

class Tag {
  public name: string;

  public slug: string;

  public url: string;

  public count: object;

  constructor(payload: any) {
    this.name = payload.name;
    this.slug = payload.slug;
    this.url = payload.url;
    this.count = payload.count;
  }

  static fromJson(data: any) {
    return new Tag({
      name: data.name,
      slug: data.slug ?? data.name,
      url: data.url ?? data.name,
      count: { posts: pathOr("", ["count", "posts"], data) },
    });
  }
}

export default Tag;
