const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

//定义一些常用路径
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {

  entry: {
    Universe3D: './Universe3D/Universe3DApp.jsx',
  },

  output: {
    path: DIST_PATH,
    filename: '[name].bundle.js'
  },

  module: {
    rules: [{
      test: /\.jsx$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
        }
      }
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  },

  //插件的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Universe3D',
      template: 'template.html',
      favicon: './Universe3D/asset/img/myIcon.ico',
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};