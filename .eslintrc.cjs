const path = require("node:path");

const paddingLineBetweenStatements = [
  "error",
  { blankLine: "always", prev: "*", next: "return" },
]
  .concat(
    [
      "multiline-block-like",
      "multiline-expression",
      "multiline-const",
      "const",
      "type",
      "interface",
      "if",
    ]
      .map((item) => [
        { blankLine: "always", prev: item, next: "*" },
        { blankLine: "always", prev: "*", next: item },
      ])
      .flat(),
  )
  .concat([
    {
      blankLine: "any",
      prev: ["singleline-const"],
      next: ["singleline-const"],
    },
  ]);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint", "react-hooks", "@stylistic", "perfectionist"],
  rules: {
    // @TODO: These should be removed when fixed
    "@typescript-eslint/no-explicit-any": "off",
    "@next/next/no-img-element": "off",
    "react/display-name": "off",
    "jsx-a11y/anchor-is-valid": "off",

    "arrow-body-style": "error",
    "camelcase": "off",
    "global-require": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],

    "@stylistic/padding-line-between-statements": paddingLineBetweenStatements,

    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "off",

    "react/destructuring-assignment": [
      "error",
      "always",
      { destructureInSignature: "always" },
    ],

    "react/function-component-definition": "off",
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-filename-extension": "off",
    "react/jsx-fragments": "error",
    "react/jsx-key": ["error", { warnOnDuplicates: true }],
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-sort-props": "error",
    "react/no-array-index-key": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unknown-property": "off",
    "react/no-unstable-nested-components": "error",
    "react/no-unused-prop-types": "error",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/self-closing-comp": "error",

    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",

    "perfectionist/sort-object-types": "error",
  },
};
