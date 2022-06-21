import { RadioGroupProps, RadioProps } from '@arco-design/web-react';
import React, { ReactNode } from 'react';

/**
 * @title ProRadio
 */
export interface ProRadioProps extends Omit<RadioProps, 'title'> {
  /**
   * @zh 类型
   */
  type?: 'card';
  /**
   * @zh 标题
   */
  title?: ReactNode;
  /**
   * @zh 自定义遮罩层渲染方式
   */
  maskRender?: (dom: ReactNode, checked: boolean) => ReactNode;
}

/**
 * @title ProRadio.Group
 */
export interface ProRadioGroupProps extends Omit<RadioGroupProps, 'type' | 'options'> {
  maskRender?: (dom: ReactNode, checked: boolean) => ReactNode;
  type?: 'card' | 'radio' | 'button';
  children?: ReactNode;
  options?: (
    | RadioGroupProps['options'][number]
    | {
        label: React.ReactNode;
        title: React.ReactNode;
        value: any;
        disabled?: boolean;
      }
  )[];
}
