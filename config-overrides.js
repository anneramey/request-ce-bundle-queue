module.exports = function override(config, env) {
  const isProduction = env === 'production';

  config.entry = [
    'babel-polyfill',
    !isProduction && 'react-dev-utils/webpackHotDevClient',
    isProduction ? './src/index.production.js' : './src/index.js'
  ].filter(entry => !!entry);

  // Removes cache busting from the bundle.js in production and also moves the
  // output files directly into the static directory where the jsp currently
  // expects bundle.js to be (rather than "static/js").
  config.output.filename = 'static/bundle.js';
  config.output.chunkFilename = 'static/[name].chunk.js';

  const omitPlugins = ['ManifestPlugin', 'SWPrecacheWebpackPlugin'];
  config.plugins = config.plugins
    .filter(plugin => !omitPlugins.includes(plugin.constructor.name));

  // Adds the sass loader and reset the css loader.  We reset the css loader
  // because we do not need PostCSS and we do not want the ExtractTextPlugin
  // to be used.  This plugin causes issues when css code references files
  // because it does not end up using the public path that we dynamically set in
  // the index.production.js file.
  const oneOfIndex = config.module.rules.findIndex(rule => rule.hasOwnProperty('oneOf'));
  config.module.rules[oneOfIndex].oneOf.unshift(
    {
      test: /\.svg$/,
      loader: 'raw-loader',
    }
  );
  config.module.rules[oneOfIndex].oneOf.unshift(
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { minimize: isProduction, sourceMap: true }
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }
  );
  config.module.rules[oneOfIndex].oneOf.unshift(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { minimize: isProduction, sourceMap: true }
        }
      ]
    }
  );

  return config;
};
