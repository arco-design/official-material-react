/**
 * @file
 * @name @arco-materials/watermark
 * @memberOf 信息展示！
 * @description 通用水印组件，可给指定 dom 添加水印内容
 * @author yuhan0709
 * @package @arco-materials/watermark
 */

/**
 * @name 基本用法
 * @description 可设置 `content` 或 `image` 添加简单水印
 */
export { default as Basic } from './basic';

/**
 * @name 指定生效容器
 * @description 可指定 `container` 设置水印生效容器， `水印` 将作为 `container` 的第一个子节点
 */
export { default as Container } from './container';

/**
 * @name 更新水印
 * @description
 */
export { default as Config } from './config';

/**
 * @name 防篡改
 * @description 指定 `wmId` 作为 水印唯一标识，前端将会通过 `MutationObserver` 做简单防篡改
 */
export { default as Locked } from './locked';
