module.exports = {
  additionalPaths: async () => {
    if (!process.env.GHOST_PRIVATE_KEY || !process.env.NEXT_PUBLIC_GHOST_API)
      return [];

    const GhostAdminAPI = require("@tryghost/admin-api");

    const ghostAdminApi = new GhostAdminAPI({
      key: process.env.GHOST_PRIVATE_KEY,
      url: process.env.NEXT_PUBLIC_GHOST_API,
      version: "v3.0",
    });

    // The pagination will not be necessary for a while
    const getPosts = () =>
      ghostAdminApi.posts.browse({
        fields: "slug",
        filter: "status:published",
        limit: 1000,
        page: 1,
      });

    const getTags = () =>
      ghostAdminApi.tags.browse({
        fields: "slug",
        limit: 1000,
      });

    const [tags, posts] = await Promise.all([getTags(), getPosts()]);

    return posts
      .map((p) => {
        if (!p.slug) return null;

        // This is also defined in `src/api/posts/index.ts`
        if (p.slug.startsWith("how-to-stake")) return `/staking/${p.slug}`;

        return `/blog/${p.slug}`;
      })
      .concat(tags.map((t) => `/tag/${t.slug}`))
      .filter(Boolean)
      .map((loc) => ({
        loc,
      }));
  },
  autoLastmod: false,
  changefreq: null,
  generateRobotsTxt: false,
  priority: null,
  siteUrl: "https://www.forbole.com",
};
