const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const metaParameters = require('./utils/metaParameters');

require('@babel/polyfill');

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'MusicAroundMe.',
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
    mode: 'production',
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
            reducers: path.resolve(__dirname, './src/reducers'),
            containers: path.resolve(__dirname, './src/containers'),
            actions: path.resolve(__dirname, './src/actions'),
            utils: path.resolve(__dirname, './src/utils'),
            constants: path.resolve(__dirname, './src/constants'),
            assets: path.resolve(__dirname, './src/assets'),
            services: path.resolve(__dirname, './src/services'),
            config: path.resolve(__dirname, './src/config'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [new FaviconsWebpackPlugin('./src/assets/favicon.svg'), htmlPlugin],
};
