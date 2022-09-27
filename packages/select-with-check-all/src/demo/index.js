/**
 * @file
 * @title SelectWithCheckAll
 * @memberOf 数据录入
 * @description 带有全选、分组选择的 Select 扩展组件。
 * @author MisterLuffy
 * @package @arco-materials/select-with-check-all
 */

/**
 * @title 基本用法
 * @description 通过 `groupedOptions` 传入选项以支持全选，通过 `children` 传入的选项不支持此功能。
 */
export { default as Basic } from './basic';

/**
 * @title 自定义复选框渲染
 * @description 为 `checkAll` 和 `checkGroup` 传入函数，自定义复选框渲染方式。
 */
export { default as CustomRender } from './customRender';

/**
 * @title 自定义下拉列表渲染
 * @description 通过经过扩展的 `dropdownRender` 实现带有全选功能的下拉框。
 */
export { default as CustomDropdown } from './customDropdown';
