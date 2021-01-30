const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'electron-renderer',
    entry: ['react-hot-loader/patch', './src/renderer/App.tsx'],
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: true,
                    },
                },
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false,
        overlay: true,
        inline: true,
        watchOptions: {
            ignored: [path.resolve(__dirname, 'src', 'main/**.*')],
        },
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 8855,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.wasm', '.mjs', '.js', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    output: {
        path: path.resolve(__dirname, './out/renderer'),
        filename: 'bundle.js',
        publicPath: './',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    stats: {
        builtAt: true,
        chunks: true,
        modules: false,
        colors: true,
        hash: true,
        version: false,
        moduleTrace: false,
        chunkModules: false,
        nestedModules: false
    }
}