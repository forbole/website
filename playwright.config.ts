import { defineConfig } from "@playwright/test";

const grepInvert: RegExp[] = [];

if (process.env.E2E_MANUAL !== "true") {
  grepInvert.push(/@manual/);
}

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  projects: [
    {
      name: "Desktop",
      use: {
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: "Mobile",
      use: {
        viewport: { width: 375, height: 812 },
      },
      testIgnore: [/backend.spec.ts/],
    },
  ],
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  testDir: "./e2e",
  grepInvert,
});
