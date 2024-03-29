import * as path from 'path'
import * as fs from 'fs'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ESLintPlugin from 'eslint-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import TerserPlugin from 'terser-webpack-plugin'

import 'webpack-dev-server'

const baseConfig: webpack.Configuration = {
    entry: {
        index: './src/main.tsx',
        // login: './src/login.ts'
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        // 如果文件内容不改, 生成文件名不变
        filename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true,
        chunkFilename: '[id].[contenthash].js',
    },
    devServer: {
        static: './dist',
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                // 从右往左一次调用
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    // path.resolve(__dirname, './loader/style-loader/index.js'),
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader?cacheDirectory',
                    'ts-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        // 将高频使用的文件名后缀放在前面, 提前命中
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, '..', 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/**/*',
                    to: "[name][ext]",
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
        new ESLintPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',
        usedExports: true,
        sideEffects: true,
        minimizer: [
            new TerserPlugin({}),
            new CssMinimizerPlugin()
        ],
        minimize: true,
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                common: {
                    name: 'commons',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                }
            },
        },
    }
}

export default baseConfig

export const getEnv = (mode: string) => {
    const arr = ['.env', `.env.${mode}`, `.env.${mode}.local`]
    const envMap: Record<string, string | number> = {}

    arr.forEach(filename => {
        try {
            const fileContent = fs.readFileSync(path.resolve(__dirname, '..', filename), { encoding: 'utf-8' })
            if (!fileContent) {
                return
            }
            fileContent.split('\n').forEach(item => {
                if (!item || !item.includes('=') || item.startsWith('#')) {
                    return
                }
                const [key, _value] = item.split('=')
                const value = _value.trim()
                envMap[key.trim()] = /\d/.test(value) ? Number(value) : value
            })
        } catch (e) {
            // keep
        }
    })

    return envMap
}