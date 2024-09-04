/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * File: direflow-webpack.js
 * Description: Webpack configuration for Direflow Component.
 */
const { webpackConfig } = require('direflow-scripts');

// Webpack 5 removed polyfills that were in Webpack 4. Using NodePolyfillPlugin adds them back.
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
// https://github.com/Richienb/node-polyfill-webpack-plugin
//
// See comments near resolve.fallback. That fallback section is where polyfills can be added that
// are no longer included as part of Webpack 5. Using NodePolyfillPlugin seems to eliminate the need
// to add these individually to resolve.fallback.
// See documentation here for "resolve.fallback": https://webpack.js.org/configuration/resolve/
// "Webpack 5 no longer polyfills Node.js core modules automatically which means if you use them in your code
// running in browsers or alike, you will have to install compatible modules from npm and include them yourself."
// Other docs:
// https://github.com/webpack/changelog-v5#automatic-nodejs-polyfills-removed
// https://webpack.js.org/migrate/5/
// https://stackoverflow.com/questions/66255566/webpack-5-receiving-a-polyfill-error-my-javascript-react-project-is-receivin
// The package.json has been updated to add node-polyfill-webpack-plugin.
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

/**
 * Webpack configuration for Direflow Component.
 * Additional webpack plugins / overrides can be provided here.
 * This file is used because react-app-rewired is used in package.json, which allows us to modify the WebPack
 * config from inside "react-scripts" without ejecting. The "config-overrides-path" setting (used by react-app-rewired)
 * in the package.json points to this file (direflow-webpack.js, by default the file name is config-overrides.js).
 */
module.exports = (config, env) => {
    // *****************************************************************************************************************
    // This project uses react-scripts v5 which uses WebPack v5, which no longer has Node Polyfills. This block
    // adds the Polyfills back and does some other configuration.

    config.resolve.fallback = {
        // Regarding setting 'fs' to false, see docs:
        // https://stackoverflow.com/questions/39249237/node-cannot-find-module-fs-when-using-webpack/64428818#64428818
        // https://github.com/webpack-contrib/css-loader/issues/447
        // https://stackoverflow.com/questions/57161839/module-not-found-error-cant-resolve-fs-in
        // Note that as of Webpack 5, this is the way to do it. Previous versions of Webpack needed this change elsewhere
        // in this file using something like: node: { fs: 'empty' }
        fs: false
        // Individual pollyfills are not being added here, like:
        // path: require.resolve('path-browserify'),
        // Because using NodePolyfillPlugin fixes this problem. See comments elsewhere regarding NodePolyfillPlugin.
    };

    // Disabling all "Failed to parse source map" warnings. Tons of these appear for many packages in node_modules.
    // This will just suppress all those warnings.
    // See docs:
    // https://stackoverflow.com/questions/63195843/webpack-module-warning-failed-to-parse-source-map-from-data-url
    // https://webpack.js.org/loaders/source-map-loader/#ignoring-warnings
    config.ignoreWarnings = [/Failed to parse source map/];

    // See comments above regarding NodePolyfillPlugin.
    config.plugins.push(new NodePolyfillPlugin());

    // *****************************************************************************************************************

    // Note: Using the direflow-config.json for some webpack configuration - see https://direflow.io/configuration
    // The "vendor" option is set to false, and no "chunkFilename" is specified. This means that all UI bits
    // and all the vendor bits (files from node_modules) are put into the single "sw-recycling.js" file.
    // Splitting the vendor bits into a separate "sw-recycling-vendor.js" is not being done. When using the NodePolyfillPlugin
    // which is added above, seems to cause problems with code chunking into separate files.
    // If "vendor" is set to true, and we build with "npm run build" - the following error is produced:
    // "Conflict: Multiple chunks emit assets to the same filename sw-recycling.js (chunks 179 and 736)"
    // Unable to find a resolution to this, so just living with one "sw-recycling.js" output file and no chunking to separate
    // files. This is fine anyway as both files would have been needed to work run anyway, so one file is just the same.

    const configOverride = webpackConfig(config, env);
    return configOverride;
};
