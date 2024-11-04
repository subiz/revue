const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let cssFileName = "[name].css";

module.exports = {
  entry: { main: "./src/index.js" },
  devServer: {
    hot: false,
    liveReload: false,
    // public: 'localhost',
    port: 8080,
    headers: { "Access-Control-Allow-Origin": "*" },
    host: "0.0.0.0",
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: cssFileName,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./index.html",
      inject: "body",
      chunks: ["main"],
    }),

    // allow all file can access process.env
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',
          {
            loader: "css-loader", // Translates CSS into CommonJS
            options: { esModule: false },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',
          {
            loader: "css-loader", // Translates CSS into CommonJS
            options: { esModule: false },
          },
          "sass-loader",
        ],
      },
      {
        // for loading svgv
        test: /\.svgv$/i,
        use: ["babel-loader", "vue-svg-loader"],
      },
      {
        test: /\.(woff(2)?|eot|ttf|svg|png|jpe?g|gif|ogg|mp3|csv|xlsx)$/i,
        use: [
          {
            loader: "file-loader",
            options: { esModule: false }, // so we dont have to use .default
          },
        ],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
};
