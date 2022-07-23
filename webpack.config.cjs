const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const fs = require('fs')

// 获取多页面路径
const pagePaths = ['calc']

// 获取多页面路径
// function getPagePaths() {
//   try {
//     const files = fs.readdirSync('./src/pages')
//     pagePaths.push(...files)
//   } catch (err) {
//     console.error(err)
//   }
// }

// 获取多页面的入口信息
function getPagesEntryInfo(paths = []) {
  return paths.reduce((res, path) => {
    res[path] = `./src/pages/${path}/index.js`
    return res
  }, {})
}

// 获取多页面的html-webpack-plugins配置
function getPagesHtmlWebpackPluginInfo(paths = []) {
  return paths.map(
    (path) =>
      new HtmlWebpackPlugin({
        template: `./src/pages/${path}/index.html`,
        chunks: [path],
        filename: `${path}.html`,
      })
  )
}

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    ...getPagesEntryInfo(pagePaths),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    ...getPagesHtmlWebpackPluginInfo(pagePaths),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
