/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");


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
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile:  path.join(__dirname, 'tsconfig.json') 
                    }
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
                test: /\.svg$/,
                loader: 'svg-inline-loader'
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
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../lib'),
        pathinfo: false,
        libraryTarget: 'umd',
        library: 'resizable-panes-react',
        clean: true,
    },

    plugins: [
        new WebpackNotifierPlugin({
            title: 'Webpack',
            emoji: true,
            alwaysNotify: true
        })
    ],
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react')
        },
        extensions: ['.tsx', '.ts', '.js'],
      },
    externals:nodeExternals()
}