const path = require('path');
const html = require('html-webpack-plugin');
const clean = require('clean-webpack-plugin');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
var getHtmlConfig = function(name) {
    return {
        template  : './src/web/'+name+'.html',
        filename  : ''+name+'.html',
        //title     : title,
        inject    : true,
        hash      : true,
        chunks    : ['common',name],
        //favicon   : './favicon.ico'
    }
};
module.exports = {
    entry: {
        common: './src/styles/wxcss/js/common.js',
        index:'./src/styles/wxcss/js/index.js',
        tzlb:'./src/styles/wxcss/js/tzlb.js',
        wdzh:'./src/styles/wxcss/js/wdzh.js',
        more:'./src/styles/wxcss/js/more.js',
        login:'./src/styles/wxcss/js/login.js'
    },
    output: {
        filename: './styles/wxcss/js/[name].js',
        path: path.resolve('./build'),
        //publicPath:'../'
    },
    // devServer: {
    //     contentBase: './build'
    // },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
            // {
            //     test: /\.jsx/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 presets: ['es2015', 'react']
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.[s]*css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)/i,
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             context: './src',
                //             name: './[path][hash].[ext]',
                //             limit: 8192  //大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用
                //         }
                //     }
                // ],
                loaders: [ //写成loaders数组集合形式
                    'url-loader?limit=8192&name=./styles/wxcss/images/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new webpack.DefinePlugin({
                'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 把css单独打包到文件里
        //new ExtractTextPlugin('css/[name].css'),
        new html ({
            // 模板文件路径
            template  : './src/index.html',
            // 输出文件名以及路径
            filename  : 'index.html',
            // 生成title标签 也可以<title><%= html.options.title%></title>
            //title: title,
            // 有true body script标签位于html文件的 body 底部,head 放在head里面
            // false 不生产js文件
            inject: true,
            // 给生成的 js 文件一个独特的 hash 值
            hash: true,
            // 可以看到我们的入口有很多js文件 chunks会默认引用所有的 但是明显我们不需要
            // 我们只需要引入自己单独需要的js文件name.js 和 通用的 common.js
            chunks: ['common','index'],
            // 给生成的 html 文件生成一个 favicon图标  一般放在根目录下
            //favicon: './favicon.ico'
        }),
        new html(getHtmlConfig('tzlb')),
        new html(getHtmlConfig('wdzh')),
        new html(getHtmlConfig('more')),
        new html(getHtmlConfig('login')),
        // new html ({
        //     // 模板文件路径
        //     template: './src/web/tzlb.html',
        //     // 输出文件名以及路径
        //     filename: 'tzlb.html',
        //     // 生成title标签 也可以<title><%= html.options.title%></title>
        //     //title: title,
        //     // 有true body script标签位于html文件的 body 底部,head 放在head里面
        //     // false 不生产js文件
        //     inject: true,
        //     // 给生成的 js 文件一个独特的 hash 值
        //     hash: true,
        //     // 可以看到我们的入口有很多js文件 chunks会默认引用所有的 但是明显我们不需要
        //     // 我们只需要引入自己单独需要的js文件name.js 和 通用的 common.js
        //     chunks: ['common','tzlb'],
        //     // 给生成的 html 文件生成一个 favicon图标  一般放在根目录下
        //     //favicon: './favicon.ico'
        // }),
        //
        new clean(['build'])
    ]
};