// HPACK CONFIG FILE
const path = require("path");

module.exports = {
  entries: {
    index: "./public_src/index/html/index.html",
  },

  output: {
    // filename: "[name].packs.html",
    path: path.resolve(__dirname, "public"),
  },
};
