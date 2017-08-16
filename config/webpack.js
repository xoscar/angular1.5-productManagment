const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => ({
  entry: {
    app: ['./app/app.ts', 'webpack/hot/dev-server'],
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /app\/.*\.js$/,
      loaders: ['babel'],
      exclude: [/app\/common\/vendor-js/, /node_modules/],
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass',
    }, {
      test: /\.html$/,
      loader: 'raw',
    }, {
      test: /\.(jpg|fig|png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=5000',
    }, {
      test: /.*\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }],
    postLoaders: [],
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: 'body',
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: process.cwd() + '/dist',
    publicPath: '',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: process.cwd() + './app',
    stats: 'minimal',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
