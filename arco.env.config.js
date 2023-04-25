const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const ArcoWebpackPlugin = require('@arco-plugins/webpack-react');

function collectPackageResolveAliasForWebpack() {
  const packageJsonPaths = glob.sync(path.resolve(__dirname, 'packages/*/package.json'));
  const result = {};
  for (const packageJsonPath of packageJsonPaths) {
    const { name: packageName } = fs.readJsonSync(packageJsonPath);
    const srcPath = path.resolve(path.dirname(packageJsonPath), 'src');
    if (fs.pathExistsSync(srcPath)) {
      result[`${packageName}$`] = srcPath;
    }
  }
  return result;
}

module.exports = function defineConfig() {
  const webpackConfigTransformer = (config) => {
    const mdxLoader = config.raw.module.rules
      .find((rule) => rule.oneOf)
      ?.oneOf?.find((rule) => rule.test.test('.mdx'))
      ?.use?.find(({ loader }) => loader.indexOf('/mdx/loader') > -1);

    // Auto import component style to __docs__/index.mdx
    if (mdxLoader) {
      mdxLoader.options.preProcessFile = ({ path: filePath, content }) => {
        const componentStyleEntry = '../style/index.less';
        if (fs.existsSync(path.resolve(path.dirname(filePath), componentStyleEntry))) {
          return `${content}\nimport '${componentStyleEntry}';`;
        }
        return content;
      };
    }

    return config.merge({
      plugins: [
        new ArcoWebpackPlugin({
          webpackImplementation: config.webpack,
          include: 'packages',
        }),
      ],
      resolve: {
        alias: {
          react: require.resolve('react'),
          ...collectPackageResolveAliasForWebpack(),
        },
      },
    });
  };

  return {
    jest: {
      jestConfigPath: path.resolve(__dirname, './jest.config.js'),
    },
    webpack: {
      previewConfig: [webpackConfigTransformer],
      devServerConfig: [webpackConfigTransformer],
    },
    typescript: {
      buildConfig: [
        (config) => {
          return config;
        },
      ],
    },
    less: {
      // specify options for less.render
      lessOptions: {},
    },
    sass: {
      // specify options for sass.compile
      sassOptions: {},
    },
  };
};
