/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");  
const isProduction = process.env.NODE_ENV === "production";
const environment = isProduction ? "production" : "development"
console.log(`Environment: ${environment}`)
 
const babelOptions = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "last 2 versions, ie 11",
        modules: false,
      },
    ],
    "@babel/preset-react",
  ],
};
const config = {
  mode: environment,
  context: path.resolve(__dirname, "./src"),
  entry: "./index.ts",

  cache: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
 
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],        
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".json"],
  },
  optimization: {
    minimize: isProduction ? true : false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [  
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: true,
      title: "Phaser Webpack Template",
      appMountId: "app",
      filename: "index.html",
      inlineSource: ".(js|css)$",
      minify: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "assets",
          to: "assets",
        },
      ],
    }),
    new DefinePlugin({
      ENVIRONMENT: JSON.stringify(environment), 
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: false,
    port: 8080,
    watchFiles: ["./*"],
    liveReload: true,
  },
  devtool: "source-map"
};
module.exports = config;
