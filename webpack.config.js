const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
};

module.exports = config;