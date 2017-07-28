const path = require("path");

module.exports = {
  entry: {"early-math": "./src/early-math/report.js", cantor: "./src/cantor/report.js"},
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        options: {
          presets: [["es2015", { modules: false }], "stage-2", "react", "flow"],
          plugins: ["react-hot-loader/babel"],
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "../webapp/javascript")],
        exclude: /node_modules/,
        options: {
          presets: [["es2015", { modules: false }], "stage-2", "react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  resolve: {
    alias: {
      webapp: path.resolve(__dirname, "../webapp/javascript"),
    },
  },
};
