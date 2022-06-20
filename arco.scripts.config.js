const path = require('path');

// 将 arco-scripts 构建的公共配置抽离统一维护，需要扩展的配置可在 package 内部处理
module.exports = {
  /**
   * @param config {import('arco-scripts').BabelConfig}
   */
  babel: (config) => {},
  /**
   * @param config {import('arco-scripts').StyleConfig}
   */
  style: (config) => {},
  /**
   * @param config {import('arco-scripts').WebpackConfig}
   */
  webpack: (config) => {},
  /**
   * @param config {import('arco-scripts').DocgenConfig}
   */
  docgen: (config) => {
    config.entry = 'src';
    // DON'T change output!!!
    config.output = 'docs/README.md';
    config.tsParseTool = ['ts-document'];
    config.demoGlob = 'demo/index.js';
  },
  jest: {
    /**
     * @param config {import('arco-scripts').JestConfig}
     */
    node: (config) => {
      config.setupFiles = [path.resolve(__dirname, './tests/setup.js')];
    },
    /**
     * @param config {import('arco-scripts').JestConfig}
     */
    client: (config) => {
      config.setupFiles = [path.resolve(__dirname, './tests/setup.js')];
    },
  },
};
