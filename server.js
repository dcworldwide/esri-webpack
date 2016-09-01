/**
 * This file runs a webpack-dev-server, using the API.
 *
 * For more information on the options passed to WebpackDevServer,
 * see the webpack-dev-server API docs:
 * https://github.com/webpack/docs/wiki/webpack-dev-server#api
 */
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: 'dist',
  hot: true,
  host: "0.0.0.0",
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  proxy: {
    "/proxy": {
      "target": {
        "host": "localhost",
        "protocol": 'http:',
        "port": 80
      },
      // ignorePath: true,
      // changeOrigin: true,
      secure: false
    }
  }
});
server.listen(8080, 'localhost', function (err, stats) {
  if (err) {
    throw new gutil.PluginError("webpack-dev-server", err);
  }

  console.log('DEV SERVER STARTED');
});
