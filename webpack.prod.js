/**
 * Created by xin.zhang on 17/5/20.
 */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
    return Merge(CommonConfig, {
        entry: {
            main: "./src/index"
        },
        output: {
            // options related to how webpack emits results

            path: path.resolve(__dirname, "dist"), // string
            // the target directory for all output files
            // must be an absolute path (use the Node.js path module)

            //filename: '[name].[chunkhash].js', // string
            filename: '[name].js', // string
            // the filename template for entry chunks

            /* Advanced output configuration (click to show) */
        },
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')({
                                            browsers: ['last 5 versions', 'iOS 7']
                                        })
                                    ]
                                }
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'compact'//输出css的格式两个常用选项:compact({}行), compressed(压缩一行)
                            }

                        }
                        ]
                    })
                }
            ]

        },
        plugins: [
            new ExtractTextPlugin('styles.css'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            //new webpack.optimize.UglifyJsPlugin(),
            new ManifestPlugin(),
            new CleanWebpackPlugin(
                ['dist/main.*.js', 'dist/manifest.*.js', 'dist/vendor.*.js'],　 //匹配删除的文件
                {
                    root: __dirname,       　　　　　　　　　　//根目录
                    verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                    dry: false        　　　　　　　　　　//启用删除文件
                }
            )
        ]
    })
}