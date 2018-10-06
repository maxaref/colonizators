const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
      alias: {
        Js: path.resolve(__dirname, 'src/js/'),
      }
    },
    entry: { main: './src/js/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(
            { filename: 'style.[hash].css', disable: false, allChunks: true }
        ),
        new HtmlWebpackPlugin({
            title: 'Colonization',
        }),
        new CopyWebpackPlugin([
          { from: 'src/images', to: 'images' }
        ]),
    ]
};