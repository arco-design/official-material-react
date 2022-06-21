/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = {
  build: {
    // 匹配文档和组件的路径
    globs: {
      // 可用于 Arco Monorepo 模板的配置
      component: {
        base: '../packages/*',
        doc: 'docs/README.md',
        demo: 'src/demo/index.js',
        style: 'src/style/index.less',
      },
      doc: './docs/**/*.md',
    },
    // 是否引入物料的样式文件
    withMaterialStyle: true,
  },
  // 站点配置
  site: {
    // 站点支持的语言种类
    languages: ['zh-CN'],
    // 飞书 onCall 群的 ID
    larkGroupID: '',
    // 是否允许切换站点主题
    allowThemeToggle: true,
    // 物料 Demo 配置
    demo: {
      // 是否允许实时编辑调试
      editable: true,
    },
    menu: {
      sortRule: {
        开发指南: ['快速上手', '共建物料']
      }
    },
  },
  group: {
    id: 1,
  }
};
