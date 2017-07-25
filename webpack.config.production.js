const path = require("path");

module.exports = {
  entry: "./src/early-math/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "../webapp/javascript")],
        exclude: /node_modules/,
        options: {
          presets: [["es2015", { modules: false }], "stage-2", "react", "flow"],
        },
      },
    ],
  },
  resolve: {
    alias: {
      webapp: path.resolve(__dirname, "../webapp/javascript"),
    },
  },
};
