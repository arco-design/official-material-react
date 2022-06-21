const path = require('path');
const { style } = require('../../../arco.scripts.config');

/**
 * @param config {import('@arco-design/arco-scripts').StyleConfig}
 */
module.exports = (config) => {
  if (style) {
    config = style(config) || config;
  }

  const { umd } = require(path.resolve('package.json'));
  if (umd && umd.style) {
    const dirName = path.dirname(umd.style);
    const fileName = path.basename(umd.style);
    Object.assign(config.css.output.dist, {
      path: dirName,
      cssFileName: fileName,
      rawFileName: fileName.replace(/\.css$/, '.less'),
    });
  }
};
