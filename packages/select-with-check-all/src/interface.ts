import { ReactNode } from 'react';
import {
  CheckboxProps,
  SelectOptionGroupProps,
  SelectOptionProps,
  SelectProps,
} from '@arco-design/web-react';

type CustomCheckboxRender = (
  checkbox: ReactNode,
  checkboxProps: Pick<CheckboxProps, 'checked' | 'indeterminate' | 'onChange'>,
  label?: ReactNode
) => ReactNode;

/**
 * @title SelectWithCheckAll
 */
export interface SelectWithCheckAllProps
  extends Omit<SelectProps, 'labelInValue' | 'mode' | 'defaultValue' | 'value'> {
  /**
   * @zh 选择器的默认值
   * @en To set default value
   */
  defaultValue?: Array<SelectOptionProps['value']>;
  /**
   * @zh 选择器的值（受控模式）
   * @en To set value
   */
  value?: Array<SelectOptionProps['value']>;
  /**
   * @zh 通过数组传入分组的选项数据
   * @en Pass in the grouped option data through an array
   */
  groupedOptions?: Array<{
    label: SelectOptionGroupProps['label'];
    options: SelectProps['options'];
  }>;
  /**
   * @zh 是否允许全选
   * @en Whether to allow select all
   * @default true
   */
  checkAll?: boolean | CustomCheckboxRender;
  /**
   * @zh 是否允许选中分组
   * @en Select whether to allow selected groups
   * @default true
   */
  checkGroup?: boolean | CustomCheckboxRender;
  /**
   * @zh 扩展下拉菜单
   * @en Custom render dropdown
   */
  dropdownRender?: (
    optionList: ReactNode,
    checkAll?: {
      checkbox: ReactNode;
      checkboxProps: Pick<CheckboxProps, 'checked' | 'indeterminate' | 'onChange'>;
    }
  ) => ReactNode;
}
