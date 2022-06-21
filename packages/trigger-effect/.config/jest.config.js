const { jest } = require('../../../arco.scripts.config');
module.exports = {
  /**
   * @param config {import('@arco-design/arco-scripts').JestConfig}
   */
  node: (config) => {
    config = jest.node(config) || config;
    config.moduleNameMapper = {
      '^@arco-materials/trigger-effect/(.+)$': '<rootDir>/$1',
      '^@arco-materials/trigger-effect$': '<rootDir>',
    };
  },
  /**
   * @param config {import('@arco-design/arco-scripts').JestConfig}
   */
  client: (config) => {
    config = jest.client(config) || config;
    config.moduleNameMapper = {
      '^@arco-materials/trigger-effect/(.+)$': '<rootDir>/$1',
      '^@arco-materials/trigger-effect$': '<rootDir>',
    };
  },
};
