/**
 * Created by xin.zhang on 17/5/19.
 */
const webpack = require('webpack');
const path = require('path');
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: ['url-loader?limit=8192&name=[path][name].[ext]']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]

    },
    plugins: [
        new webpack.ProvidePlugin({
            mojiJs: path.resolve(__dirname, './src/lib/moji.sdk_new.js')
        }),

        /*------webpack自带插件------*/
        new webpack.SourceMapDevToolPlugin({//vendor不需要map
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                //判断依赖环境是否增加   增加就刷新不增加就返回false
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        })
    ]

}