const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: [path.join(__dirname, "demo"), path.join(__dirname, "dist")],
    compress: true,
    port: 8080,
    stats: "errors-only",
    historyApiFallback: true, // Handy for developing SPA's
    overlay: {
      errors: true,
    },
  },
});
