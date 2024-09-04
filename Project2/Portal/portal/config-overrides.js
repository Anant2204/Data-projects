// This file is used with react-app-rewired to modify the webpack config without ejecting.
// The main reason this is being done is to re-add back the polyfills that are no longer part
// of Webpack 5.

// Webpack 5 removed polyfills that were in Webpack 4. Using NodePolyfillPlugin adds them back.
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
// https://github.com/Richienb/node-polyfill-webpack-plugin
//
// See comments near resolve.fallback. That falback section is where polyfills can be added that
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

module.exports = function override(config, env) {
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

    return config;
}
