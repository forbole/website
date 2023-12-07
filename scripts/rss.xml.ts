import fs from "node:fs";
import RSS from "rss";

import { getPosts, stakingGuidePrefix } from "@src/api/posts";

export const main = async () => {
  const site_url =
    process.env.NODE_ENV === "production"
      ? "https://www.forbole.com"
      : "http://localhost:3000";

  const posts = await getPosts({
    limit: 1000,
  });

  const feedOptions = {
    copyright: `All rights reserved Forbole`,
    description: "Welcome to Forbole blog posts!",
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/about/aboutus_01.jpg`,
    pubDate: new Date(),
    site_url,
    title: "Forbole blog posts",
  };

  const feed = new RSS(feedOptions);

  posts
    .filter((p: any) => !p.title.includes(stakingGuidePrefix))
    .forEach((post: any) => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${site_url}/blog/${post.slug}`,
        date: post.created_at,
      });
    });

  const result = feed.xml({ indent: true });

  fs.writeFileSync("./public/rss.xml", result);

  // eslint-disable-next-line no-console
  console.log("RSS feed generated in public/rss.xml");
};

main();
