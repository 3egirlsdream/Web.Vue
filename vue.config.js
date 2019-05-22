const fs = require("fs");
const glob = require("glob");
const postcssConfig = require(__dirname + "/postcss.config.js");
const lessConfig = require(__dirname + "/less.config.js");

let pages = {};
let entries;

try {
  entries = glob("src/pages/*/*/main.js", { sync: true });
} catch (err) {
  entries = [];
  throw err;
}

entries.forEach(file => {
  const fileSplit = file.split("/");
  const length = fileSplit.length;
  let pageHtml = fileSplit.slice(0, length - 1).join("/") + "/index.html";
  if (!fs.existsSync(pageHtml)) {
    pageHtml = "public/index.html";
  }

  const key = fileSplit
    .slice(2, length - 1)
    .join("_")
    .toLowerCase();
  const filename = fileSplit.slice(1, length - 1).join("/") + ".html";

  pages[key] = {
    entry: file,
    template: pageHtml,
    filename: filename
  };
});

module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "../../" : "/",
  assetsDir: "assets",
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: postcssConfig,
      less: lessConfig
    }
  },
  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],
  pages
};
