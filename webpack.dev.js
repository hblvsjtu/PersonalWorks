const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  //开启dev source map
  devtool: 'inline-source-map',

  //开启webpack dev server
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // fallback to style-loader in development
        // style-loadercreates style nodes from JS strings
        "style-loader", {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            // modules: true,
            localIdentName: '[local]_[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js' // 这个得在项目根目录创建此文件
            }
          }
        },
        "sass-loader" // compiles Sass to CSS
      ]
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
      ]
    }, ]
  },

  //插件的配置
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})