module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-use-before-define': 'off',
    'jsx-a11y/label-has-for': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'prettier/prettier': 'error',
  },
};
