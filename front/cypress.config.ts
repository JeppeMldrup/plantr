import { defineConfig } from "cypress";
import 'dotenv/config';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    token: process.env.TEST_TOKEN,
    callback: process.env.TEST_CALLBACK,
    csrf: process.env.TEST_CSRF
  }
});
