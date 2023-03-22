module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": ["off", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": ["off"],
    "no-unused-vars": ["warn", { args: "none" }],
    "prefer-destructuring": ["error", { object: false, array: false }],
    "consistent-return": ["off"],
  },
};
