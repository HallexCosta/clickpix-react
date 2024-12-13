const rspack = require('@rspack/core')
const path = require('path')
const { merge } = require('webpack-merge')
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const rspackCommonConfig = require('./rspackCommonConfig')
const { getWebpackWatchOptions } = require('./getWebpackWatchOptions')

const PORT = Number.parseInt(process.env.PORT || '4459', 10)

// console.log('resolve', path.resolve(__dirname, '.'))
const cwd = process.cwd()

/**
 * @type {import('@rspack/cli').Configuration}
 */
console.log(path.resolve(__dirname, './src'))
module.exports = merge(rspackCommonConfig, {
  output: {
    hotUpdateMainFilename: 'hot-modules/[hash].hot-update.json', // Change as needed
    hotUpdateChunkFilename: 'hot-modules/[id].[hash].hot-update.js', // Change as needed
    path: '.dev'
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.join(cwd, './src/index.html'),
      publicPath: '/'
    }),
    new ReactRefreshPlugin()
  ],
  // resolve: {
  //   tsConfig: path.join(cwd, './tsconfig.app.json')
  // },
  devServer: {
    port: PORT,
    open: '/#/app',
    allowedHosts: 'all',
    historyApiFallback: {
      disableDotRule: true
    },
    static: path.join(cwd, '.dev'),
    devMiddleware: {
      writeToDisk: true
    },
    hot: true,
    compress: true,
    liveReload: false
  },
  watchOptions: getWebpackWatchOptions()
})
