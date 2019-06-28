const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        compress: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                secure: false
            }
        }
    }
});