import React, { CSSProperties } from 'react';
import { InputProps } from '@arco-design/web-react';
import InputCode from './inputCode';

/**
 * @title InputCode
 */
export interface InputCodeProps {
  /**
   * @zh 输入框的个数，`value.length > 0` 的情况下会采用 `value` 的 length
   * @defaultValue 6
   */
  length?: number;
  /**
   * @zh 输入框之间的分隔符，会在索引为 `index` 的输入框后渲染分隔符。
   */
  renderSplit?: (index) => React.ReactNode;
  /**
   * @zh 值变化时的回调
   */
  onChange?: (value: string[], index: number) => void;
  /**
   * @zh 值清空时的回调
   */
  onClear: () => void;
  /**
   * @zh 所有输入框都有值时的回调
   */
  onComplete?: (value: string[], index: number) => void;
  /**
   * @zh 是否禁用
   */
  disabled?: boolean;
  /**
   * @zh 是否是错误状态
   */
  error?: boolean;
  /**
   * @zh 是否允许清空
   */
  allowClear?: boolean;
  /**
   * @zh 值，受控模式
   */
  value?: string[];
  /**
   * @zh 默认值
   */
  defaultValue?: string[];
  /**
   * @zh 是否只读
   */
  readonly?: boolean;
  /**
   * @zh 是否是 password 模式
   */
  password?: boolean | { showEyeIcon?: boolean };
  /**
   * @zh 是否自动聚焦第一个无值的输入框
   */
  autoFocus?: boolean;
  /**
   * @zh 在某个输入框有值情况下再输入是否覆盖
   * @defaultValue true
   */
  overwrite?: boolean;
  size?: InputProps['size'];
  /**
   * @zh 验证当前输入框的值是否有效
   */
  validate?: (code: string, index) => boolean;
  className?: string | string[];
  style?: CSSProperties;
}

function VerifyCode(props: InputCodeProps) {
  return <InputCode {...props} />;
}

export default VerifyCode;
