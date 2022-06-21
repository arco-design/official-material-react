import React, { ReactNode } from 'react';
import { Divider, Dropdown, DropdownProps, Menu, MenuProps } from '@arco-design/web-react';

/**
 * @title ContextMenu
 */

export type ItemType =
  | {
      text: ReactNode;
      key: string;
      type: 'item';
      children?: ItemType[];
    }
  | { type: 'divider' };
export interface ContextMenuProps extends DropdownProps {
  children: any;
  /**
   * @zh 菜单项
   */
  items?: ItemType[];
  onClickItem?: MenuProps['onClickMenuItem'];
}

const ContextMenu = (props: ContextMenuProps) => {
  const { children, items, onClickItem, ...rest } = props;

  const loopItems = (_items: ItemType[], parentKey) => {
    return _items.map((item, index) => {
      if (item.type === 'divider') {
        return <Divider className="arco-context-menu-divider" />;
      }
      if (item.children && item.children.length) {
        return (
          <Menu.SubMenu key={item.key} title={item.text}>
            {loopItems(item.children, item.key)}
          </Menu.SubMenu>
        );
      }
      return <Menu.Item key={item.key || `${parentKey || ''}_${index}`}>{item.text}</Menu.Item>;
    });
  };

  const droplist = (
    <Menu className="arco-context-menu" onClickMenuItem={onClickItem}>
      {loopItems(items, '')}
    </Menu>
  );
  return (
    <Dropdown trigger="contextMenu" droplist={droplist} {...rest}>
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
