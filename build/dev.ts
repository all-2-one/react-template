import { merge } from 'webpack-merge';
import * as webpack from 'webpack';
import commonConfig, { mergeConfig } from './base';

module.exports = merge(commonConfig, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: JSON.stringify({
          NODE_ENV: "development",
          ...mergeConfig('dev')
        })
      }
    } as any)
  ]
});