const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');

module.exports = env => {

    // Common
    const commonConfig = {
        entry: './src/index.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({title: 'Try Webpack'})
        ]
    };

    // Production
    const prodTargetedConfig = {
        output: {
            filename: '[name].[chunkhash].js' // see https://webpack.js.org/guides/caching/
        },
        devtool: 'source-map'
    };

    // Development
    const devTargetedConfig = {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist'
        }
    };

    return merge(commonConfig, getSafe(() => env.prod) ? prodTargetedConfig : devTargetedConfig);

};

// copy from https://silvantroxler.ch/2017/avoid-cannot-read-property-of-undefined/
function getSafe(fn) {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
}
