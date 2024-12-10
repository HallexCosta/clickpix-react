const rspack = require('@rspack/core')
const path = require('node:path')
const { merge } = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const rspackCommonConfig = require('./rspackCommonConfig')

const cwd = process.cwd()

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = merge(rspackCommonConfig, {
  output: {
    path: path.join(cwd, 'dist'),
    filename: 'openix-sdk.js',
    uniqueName: 'openix-sdk.js'
  },
  // externals: {
  //   '$openpixSDK': '$openpixSDK'
  // },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new rspack.HtmlRspackPlugin({
      template: path.join(cwd, './src/index.html'),
      filename: 'index.html'
    })
  ],
  optimization: {
    minimize: true
  }
})
