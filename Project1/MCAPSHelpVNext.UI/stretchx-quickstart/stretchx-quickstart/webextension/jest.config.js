module.exports = {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.ts?$": "babel-jest",
    "\\.svg?$": "./svgTransform.js",
    "\\.css?$": "jest-transform-css"
  },

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|react-native-cookies|office-ui-fabric-react|@fluentui|d3-scale|d3-array|react-toastify|internmap|d3-scale|d3-time|ag-grid-community|direflow-component)/)"
  ],
};
