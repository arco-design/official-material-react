# Arco 官方物料集合

[共建指南](/team-site/docs/zh-CN/开发指南/参与共建.md)

[物料平台文档中心](https://arco.design/docs/material/guide)

## 准备工作

**此项目依赖 `yarn` 和 `lerna`，请确保你已全局安装这两个包。**

如果这是你刚刚从 Git 仓库克隆下来的项目，请首先安装所有的项目依赖，并执行一次构建。

```
// 安装公共依赖项
yarn install

// 为 packages 中的包安装各自的依赖
lerna bootstrap

// 执行项目构建
yarn build
```

## 添加新的物料

```
yarn add:package -- yourPackageDirectoryName
```

## 快速开始

```
// 开发模式
yarn dev

// 构建所有包
yarn build

// 构建单个包
lerna run build --stream --scope packageName
```

