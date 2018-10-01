const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const metaParameters = require('./utils/metaParameters');

require('@babel/polyfill');

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'MusicAroundMe.io',
    inject: false,
    template: './src/index.ejs',
    appMountId: 'root',
    mobile: true,
    meta: [
        metaParameters.description,
        metaParameters.keyWords,
        metaParameters.applicationName,
        metaParameters.openGraph.description,
        metaParameters.openGraph.image,
        metaParameters.openGraph.title,
        metaParameters.openGraph.type,
    ],
    scripts: [],
});

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            containers: path.resolve(__dirname, './src/containers'),
            actions: path.resolve(__dirname, './src/actions'),
            reducers: path.resolve(__dirname, './src/reducers'),
            utils: path.resolve(__dirname, './src/utils'),
            constants: path.resolve(__dirname, './src/constants'),
            services: path.resolve(__dirname, './src/services'),
            queries: path.resolve(__dirname, './src/queries'),
            config: path.resolve(__dirname, './src/config'),
        },
    },
    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        port: 9001,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
    },
    plugins: [htmlPlugin],
};
