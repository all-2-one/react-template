import * as webpack from 'webpack'
import merge from 'webpack-merge'

import baseConfig, { getEnv } from "./config/base"

import development from "./config/dev"
import production from "./config/prod"
import test from "./config/test"

const configMap: Record<string, webpack.Configuration> = {
    development,
    production,
    test,
}

interface ENV {
    WEBPACK_SERVE?: boolean
    WEBPACK_BUILD?: boolean
    test?: boolean
    preTest?: boolean
    production?: boolean
}

export default (env: ENV) => {
    const arr = ['test', 'development', 'production']

    const envMode = arr.find(item => env[item as keyof ENV]) || 'development'
    const mode = env.WEBPACK_SERVE ? 'development' : 'production'
    const currentConfig = configMap[envMode]

    const currentConfigEnv = getEnv(envMode)

    const webpackConfig = merge(
        baseConfig,
        currentConfig,
        {
            mode,
            plugins: [
                new webpack.EnvironmentPlugin({
                    NODE_ENV: mode,
                    ...currentConfigEnv
                })
            ]
        }
    )

    return webpackConfig
}