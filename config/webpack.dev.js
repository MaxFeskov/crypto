const webpack = require('webpack');
const { merge } = require('webpack-merge');
const paths = require('./paths.js');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',

            options: {
              sourceMap: true,
              additionalData: '@import "/src/styles/main.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
