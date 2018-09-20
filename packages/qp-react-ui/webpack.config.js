const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const webpack = require('webpack');
require('dotenv').config()

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'docs'),
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    port: 8000,
    historyApiFallback: true
  },
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'qp-react-ui': path.resolve(__dirname, 'src/index')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'docs/index.html')
    }),
    new CopyWebpackPlugin(['favicon.ico'])
  ]
}
