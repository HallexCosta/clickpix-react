const NodePolyfill = require('@rspack/plugin-node-polyfill');
const { DotenvPlugin } = require('rspack-plugin-dotenv');

const cwd = process.cwd();

const isProduction = process.env.NODE_ENV === 'production';

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: cwd,
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          rspackExperiments: {
            relay: true,
          },
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                development: !isProduction,
                refresh: !isProduction,
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp3|pdf|csv|xlsx|ttf|woff(2)?)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new NodePolyfill(),
    new DotenvPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
    fallback: {
      fs: false,
    },
  },
  externals: {
    'node-html-to-image': 'node-html-to-image',
  },
  stats: {
    warnings: false,
  },
};
