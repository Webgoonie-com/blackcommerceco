module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  ignorePatterns: ['node_modules', 'dist'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
