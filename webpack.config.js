const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const argv = require('yargs-parser')(process.argv.slice(2));
const mode = argv.mode || 'development';
const {VueLoaderPlugin} = require('vue-loader');
const isDev = mode === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//webpack内置的js压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postCssPlugin = require("autoprefixer")({overrideBrowserslist: [ "> 1%",
    "last 2 versions",
    "not ie <= 8"]})

// 清除dist文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        admin:'./src/pages/admin-page/main.js', 
        index:'./src/pages/front-page/main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'), // 出口目录，dist文件
        publicPath: '/',// 表示在引入静态资源时，从根路径开始引入,否则路由多层时候资源找不到
        filename: 'js/[name].[hash].js', //这里name就是打包出来的文件名
        chunkFilename: 'js/[name].js',//指定动态生成的Chunk在输出时的文件名称
    }, 
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                },
            },
            {
                test: /\.less$/,
                use: [ 
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../' //解决css图片引入路径问题
                        }
                    },
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [postCssPlugin]
                        }
                    },
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns:[
                                path.resolve(__dirname, './src/front-page/assets/styles/theme.less'),
                                path.resolve(__dirname, './src/admin-page/assets/styles/theme.less'),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [postCssPlugin]
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [],
                options: {
                    limit: 5 * 1024,
                    name: 'images/[name].[hash:7].[ext]',
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                exclude: [],
                use: [
                    {
                        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
                    },
                ],
            }
        ]
    }, 
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'admin-index.html',
            template: './src/pages/admin-page/index.html',
            inject: true,
            chunks: ['admin','vendor','runtime'],
            favicon: path.resolve('./src/pages/admin-page/favicon-a.ico')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/front-page/index.html',
            inject: true,
            chunks: ['index','vendor', 'runtime'],
            favicon: path.resolve('./src/pages/front-page/favicon-f.ico')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: isDev ? 'css/[id].css' : 'css/[name].[hash].css',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'static'),
                to: path.resolve(__dirname, 'dist/static'),
                ignore: ['.*']
            }
        ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), //打包输出文件根目录
        port: 8080, // 端口
        host: 'localhost',
        historyApiFallback: {
            rewrites: [{
                from: /^\/a\/.*$/,
                to: '/admin-index.html'
            }]
        },
        compress: true,
        disableHostCheck: true,
        watchOptions: {
            ignored: /node_modules/, //忽略不用监听变更的目录
            aggregateTimeout: 300, //防止重复保存频繁重新编译,n毫米内重复保存不打包
        },
        //让前后端http请求都转到node的3000端口
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    minChunks: 2,// 引入两次及以上被打包
                    // 可选 'initial | async | all'，
                    // 分别代表，初始化时加载、异步加载、两者皆使用
                    chunks: 'all', 
                    // 代表权重值，值越大，打包优先级越高
                    priority: 10 ,
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            new UglifyJsPlugin(), //会优化掉 .map文件
            new OptimizeCSSAssetsPlugin(),
        ],
    },
    devtool: '#source-map',
    resolve: {
        extensions: ['.js', '.jsx','.ts','.tsx', '.less','.json','.css','.vue'],
        alias: {
            '@': path.join(__dirname, 'src'),
            '@pages': path.join(__dirname, 'src', 'pages'), // ../pages
        },
        modules: ['node_modules'],
    },
}