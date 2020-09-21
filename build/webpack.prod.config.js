const webpack = require('webpack');
const path = require('path');
const webpackBaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const TerserJSPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fs = require('fs');
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    publicPath: '/assets/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  optimization: {              // 优化项
    minimizer: [
      new TerserJSPlugin({     // 优化js
        cache: false,           // 是否缓存
        parallel: true,        // 是否并发打包
        sourceMap: true     // 源码映射 set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})    // css 的优化
    ],
    splitChunks: {              // 分割代码块，针对多入口


      cacheGroups: {            // 缓存组
        common: {               // 公共模块
          minSize: 0,           // 大于多少抽离
          maxSize: 244,
          minChunks: 2,         // 使用多少次以上抽离抽离
          chunks: 'initial'     // 从什么地方开始,刚开始
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          name: 'vendors',
          priority: 1,          // 增加权重, (先抽离第三方)
          test: /node_modules/, // 把此目录下的抽离
          minSize: 0,
          maxSize: 244,          // 大于多少抽离
          minChunks: 2,         // 使用多少次以上抽离抽离
          chunks: 'initial'     // 从什么地方开始,刚开始
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: '../index.html',
      template: './src/template/index.ejs',
      inject: false
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      //  可以是`server`，`static`或`disabled`。
      //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
      //  在“静态”模式下，会生成带有报告的单个HTML文件。
      //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
      analyzerMode: 'server',
      //  将在“服务器”模式下使用的主机启动HTTP服务器。
      analyzerHost: '127.0.0.1',
      //  将在“服务器”模式下使用的端口启动HTTP服务器。
      analyzerPort: 8888,
      //  路径捆绑，将在`static`模式下生成的报告文件。
      //  相对于捆绑输出目录。
      reportFilename: 'report.html',
      //  模块大小默认显示在报告中。
      //  应该是`stat`，`parsed`或者`gzip`中的一个。
      //  有关更多信息，请参见“定义”一节。
      defaultSizes: 'parsed',
      //  在默认浏览器中自动打开报告
      openAnalyzer: true,
      //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
      generateStatsFile: false,
      //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
      //  相对于捆绑输出目录。
      statsFilename: 'stats.json',
      //  stats.toJson（）方法的选项。
      //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
      //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    })
  ]
})