var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    "./js/main.js",
    "./styles/application.scss",
  ],
  output: {
    path: __dirname + "/docs",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css", "sass"),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("application.css")
  ].concat(
    debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]),
};
