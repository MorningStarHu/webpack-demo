const webpack = require('webpack');
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HTMLWebpackPlugin = require('html-webpack-plugin');


const { merge } = require('webpack-merge');
const fs = require('fs');


module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: '#source-map', // devtool由webpack直接提高，将打包后的文件中的错误映射到最初对应的文件中，便于调试
  output: {
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
    plugins: [
        // new MiniCssExtractPlugin({
        //   // Options similar to the same options in webpackOptions.output
        //   // both options are optional
        //   filename: '[name].css',
        // }),
        new HTMLWebpackPlugin({
          filename: '../index.html',
          template: './src/template/index.ejs',
          inject: false
      }),

      ],
})