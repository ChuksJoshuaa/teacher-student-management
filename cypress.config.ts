import { defineConfig } from "cypress";
// import path from "path";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  component: {
    port: 3000,
    devServer: {
      framework: "next",
      bundler: "webpack",
      // webpackConfig: {
      //   resolve: {
      //     alias: {
      //       "@components": path.resolve(__dirname, "./components"),
      //     },
      //   },
      // },
    },
    supportFile: false,
  },
});
