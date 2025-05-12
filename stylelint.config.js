module.exports = {
  defaultSeverity: 'error',
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  customSyntax: 'postcss-less',
  plugins: ['stylelint-less'],
  rules: {
    'max-empty-lines': 1,
    'number-leading-zero': 'always',
  },
};
