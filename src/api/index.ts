const GhostContentAPI = require("@tryghost/content-api/cjs/content-api");
import 'dotenv-defaults/config';

// Create API instance with site credentials
export const ghostApi = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_API,
  key: process.env.NEXT_PUBLIC_GHOST_KEY,
  version: "v3.0",
});
