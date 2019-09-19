const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { modules: false }]]
                    }
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'] // use js, jsx file
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/dist'),
        watchContentBase: true,
        inline: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: 'src/index.html'
        })
    ]
};