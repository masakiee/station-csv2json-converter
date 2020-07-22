module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "prettier/prettier": "off",
  },
};
