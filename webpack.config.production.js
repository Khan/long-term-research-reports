const path = require("path");

module.exports = {
  entry: {
    "early-math": "./src/early-math/index.js",
    cantor: "./src/cantor/index.js",
    "cantor-prototype": "./src/cantor/cantor.js",
  },
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
      {
        test: /\.coffee$/,
        use: [ 'coffee-loader' ]
      },
      {
        test: /\.gz$/,
        use: 'base64-loader'
      }
    ],
  },
  resolve: {
    alias: {
      webapp: path.resolve(__dirname, "../webapp/javascript"),
      "cantor-images": path.resolve(__dirname, "src/cantor/Cantor/Cantor.framer/images")
    },
    modules: [path.resolve(__dirname, "src/cantor/Cantor/Cantor.framer/modules"), "node_modules"]
  },
};
