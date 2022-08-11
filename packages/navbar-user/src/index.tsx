import React, { ReactNode, useMemo } from 'react';
import cs from 'classnames';
import { Avatar, AvatarProps, Divider, Dropdown, Menu } from '@arco-design/web-react';
import { NavbarUserAction, NavbarUserProps } from './interface';

const PREFIX_CLS = 'am-navbar-user';

const NavbarUser = (props: NavbarUserProps) => {
  const { name, avatar, dropdownProps, actions = [], onActionClick } = props;

  const { avatarUrl, avatarProps } = useMemo<{
    avatarUrl: string;
    avatarProps: AvatarProps;
  }>(() => {
    if (avatar) {
      if (typeof avatar === 'object') {
        const { url: avatarUrl, ...avatarProps } = avatar;
        return {
          avatarUrl,
          avatarProps,
        };
      }

      return {
        avatarUrl: avatar,
        avatarProps: {},
      };
    }

    return {
      avatarUrl: null,
      avatarProps: {},
    };
  }, [JSON.stringify(avatar)]);

  const menuItemList = useMemo<ReactNode[]>(() => {
    const result = [];

    const fillMenuItem = (item: NavbarUserAction) => {
      const { key, label, disabled } = item as NavbarUserAction;
      result.push(
        <Menu.Item disabled={disabled} key={key}>
          {label}
        </Menu.Item>
      );
    };

    actions.forEach((action) => {
      if (Array.isArray(action)) {
        result.push(<Divider />);
        action.forEach(fillMenuItem);
      } else {
        fillMenuItem(action);
      }
    });
    return result;
  }, [actions]);

  const eleAvatar = (
    <Avatar {...avatarProps} className={cs(PREFIX_CLS, avatarProps?.className)}>
      {avatarUrl ? <img alt="user_avatar" src={avatarUrl} /> : name}
    </Avatar>
  );

  return (
    <Dropdown
      droplist={
        <Menu className={`${PREFIX_CLS}-menu`} onClickMenuItem={(key) => onActionClick?.(key)}>
          <div className={`${PREFIX_CLS}-menu-title`}>
            {eleAvatar}
            <span className={`${PREFIX_CLS}-menu-title-username`}>{name}</span>
          </div>
          {menuItemList}
        </Menu>
      }
      {...dropdownProps}
    >
      {eleAvatar}
    </Dropdown>
  );
};

export default NavbarUser;
