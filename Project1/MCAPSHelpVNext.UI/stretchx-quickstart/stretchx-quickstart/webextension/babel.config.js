// This babel.config.js is only used by the text translation. See this step in the package.json file:
// "trans:extract": "set NODE_ENV=production && babel ./extracted",
// Note that this file would be used during the WebPack build process for the app, but it is not being used
// because the webpack.config.js (inside react-scripts) specifies: configFile: false

module.exports = function (api) {
  api.cache(false);

  const presets = [
      ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: 3
      }],
      '@babel/preset-typescript',
  ];

  const plugins = [
      ['react-intl', { 'messagesDir': './build/messages' }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-class-properties',
      'transform-es2015-modules-commonjs',
      'babel-plugin-dynamic-import-node'
  ];

  const env = {
      test: {
          presets: [
              '@babel/preset-env',
              '@babel/preset-react'
          ],
          plugins: [
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-transform-modules-commonjs',
              '@babel/plugin-proposal-class-properties',
              'transform-es2015-modules-commonjs',
              'babel-plugin-dynamic-import-node'
          ]
      }
  }

  return {
      presets,
      env,
      plugins
  };
}
