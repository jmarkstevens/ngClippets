const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const configJson = require('./webpack.config.json');

module.exports = env => {
  const noMinimize = env.noMinimize;
  var plugins = [];

  plugins.push(new ExtractTextPlugin({filename: 'app.css', allChunks: true}));
  plugins.push(new webpack.optimize.CommonsChunkPlugin({names: ['vendor']}));
  if (noMinimize) {
    plugins.push(new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('development')}}));
  } else {
    plugins.push(new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}));
    plugins.push(new webpack.optimize.UglifyJsPlugin({include: /lib\.js/, minimize: true}));
  }
  plugins.push(new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, './ui-src', {}));
  plugins.push(new HtmlWebpackPlugin({template: 'index.html'}));

  const ROOT_PATH = path.resolve(__dirname);
  const SRC_PATH = path.resolve(ROOT_PATH, './ui-src');
  const DIST_PATH = path.resolve(ROOT_PATH, './ui-dist');

  return {
    context: SRC_PATH,
    entry: {
      app: './app.js',
      lib: configJson.lib,
      vendor: './vendor.js'
    },

    output: {
      path: DIST_PATH,
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {loader: 'awesome-typescript-loader', options: {configFileName: './ui-src/tsconfig.json'}},
            'angular2-template-loader'
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            plugins: ['transform-decorators-legacy'],
            presets: ['angular2', 'es2015', 'stage-0']
          },
          exclude: /(node_modules)/
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(__dirname, 'ui-src/components'), path.resolve(__dirname, 'ui-src/common')],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.css$/,
          include: [path.resolve(__dirname, 'ui-src/components'), path.resolve(__dirname, 'ui-src/common')],
          loader: 'raw-loader'
        },
        {
          test: /\.(png|jpg|ico|gif)$/,
          loader: 'file-loader?name=img/[name].[ext]'
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    },
    plugins,
    resolve: {
      extensions: ['.js', '.ts'],
      modules: ['node_modules']
    },
    resolveLoader: {
      modules: ['node_modules']
    }
  };
};
