const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const { webpack } = require('../../../arco.scripts.config');

/**
 * @param config {import('@arco-design/arco-scripts').WebpackConfig}
 */
module.exports = (config) => {
  if (webpack) {
    const commonConfig =
      typeof webpack === 'function'
        ? webpack
        : typeof webpack.component === 'function'
        ? webpack.component
        : () => {};
    config = commonConfig(config) || config;
  }

  const entry = {
    arco: path.resolve('./src/index.tsx'),
  };
  const demoVendorPath = path.resolve('./src/demo/arcoDemoVendor.js');
  if (fs.existsSync(demoVendorPath)) {
    entry.arcoDemoVendor = demoVendorPath;
  }

  const output = {};
  const { umd } = require(path.resolve('package.json'));
  if (umd) {
    output.filename = path.basename(umd.file);
    output.library = umd.module;
  }

  return merge(config, {
    entry,
    output,
  });
};
