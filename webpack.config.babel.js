var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var ASSETS_PATH = path.resolve(APP_PATH,'static');
process.env.BABEL_ENV = TARGET;

var COMMON_DEPLOY = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                include: APP_PATH,
                exclude: ASSETS_PATH,
                query: {
                    presets: ['react','es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style','css','sass?config=trace'],
                include: ASSETS_PATH
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json','.scss', '.jsx']
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(COMMON_DEPLOY, {
        devtool: 'eval-source-map',
        devServer: {
            hot: true,
            historyApiFallback: true,
            inline: true,
            progress: true,
            colors: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: "Diversity's Desert"
            })
        ]
    })
}