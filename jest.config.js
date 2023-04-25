const defaultConfig = require(require.resolve('@arco-cli/react/dist/jest/jest.cjs.config.js'));

const finalConfig = {
  ...defaultConfig,
  rootDir: __dirname,
  roots: [__dirname],
  silent: true,
  collectCoverage: true,
  transformIgnorePatterns: ['node_modules/(?!@?(gsap|lodash-es|@arco-design/web-react))'],
  testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
  coverageDirectory: '.coverage',
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/**/style/*',
    '!packages/**/__docs__/*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', '/es/'],
};

module.exports = finalConfig;
