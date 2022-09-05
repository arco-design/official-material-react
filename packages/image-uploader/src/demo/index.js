/**
 * @file
 * @title ImageUploader
 * @memberOf 数据录入
 * @description 带有裁剪功能的图片上传组件。
 * @author SleepDevil
 * @package @arco-materials/image-uploader
 */

/**
 * @title 基本用法
 * @description 允许同时选中多张图片并进行裁剪，可接受 [Upload](https://arco.design/react/components/upload#api) 组件的所有属性。
 */
export { default as Basic } from './basic';

/**
 * @title 预览裁剪结果
 * @description 通过 `extraCropperContent` 属性，在裁剪区域旁边实时预览最终的裁剪效果。
 */
export { default as ExtraContent } from './extraContent';
