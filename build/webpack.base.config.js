const path = require('path'); // node.js 中的基本包，用于处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')




const devMode = process.env.NODE_ENV !== 'production';
 
module.exports = {
  entry: {
    main: './src/main',
    vendors: './src/vendors'
  },
  output: {

    path: path.join(__dirname, '../dist/assets'), // 输出文件所在目录
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,   // css 处理
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr:devMode
            },
          },
          'css-loader', 
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        
        }         
      },
      {
        test: /\.less$/,   // less 处理
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr:devMode
            },
          },  // 这样相当于抽离成一个css文件， 如果希望抽离成分别不同的css, 需要再引入MiniCssExtractPlugin，再配置
          'css-loader', // css-loader 用来解析@import这种语法
          'less-loader',
          'postcss-loader'          
        ],
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,          // 小于200k变成base64
          }
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
  // Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
  new VueLoaderPlugin(),
  new CopyPlugin({
    patterns: [
      {
        from: './src/resource',
        to: './resource'
      }, {
        from: './src/images',
        to: './images'
      }, {
        from: './src/api.js',
        to: './'
      }
    ],
  }),
  // new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  // new BundleAnalyzerPlugin()

  ]
}