const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const { getGitRootPath } = require('arco-cli-dev-utils');

/**
 * @param config {import('arco-scripts').WebpackConfig}
 */
module.exports = (config) => {
  // Clear default entries
  config.entry = {};

  // Extend webpack common config from project root
  const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
  if (fs.existsSync(rootConfigPath)) {
    const { webpack } = require(rootConfigPath);
    const configHandler =
      typeof webpack === 'function'
        ? webpack
        : typeof webpack.component === 'function'
          ? webpack.component
          : () => {};
    config = configHandler(config) || config;
  }

  // Get library info defined in package.json
  const { umd = {} } = require(path.resolve('package.json'));
  const entryChunkName = umd.module || 'arco';

  // Rewrite webpack entries
  config.entry[entryChunkName] = path.resolve('./src/index.tsx');
  const demoVendorPath = path.resolve('./src/demo/arcoDemoVendor.js');
  if (fs.existsSync(demoVendorPath)) {
    config.entry.arcoDemoVendor = demoVendorPath;
  }

  const finalConfig = merge(config, {
    output: {
      filename: (chunkData) =>
        umd.file && chunkData.chunk.name === entryChunkName
          ? path.basename(umd.file)
          : '[name].min.js',
    },
  });

  // Use code below to log final webpack config
  // console.log(JSON.stringify(finalConfig, null, 2));
  // process.exit(0);

  return finalConfig;
};
