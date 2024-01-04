import { pathOr } from "ramda";

class Tag {
  public count: object;

  public name: string;

  public slug: string;

  public url: string;

  constructor(payload: any) {
    this.name = payload.name;
    this.slug = payload.slug;
    this.url = payload.url;
    this.count = payload.count;
  }

  static fromJson(data: any) {
    return new Tag({
      count: { posts: pathOr("", ["count", "posts"], data) },
      name: data.name,
      slug: data.slug ?? data.name,
      url: data.url ?? data.name,
    });
  }
}

export default Tag;
