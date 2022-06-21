/**
 * @file
 * @name VerificationCode
 * @memberOf 数据录入
 * @description 输入验证码。
 * @author yuhan0709
 * @package @arco-materials/verification-code
 */

/**
 * @name 基本用法
 */
export { default as Basic } from './basic';

/**
 * @name 分隔符
 * @description 通过 `renderSplit` 可自定义分隔符。
 */
export { default as SplitRender } from './splitRender';

/**
 * @name 后置操作
 * @description 可以设置 `allowClear`, `password.showEyeIcon` 展示操作按钮。
 */
export { default as Clear } from './clear';

/**
 * @name 自定义校验规则
 */
export { default as Validate } from './validate';

/**
 * @name 受控模式
 */
export { default as Controlled } from './controlled';

/**
 * @name 作为表单控件使用
 */
export { default as Form } from './form';
