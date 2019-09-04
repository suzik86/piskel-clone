module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/_tests_/.*|(\\.|/)(test|spec))\\.js$',
  moduleFileExtensions: [
    'js',
    'tpl',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tpl$': '<rootDir>/test/utils/htmlLoader.js',
  },
};
