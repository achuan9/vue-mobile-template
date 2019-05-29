module.exports = {
  root: true,
  extends: ['plugin:vue-libs/recommended', 'eslint:recommended'],

  //it is base on https://github.com/vuejs/eslint-plugin-vue-libs
  rules: {
    'space-before-function-paren': [2, 'never'],
    'no-console': 0
  }
}
