const fs = require('fs');
const path = require('path');
const { getGitRootPath } = require('arco-cli-dev-utils');

module.exports = {
  /**
   * @param config {import('arco-scripts').JestConfig}
   */
  node: (config) => {
    const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
    if (fs.existsSync(rootConfigPath)) {
      const { jest } = require(rootConfigPath);
      if (jest && jest.node) {
        config = jest.node(config) || config;
      }
    }

    config.moduleNameMapper = {
      '^@arco-materials/guide-tip/(.+)$': '<rootDir>/$1',
      '^@arco-materials/guide-tip$': '<rootDir>',
    };
  },
  /**
   * @param config {import('arco-scripts').JestConfig}
   */
  client: (config) => {
    const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
    if (fs.existsSync(rootConfigPath)) {
      const { jest } = require(rootConfigPath);
      if (jest && jest.client) {
        config = jest.client(config) || config;
      }
    }

    config.moduleNameMapper = {
      '^@arco-materials/guide-tip/(.+)$': '<rootDir>/$1',
      '^@arco-materials/guide-tip$': '<rootDir>',
    };
  },
};
