import { ReactNode } from 'react';
import { DropdownProps, MenuProps } from '@arco-design/web-react';

export type ItemType =
  | {
      text: ReactNode;
      key: string;
      type: 'item';
      children?: ItemType[];
    }
  | { type: 'divider' };

/**
 * @title ContextMenu
 */
export interface ContextMenuProps extends DropdownProps {
  children: any;
  /**
   * @zh 菜单项
   */
  items?: ItemType[];
  /**
   * @zh 传递 `Menu` 组件的所有属性
   */
  menuProps?: MenuProps;
  /**
   * @zh 点击菜单项时的回调
   */
  onClickItem?: MenuProps['onClickMenuItem'];
}
