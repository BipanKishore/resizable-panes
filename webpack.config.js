/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            '@babel/preset-env', '@babel/preset-react'
        ]
    }
}

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    mode: 'development',
    devtool:'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /.js$/,
                use: babelLoader
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    }, 'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({
            title: 'Webpack',
            emoji: true
        })
    ],
    resolve: {
        // alias: {
        //     react: path.resolve('./node_modules/react')
        // },
        extensions: ['.tsx', '.ts', '.js'],
      },
    // externals:nodeExternals()
}
