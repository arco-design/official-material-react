import React from 'react';
import { Divider, Dropdown, Menu } from '@arco-design/web-react';
import type { ItemType, ContextMenuProps } from './inferface';

const PREFIX_CLS = 'am-context-menu';

const ContextMenu = (props: ContextMenuProps) => {
  const { children, items = [], menuProps, onClickItem, ...rest } = props;

  const loopItems = (_items: ItemType[], parentKey) => {
    return _items.map((item, index) => {
      if (item.type === 'divider') {
        return <Divider key={`divider_${index}`} className={`${PREFIX_CLS}-divider`} />;
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
    <Menu {...menuProps} onClickMenuItem={onClickItem}>
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

export type { ContextMenuProps };
