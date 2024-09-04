const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');



module.exports = {
  // ... other configurations
  optimization: {
    minimizer: [new TerserPlugin(),
      new OptimizeCSSAssetsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new HtmlMinifierPlugin(),
  ],
};
