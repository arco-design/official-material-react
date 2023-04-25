import { CSSProperties } from 'react';
import type { ResizableProps } from 'react-resizable';

/**
 * @title ResizeTableTitle
 */
export type ResizeTableTitleProps = ResizableProps & {
  /**
   * @zh Arco Column的定位属性，固定头和列到左边或者右边
   * @defaultValue -
   * @version 1.0.0
   */
  fixed?: string;
  /**
   * @zh 组件上的style样式
   * @defaultValue {}
   * @version 1.0.0
   */
  style?: CSSProperties;
};
