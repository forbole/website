module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "react-hooks"],
  rules: {
    "arrow-body-style": "error",
    "camelcase": "off",
    "global-require": "off",
    "max-len": "error",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "quote-props": ["error", "consistent-as-needed"],

    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],

    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-var-requires": "off",

    "jsx-a11y/alt-text": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/interactive-supports-focus": "off",

    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-absolute-path": "off",
    "import/no-dynamic-require": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",

    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],

    "react/function-component-definition": "off",
    "react/jsx-boolean-value": "error",
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
  },
  overrides: [
    {
      files: ["server/**/*"],
      rules: {
        "no-console": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
