var path = require("path");
var webpack = require("webpack");
// var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    entry: [
        './src/app/main.tsx', // entry point. Must be first in array
        'webpack/hot/dev-server',    
        'webpack-dev-server/client?http://localhost:8080/',
    ],

    // Disabled. Multi-bundle support
    // entry: {
    //     main: [
    //         './src/app/main.tsx', // entry point for your application code
    //         'webpack/hot/dev-server',
    //         'webpack-dev-server/client?http://localhost:8080/'            
    //     ],       
    //     vendor: [
    //         // put your third party libs here
    //     ]
    // },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        libraryTarget: "amd" // Creates a AMD and UMD compatible bundle. Required to load Esri dojo components
        
        // Disabled. Multi-bundle support
        // path: path.resolve(__dirname, "dist"),
        // // path: "dist",
        // filename: '[name].bundle.js',
        // // publicPath: './',
        // publicPath: '/dist/',
        // libraryTarget: "umd" // was amd. Try umd?
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: ''
            },
            // css
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        // Disabled. Multi-bundle support
        // I can't get HMR working with chunks. https://github.com/webpack/webpack/issues/969
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity
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
        function(context, request, callback) {
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
    devtool: "source-map",
};