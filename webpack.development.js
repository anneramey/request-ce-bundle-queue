/* eslint-disable */
var optionalRequire = require('optional-require')(require);
var webpack = require('webpack');
var config = optionalRequire('./config');
var DashboardPlugin = require('webpack-dashboard/plugin');

if (!config) {
  console.log('Could not find the config.js file. Copy config.example.js, ' +
    'rename it to config.js, and change values as necessary.');
  process.exit(1);
}

console.log('Kinetic Request CE is running at',
  config.kineticWebserver);

module.exports = {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new DashboardPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: config.localPort,
    hot: true,
    hotOnly: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/': {
        target: config.kineticWebserver,
        headers: { 'X-Webpack-Bundle-Name' : config.bundleName },
        secure: false,
        autoRewrite: true,
        protocolRewrite: 'http',
        onError: function(err, req, res) {
          var message;
          switch(err.code) {
            case 'ENOTFOUND':
              message = 'Could not resolve address for ' + err.hostname +
                '. Double check the kineticWebserver property in config.js.';
              break;
            case 'ECONNREFUSED':
              message = 'Could not connect to specified kineticWebserver (' +
                config.kineticWebserver + '). The hostname resolved to the ' +
                'following address: ' + err.address + '. Check that the ' +
                'address and port number are correct.';
              break;
            case 'EPROTO':
              message = 'Got protocol error while proxying request to ' +
                config.kineticWebserver + '. Ensure that the protocol ' +
                'specified by the kineticWebserver property in config.js ' +
                '(either http:// or https://) matches the protocol used ' +
                'by the application web server.';
              break;
            default:
              message = 'Got ' + err.code + ' while proxying request to ' +
                config.kineticWebserver;
          }
          res.writeHead(502, { 'Content-Type': 'text/plain' });
          res.end(message);
        }
      }
    }
  },
};
