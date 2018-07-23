var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//定义一些常用路径
var ROOT_PATH = path.resolve(__dirname);
var SASS_PATH = path.resolve(ROOT_PATH, 'sass');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var DIST_PATH = path.resolve(__dirname, 'dist');

// webpack.config.js
module.exports = {
    entry: [
        './src/test.js'
    ],  
    output: {
        path: DIST_PATH,
        filename: 'bunld.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
            ]
        }]
    },

    //插件的配置
    plugins: [
      new HtmlWebpackPlugin({
          title: 'My First react app'
      }),
      new CleanWebpackPlugin(['dist']),
    ],
};