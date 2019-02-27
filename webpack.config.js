const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.join(__dirname, "dist");
const APP_DIR = path.join(__dirname, "src");
const VENDOR_LIBS = [
    "react",
    "react-dom",
    "react-router-dom"
]

const config = {
    // entry: APP_DIR + "/index.js",
    mode: "production",
    devtool: false,
    entry: {
        bundle: APP_DIR + "/index.js",
        vendor: VENDOR_LIBS,
    },
    output: {
        // path: BUILD_DIR,
        // filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js",
        chunkFilename: '[name].[hash].js',
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: APP_DIR,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ["file-loader"],
            },
        ]
    },
    devServer: {
        contentBase: BUILD_DIR,
        compress: true,
        port: 1732,
        disableHostCheck: false,
        open: true,
        hot: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                  name: 'commons',
                  chunks: 'initial',
                  minChunks: 6
                }
            }
        }
    }
}

module.exports = config;