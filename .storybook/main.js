const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const packagePaths = glob.sync('packages/*');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getLoaderForStyle(isCssModule) {
  return [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: isCssModule ? { modules: true } : {},
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ];
}

module.exports = {
  stories: ['../packages/**/stories/*.@(js|jsx|ts|tsx)'],
  webpackFinal: (config) => {
    // 为 storybook 添加 packages 中项目的 alias
    packagePaths.forEach((_path) => {
      const packageJson = fs.readJsonSync(path.resolve(_path, 'package.json'));
      const dirSourceFile =
        packageJson.arcoMeta && packageJson.arcoMeta.type === 'react-library'
          ? 'components'
          : 'src';
      config.resolve.alias[`${packageJson.name}$`] = path.resolve(_path, dirSourceFile);
    });

    // 支持 import less
    config.module.rules.push({
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLoaderForStyle(),
    });

    // less css modules
    config.module.rules.push({
      test: lessModuleRegex,
      use: getLoaderForStyle(true),
    });

    // 支持 import svg
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: ['@svgr/webpack'],
    });

    return config;
  },
};
