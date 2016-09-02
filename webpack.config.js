var path = require("path");
var webpack = require("webpack");
// var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {

    // Application entry points (we have split the app into bundles/chunks)
    entry: {
        app: [
            './src/index.tsx', // entry point. Must be first in array
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080/'
        ],
        vendor: ['react', 'redux', 'react-router', 'fixed-data-table', 'material-ui', 'lodash']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
        libraryTarget: "amd", // Creates a AMD compatible bundle. Required as we are side-loading our code with their Esri dojo dependencies
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],

        // Configuration
        alias: {
            config: path.join(__dirname, 'config', 'config.json') // , process.env.NODE_ENV
        }
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loaders: ['react-hot', 'ts-loader'], // loader: 'ts-loader',
                exclude: /node_modules/
            },
            // css
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            // json
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },

    plugins: [
        // Enable webpack HMR
        new webpack.HotModuleReplacementPlugin(),

        // Split build output into logical app / vendor bundles. https://github.com/webpack/webpack/issues/969
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        // Define environment name
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        // }),

        // Disabled. Dynamic index.html generation
        // new HtmlWebpackPlugin({
        //     title: 'My App',
        //     filename: 'index.html',
        //     template: './src/app/index.ejs',
        //     hash: true,
        //     inject: false, // Don't auto inject deps. Our template will manually specifiy how to include them,
        //     showErrors: true,
        //     environment: process.env.NODE_ENV || "Development"
        // })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: [
        function (context, request, callback) {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, "amd " + request);
            }
            callback();
        }
    ],

    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",
    // devtool: "eval",
    devtool: 'cheap-module-source-map'
};