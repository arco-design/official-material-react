# Arco 物料团队站点

## 指令

```shell
# 构建站点
yarn build

# 预览站点
yarn preview
```

## 站点配置

站点配置文件位于 `site.config.js`，它包含了站点打包的入口文件配置和站点的基础配置（国际化、onCall群、主题等）。

## 入口文件

入口文件位于 `__temp__/index.[language].js`，此文件由脚本自动生成，无需手动维护。

## 自定义文档

在 `docs` 目录书写任意自定义文档，文档中的以下内容会在编译时被转化为特殊内容：

* 含有以下内容的 Markdown 会被渲染成时间线形式的版本日志。

```markdown
---
changelog: true
---
```

注意，在版本日志文档中请保持以下固定的书写形式，否则可能导致编译失败。

```markdown
## 版本号

2021-01-01

### 分类 e.g. feature / bugfix /style

任意内容
```

* 以下内容会在编译时被转化为页头：

~~~markdown
`````
Developer Guide

# Quick Start

Follow the steps below to quickly get started using the component library.
`````
~~~


## 国际化

在 `site.config.js` 的配置中指定 `languages: ['zh-CN', 'en-US']`。然后在 `docs/` 目录书写对应语言的文档，对于 Demo 的描述文档，需要以如下的形式书写：

```js
// demo/index.js
/**
 * @file
 * @title
 * zh-CN: 组件名
 * en-US: ComponentName
 * @memberOf
 * zh-CN: 组件类别 例如：输入输入
 * en-US: Type of Component e.g. DataInput
 * @description
 * zh-CN: 组件描述
 * en-US: Description of component
 */

/**
 * @title
 * zh-CN: Demo名
 * en-US: DemoName
 * @description
 * zh-CN: Demo描述
 * en-US: Description of Demo
 */
export { default as Basic } from './basic';
```
