import "dotenv-defaults/config";

const GhostContentAPI = require("@tryghost/content-api/cjs/content-api");

// Create API instance with site credentials
export const ghostApi = new GhostContentAPI({
  key: process.env.NEXT_PUBLIC_GHOST_KEY,
  url: process.env.NEXT_PUBLIC_GHOST_API,
  version: "v3.0",
});
