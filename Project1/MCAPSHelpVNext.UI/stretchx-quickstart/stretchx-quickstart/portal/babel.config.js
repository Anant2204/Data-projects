
module.exports = function (api) {
  api.cache(false);

  const presets = [
    ["@babel/preset-env", {
      useBuiltIns: "usage",
      corejs: 3,
    }],
    "@babel/preset-react",
  ];

  const plugins = [
    ["react-intl", { "messagesDir": "./build/messages" }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    'transform-es2015-modules-commonjs',
    'babel-plugin-dynamic-import-node',
  ];

  const env = {
    test: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-class-properties',
        'transform-es2015-modules-commonjs',
        'babel-plugin-dynamic-import-node',
      ]
    }
  }

  return {
    presets,
    env,
    plugins
  };
}
