const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./public_src/index/js/index.js",
  },
  output: {
    filename: "[name].packs.js",
    path: path.resolve(__dirname, "public", "packs"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [MiniCssExtractPlugin.loader, "css-loader"],
  //     },
  //   ],
  // },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "[name].packs.css",
  //   }),
  // ],
};
