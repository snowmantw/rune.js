'use strict';
var path = require('path');
module.exports = {
  entry: './src/rune.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'rune.js',
    path: __dirname + '/dist',
    libraryTarget: 'commonjs'
  },
  resolve: { root: path.resolve('./src') },
  module: {
    loaders: [
      { include: path.resolve(__dirname, './src'),
        test: /\.js$/,
        loader: 'babel-loader' }
    ]
  }
};
