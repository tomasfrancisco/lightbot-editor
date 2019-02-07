const { override, fixBabelImports, addBabelPresets, addLessLoader } = require("customize-cra");

module.exports = override(
  addBabelPresets("@emotion/babel-preset-css-prop"),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: require("./src/config/theme.json"),
  }),
);
