'use strict';
var path = require('path');
module.exports = {
  entry: './edda-demo.js',
  devtool: 'inline-source-map',
  output: { filename: 'edda-demo.dist.js' },
  resolve: { root: path.resolve(__dirname, '../') },
  module: {
    loaders: [
      { include: path.resolve(__dirname, './'),
        test: /\.js$/,
        loader: 'babel-loader?experimental&optional=selfContained'
      }
    ]
  }
};
