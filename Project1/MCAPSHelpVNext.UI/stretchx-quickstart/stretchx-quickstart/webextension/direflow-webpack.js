const { webpackConfig } = require('direflow-scripts');

/**
 * Webpack configuration for Direflow Component.
 * Additional webpack plugins / overrides can be provided here.
 * This file is used because react-app-rewired is used in package.json, which allows us to modify the WebPack
 * config from inside "react-scripts" without ejecting. The "config-overrides-path" setting (used by react-app-rewired)
 * in the package.json points to this file (direflow-webpack.js, by default the file name is config-overrides.js).
 */
module.exports = (config, env) => {
  const filename = 'sw-consumption.js';
  const chunkFilename = 'sw-consumption-vendor.js';

    // The current version of react-scripts being used right now is "react-scripts": "^3.4.4".
    // We cannot use a newer version (like 4.x or 5.x) right now because the (currently latest) version of DireFlow
    // we use is "direflow-component": "^3.5.5" - and that version of DireFlow does not work with newer "react-scripts".
    // Newer versions of "react-scripts" have more modern config for Babel, including newer plugins. Some newer packages
    // such as the latest @coherence-design-system/* and @m365-admin/* use newer Javascript features like optional
    // chaining and nullish coalescing. This code will not compile unless these Babel plugins are added to the WebPack
    // config here at this location in the WebPack config (from inside "react-scripts" 3.4.4).
    //
    // See webpack.config.js (node_modules\react-scripts\config\webpack.config.js) near commented section with
    // "Process any JS outside of the app with Babel.". This will add the required plugins to be able to transform
    // the newer javascript (in node_modules code) using these features.
    config.module.rules[2].oneOf[2].options.plugins = [
        ...config.module.rules[2].oneOf[2].options.plugins || [], // There are no plugins listed in current webpack.config here, but just to be safe.
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-class-properties'
    ];

    const configOverride = webpackConfig(config, env);

    // Below splice will remove one element from the end (by specifying negative value in first param) of the plugins array.
    // This will remove this plugin: [ EventHooksPlugin { hooks: { done: [PromiseTask] } } ]
    // It is unclear why this is needed, but we have verified it IS needed for DireFlow to build properly.
    configOverride.plugins.splice(-2, 1);

    if (env === 'development') {
        return {
            ...configOverride,
            output: {
                ...configOverride.output,
                filename: filename
            }
        }
    }
    return {
        ...configOverride,

        // Override the optimization configuration
        optimization: {
            ...configOverride.optimization,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        enforce: true
                    }
                }
            }
        },

        // Override the output configuration
        output: {
            ...configOverride.output,
            filename: filename,
            chunkFilename: chunkFilename
        }
    };
};
