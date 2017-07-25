const express = require("express");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    "react-hot-loader/patch",
    // activate HMR for React

    "webpack-dev-server/client?http://localhost:3100",
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    "webpack/hot/only-dev-server",
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    "./src/early-math/index.js",
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/",
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  resolve: {
    alias: {
      webapp: path.resolve(__dirname, "../webapp/javascript"),
    },
  },

  devServer: {
    host: "localhost",
    port: 3100,
    setup: function(app) {
      app.use(
        "/images/long-term-research/",
        express.static(path.join(__dirname, "public"))
      );
      app.use(
        "/fonts",
        express.static(path.join(__dirname, "../webapp/fonts"))
      );

    },

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  },
};
