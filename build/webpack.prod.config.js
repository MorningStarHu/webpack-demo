const webpack = require('webpack');
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HTMLWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
		publicPath: '/assets/',
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].chunk.js'
    }, 
    // optimization: {              // 优化项
    //     minimizer: [
    //       new UglifyJsPlugin({     // 优化js
    //         cache: true,           // 是否缓存
    //         parallel: true,        // 是否并发打包
    //         sourceMap: true     // 源码映射 set to true if you want JS source maps
    //       }),
    //       new OptimizeCSSAssetsPlugin({})    // css 的优化
    //   ],
    //   splitChunks: {              // 分割代码块，针对多入口
    //     cacheGroups: {            // 缓存组
    //       common: {               // 公共模块
    //         minSize: 0,           // 大于多少抽离
    //         minChunks: 2,         // 使用多少次以上抽离抽离
    //         chunks: 'initial'     // 从什么地方开始,刚开始
    //       },
    //       vendor: {
    //         name: 'vendors',
    //         priority: 1,          // 增加权重, (先抽离第三方)
    //         test: /node_modules/, // 把此目录下的抽离
    //         minSize: 0,           // 大于多少抽离
    //         minChunks: 2,         // 使用多少次以上抽离抽离
    //         chunks: 'initial'     // 从什么地方开始,刚开始
    //       }
    //     }
    //   },
    // },
  plugins: [
    new HTMLWebpackPlugin({
      filename: '../index.html',
      template: './src/template/index.ejs',
      inject: false
  }),
    new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
    }),
    new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
    })
  ]
})