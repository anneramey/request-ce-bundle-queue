/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]
};
