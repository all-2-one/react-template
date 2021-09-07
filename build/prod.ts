import { merge } from 'webpack-merge';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import commonConfig, { mergeConfig } from './base';

interface Env {
  analyze: string;
}

const prodEnvConfig = mergeConfig('prod');

module.exports = (env: Env) => {
  return merge(commonConfig, {
    mode: 'production',
    optimization: {
      minimize: true
    },
    plugins: [
      ...(env.analyze === '1' ? [new BundleAnalyzerPlugin()] : []),
      new webpack.DefinePlugin({
        process: {
          env: JSON.stringify({
            NODE_ENV: "production",
            ...prodEnvConfig
          })
        }
      } as any)
    ]
  });
};