const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const mode = 'PROD';

const config = {
    'DEV' : {
        devServer : {
            historyApiFallback : true,
        },
        entry : './src/index.js',
        output : {
            path : path.join(__dirname,'/build'),
            publicPath : '/',
            filename : 'bundle.js'
        },
        module : {
            rules : [
                {
                    test : /\.js$/,
                    exclude : /node_modules/,
                    use : {
                        loader : 'babel-loader'
                    }
                },
                {
                    test : /\.s[ac]ss$/i,
                    use : ['style-loader','css-loader','sass-loader']
                },
                {
                    test : /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use : ['url-loader?limit=100000']
                }
            ]
        },
        plugins : [
            new HTMLWebpackPlugin({
                template : './public/index.html'
            })
        ]
    },
    'PROD' : {
        entry : './src/index.js',
        output : {
            path : path.join(__dirname,'/build'),
            publicPath : '/',
            filename : 'bundle.js'
        },
        module : {
            rules : [
                {
                    test : /\.js$/,
                    exclude : /node_modules/,
                    use : {
                        loader : 'babel-loader'
                    }
                },
                {
                    test : /\.s[ac]ss$/i,
                    use : ['style-loader','css-loader','sass-loader']
                },
                {
                    test : /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use : ['url-loader?limit=100000']
                }
            ]
        },
        plugins : [
            new HTMLWebpackPlugin({
                template : './public/index.html'
            })
        ]
    }
}

module.exports = config[mode];