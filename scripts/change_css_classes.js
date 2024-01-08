const path = require("path");
const loaderUtils = require("loader-utils");

const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, "/")}#className:${exportName}`,
      ),
      "md4",
      "base64",
      6,
    )
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .replace(/^(-?\d|--)/, "_$1");

// https://stackoverflow.com/a/69166434
const changeCssClasses = (config) => {
  config.module.rules.forEach((rule) => {
    if (!rule.oneOf) return;

    rule.oneOf.forEach((subRule) => {
      if (!Array.isArray(subRule.use)) return;

      subRule.use.forEach((use) => {
        if (!use.loader?.includes("/css-loader")) return;

        use.options.modules.getLocalIdent = hashOnlyIdent;
      });
    });
  });
};

module.exports = {
  changeCssClasses,
};
