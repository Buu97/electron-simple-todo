const execa = require('execa');
const path = require('path');
const webpack = require('webpack');

const compiler = webpack({
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    entry: './src/main/index.ts',
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, './out'),
        filename: '[name].js',
    }
});

let currentHash;
let child;

const killProcess = () => {
    if (child) {
        child.kill();
        child = null;
    }
}

compiler.watch({
    aggregateTimeout: 500,
    poll: null,
    ignored: [
        '**/node_modules',
        '**/src/renderer',
        '**/src/public',
        '**/out'
    ]
}, (error, stats) => {
    killProcess();
    if (stats.hash != currentHash) {
        console.log(stats.toString({
            builtAt: true,
            chunks: true,
            modules: true,
            colors: true,
            hash: true,
            version: false,
            moduleTrace: false,
            chunkModules: false
        }));
        child = execa(
            'electron',
            ['.'],
            {
                detached: true,
                cwd: __dirname
            }
        );
    }
});

process.on('SIGINT', killProcess);
process.on('SIGTERM', killProcess);
process.on('exit', killProcess);