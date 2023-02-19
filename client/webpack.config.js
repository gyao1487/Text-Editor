const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),

      new WebpackPwaManifest({
        name: "JATE",
        short_name: "JATE",
        description: "Just Another Text Editor, PWA text-editor application",
        display: "standalone",
        background_color: "#6C5B7B",
        theme_color: "#C06C84",
        start_url: "/",
        public_path: "/",
        inject: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: "512x512",
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presents: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
