const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/calculator.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "var",
        library: "Calculator"
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Athena',
            template: path.resolve(__dirname, 'src/index.html'),
            inject: false,
            xhtml: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['babel-plugin-transform-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'node_modules')]
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: false
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: "athena-vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    }
};
