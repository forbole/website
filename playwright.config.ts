import { defineConfig } from "@playwright/test";

const grepInvert: RegExp[] = [];

if (process.env.E2E_MANUAL !== "true") {
  grepInvert.push(/@manual/);
}

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  globalTimeout: 600000,
  grepInvert,
  projects: [
    {
      name: "Desktop",
      use: {
        viewport: { height: 768, width: 1024 },
      },
    },
    {
      name: "Mobile",
      testIgnore: [/backend.spec.ts/],
      use: {
        viewport: { height: 812, width: 375 },
      },
    },
  ],
  testDir: "./e2e",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
});
