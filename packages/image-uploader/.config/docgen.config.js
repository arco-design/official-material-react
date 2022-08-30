const fs = require('fs');
const path = require('path');
const { getGitRootPath } = require('arco-cli-dev-utils');

/**
 * @param config {import('arco-scripts').DocgenConfig}
 */
module.exports = (config) => {
  const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
  if (fs.existsSync(rootConfigPath)) {
    const { docgen } = require(rootConfigPath);
    config = docgen(config) || config;
  }
};
