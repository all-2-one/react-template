import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const prod: webpack.Configuration = {
    // env: {
    //     API_URL: 'http://prod.baidu.com'
    // },
    devServer: {
        proxy: {}
    },
    plugins: [
        // 打包结果分析
        new webpack.BannerPlugin({
            banner: '版权'
        }),
        new BundleAnalyzerPlugin(),
    ]
}

export default prod
