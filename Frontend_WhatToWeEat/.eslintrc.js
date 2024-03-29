// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "linebreak-style": ["off", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": ["warn", "all"],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never",
          normal: "any",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
