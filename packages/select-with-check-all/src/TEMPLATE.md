---
file: index,interface
---

**此组件对 [Arco Select](https://arco.design/react/components/select) 进行了二次封装，与标准 `Select` 组件相比有以下限制：**

* 仅支持多选模式，如需使用单选模式，请直接使用标准 `Select` 组件；
* 不支持 `labelInValue` 属性；
* 对 `defaultValue`、`value` 属性的 TS 定义进行了调整，仅允许传入 `Array<string | number>`；
* 新增了 `groupedOptions` 属性以方便快速传入含有分组信息的可选项数据，也仅有通过 `groupedOptions` 传入的选项数据才支持全选的功能。

## 属性/Props

%%Props%%

## Demos

%%Demos%%
