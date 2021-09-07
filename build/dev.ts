import { merge } from 'webpack-merge';
import * as webpack from 'webpack';
import commonConfig, { mergeConfig } from './base';

module.exports = merge(commonConfig, {
  mode: 'development',
  // @ts-ignore
  devServer: {
    proxy: {
      "/api": "http://localhost:4000"
    }
  },
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