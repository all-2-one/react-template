import * as webpack from 'webpack'

const test: webpack.Configuration = {
    // env: {
    //     API_URL: 'http://test.baidu.com'
    // },
    devServer: {
        proxy: {}
    }
}

export default test
