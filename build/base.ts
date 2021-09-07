import * as path from 'path';
import 'webpack-dev-server';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import fs from 'fs';

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, '..', 'src', 'main.tsx'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    chunkFilename: '[id].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', ".js", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: '网页',
      template: path.resolve(__dirname, '..', 'public', 'index.html')
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        defaultVendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  //@ts-ignore
  devServer: {
    static: './dist'
  }
};

export default config;

const getConfig = (fileName: string) => {
  const content = fs.readFileSync(path.resolve(__dirname, '..', fileName), 'utf-8');
  return content.split('\n').filter(item => item).reduce((obj, str) => {
    let [key, value] = str.split('=');
    if (!key) {
      return obj;
    }

    value = value.trimEnd();
    return ({
      ...obj,
      [key]: value
    });
  }, {});
};

export const mergeConfig = (mode: string = 'dev') => (
  ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`].reduce((obj, filename) => {
    const config = getConfig(filename);
    return {
      ...obj,
      ...config
    };
  }, {})
);