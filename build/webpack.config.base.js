var path = require('path')
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin')
var util = require('./util')
var WebpackDevServer = require("webpack-dev-server")

var entries = util.getEntries('./src/page/*.js')
entries['index'] = './src/app.js'
var chunks = Object.keys(entries)

// 判断是否是在当前生产环境
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: entries,
  output: {
    path: "./dist",
    filename: "[name].js",
    publicpath: "/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery', // 使jquery变成全局变量,不用在自己文件require('jquery')了
        jQuery: 'jquery',
        React: 'react',
        ReactDOM: 'react-dom'
    }),
    // 类库统一打包生成一个文件
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: isProduction ? 'js/vendor.[hash:8].js':'js/vendor.js',
        minChunks: 3 // 提取使用3次以上的模块，打包到vendor里
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin(isProduction ? 'css/[name].[hash:8].css':'css/[name].css')
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlwebpackPlugin({
    //   filename: 'index.html',
    //   template: './src/index.html',
    //   inject: true
    // })
  ],
  devtool: '#eval-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
            presets: ["es2015", "stage-0", "react"]
        },
        exclude: /node_modules/
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'url?limit=8192&name=img/[hash:8].[ext]'
      },
      {
          //文件加载器，处理文件静态资源
          test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file?limit=10000&name=fonts/[hash:8].[ext]'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  }
}

// 生成HTML文件
chunks.forEach(function(pathname) {
    if (pathname == 'vendor') {
        return;
    }
    var conf = {
        title: 'My App',
        filename: pathname + '.html',
        template: './src/index.html',
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    };
    if (pathname in module.exports.entry) {
        conf.chunks = ['vendor', pathname];
        conf.hash = false;
    }
    module.exports.plugins.push(new HtmlwebpackPlugin(conf));
});
