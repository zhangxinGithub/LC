/**
 * Created by xin.zhang on 17/5/20.
 */
const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const hostconfig = require('../config/hostconfig');

module.exports = function (env) {
    return Merge(CommonConfig, {
        context: path.resolve(__dirname, 'src'),
        resolve: {
            extensions: ['.js', '.jsx', 'less', 'css', 'scss']
        },
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://' + hostconfig.host + ':' + hostconfig.port,
            'webpack/hot/only-dev-server',
            './index.js'
        ],
        output: {
            path: path.resolve(__dirname + 'public/', "dist"), // string
            //filename: '[name].[chunkhash].js', // string
            filename: '[name].js', // string
            // the filename template for entry chunks
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    use: [{
                        loader: 'style-loader'
                    },
                        {
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
                }
            ]

        },
        devtool: 'cheap-module-eval-source-map',

        devServer: {
            hot: true,
            contentBase: path.join(__dirname, "/"),
            compress: true,
            host: hostconfig.host,
            port: hostconfig.port,
            open: false,
            inline: true,
            publicPath: '/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            }),
            new webpack.HotModuleReplacementPlugin(),
            // 开启全局的模块热替换(HMR)
            new webpack.NamedModulesPlugin()
            // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        ],
    })
};