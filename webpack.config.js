const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
};
