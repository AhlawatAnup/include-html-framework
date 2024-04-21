// HPACK CONFIG FILE
const path = require("path");

module.exports = {
  entries: {
    dashboard: "./public_src/dashboard/html/dashboard.html",
    index: "./public_src/index/html/index.html",
  },

  output: {
    path: path.resolve(__dirname, "public"),
  },
};
