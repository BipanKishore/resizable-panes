// /* eslint-disable */
// const path = require('path')
// const HTMLWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
// var WebpackNotifierPlugin = require('webpack-notifier');

// const miniCssExtractPlugin = require('mini-css-extract-plugin')

// const autoprefixer = require('autoprefixer')

// module.exports = {
//     entry: {
//         index: './cypress/cy-env/index.tsx'
//     },
//     mode: 'development',
//     devtool:'source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: ['babel-loader'],
//                 exclude: /node_modules/,
//             },
//             {
//                 exclude: /node_modules/,
//                 test: /.js$/,
//                 use: ['babel-loader']
//             },
//             {
//                 test: /\.css$/i,
//                 use: [
//                     {
//                         loader: miniCssExtractPlugin.loader
//                     },'css-loader'
//                 ]
//             },
//             {
//                 test: /\.s[ac]ss$/i,
//                 use: [
//                     {
//                         loader: miniCssExtractPlugin.loader
//                     },
//                     "css-loader",
//                     {
//                         loader: 'postcss-loader',
//                         options: {
//                           postcssOptions: {
//                             plugins: [
//                               autoprefixer
//                             ]
//                           }
//                         }
//                       },
//                     "sass-loader",
//                 ],
//             },
//         ]
//     },

//     plugins: [
//         new miniCssExtractPlugin(),
//         new HTMLWebpackPlugin({
//             template: './cypress/cy-env/public/index.html',
//             title: 'Resizable Panes E2E'
//         }),
//         new WebpackNotifierPlugin({
//             title: 'Webpack',
//             emoji: true
//         })
//     ],
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     }
//     // externals:nodeExternals()
// }
/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier');
const autoprefixer = require('autoprefixer')
const miniCssExtractPlugin = require('mini-css-extract-plugin')


const purgePath = {
    src: path.join(__dirname, "src")
}

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
        index: './cypress/cy-env/index.tsx'
    },
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: "all"
        }
      },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader
                    },'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                          postcssOptions: {
                            plugins: [
                              autoprefixer
                            ]
                          }
                        }
                      },
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i, 
                type: 'asset/resource'
            },
            {
                test: /\.(md)$/i, 
                type: 'asset/source'
            },
            {
                test: /\.(svg)$/i, 
                type: 'asset/inline'
            }
        ]
    },
    output: {
        filename: '[name]-[contenthash].js',
        path: path.join(__dirname, '../../build/'),
        clean: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './cypress/cy-env/public/index.html',
            title: 'Resizable Panes E2E'
        }),
        new miniCssExtractPlugin(),
        new WebpackNotifierPlugin({
            title: 'Webpack',
            emoji: true
        }),
    //  new PurgeCSSPlugin({
    //     paths: glob.sync(`${purgePath.src}/**/*`, {nodir: true})
    // })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
}