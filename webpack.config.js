const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
    const { mode = 'development' } = env;
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    getCssLoaders = () => [ 
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader'
    ]

    getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                title: 'Hello World',
                buildTime: new Date().toISOString(),
                template: 'public/index.html',
            })
        ];

        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({filename: 'main-[hash:8].css'}));
        }

        return plugins;
    }

    return {
        mode: isProd ? 'production' : isDev && 'development',

        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined,
        },

        module: {
            rules: [
                //babel без блока use, т.к. один
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                //Loading images
                {
                    test: /\.(png|jpg|svg|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name]_[sha1:hash:7].[ext]',
                            }
                        },
                    ]
                },
                //Loading fonts
                {
                    test: /\.(ttf|otf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]',
                            }
                        },
                    ]
                },
                //Loading css
                {
                    test: /\.css$/,
                    use: getCssLoaders(),
                },
                //Loading scss
                {
                    test: /\.scss$/,
                    use: [ ...getCssLoaders(), 'sass-loader' ]
                },
            ]
        },

        plugins: getPlugins(),

        devServer: {
            open: true,
        }
    }
}
