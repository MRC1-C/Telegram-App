const {
  useBabelRc,
  override,
  addDecoratorsLegacy,
  disableEsLint,
} = require("customize-cra");

module.exports = override(
  useBabelRc(),
  addDecoratorsLegacy(),

  // disable eslint in webpack
  disableEsLint()
);
