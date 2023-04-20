const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const { dev } = env;
  let mode = "production";

  if (dev) mode = "development";

  return {
    mode,
    entry: "./src/index",
    devServer: {
      static: "./dist",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new CopyPlugin({
        patterns: [{ from: "src/static", to: "static" }],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.m?(ts|js)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
  };
};
