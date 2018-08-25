const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('@babel/polyfill');

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'MusicAroundMe.',
    inject: false,
    template: './src/index.ejs',
    appMountId: 'root',
    mobile: true,
    meta: [],
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
            utils: path.resolve(__dirname, './src/utils'),
            constants: path.resolve(__dirname, './src/constants'),
            assets: path.resolve(__dirname, './src/assets'),
            queries: path.resolve(__dirname, './src/queries'),
            config: path.resolve(__dirname, './src/config'),
            subscriptions: path.resolve(__dirname, './src/subscriptions'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [htmlPlugin],
};
