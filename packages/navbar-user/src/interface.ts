import { AvatarProps, DropdownProps } from '@arco-design/web-react';
import { ReactNode } from 'react';

/**
 * @title NavbarUserAction
 */
export type NavbarUserAction = {
  /**
   * @zh 菜单项的唯一标识符
   */
  key: string;
  /**
   * @zh 菜单项文本
   */
  label: ReactNode;
  /**
   * @zh 是否禁用此菜单项
   */
  disabled?: boolean;
};

/**
 * @title NavbarUser
 */
export interface NavbarUserProps {
  /**
   * @zh 用户名
   */
  name?: string;
  /**
   * @zh 头像地址，或 Avatar 组件属性
   */
  avatar?: string | ({ url: string } & AvatarProps);
  /**
   * @zh Dropdown 组件属性
   */
  dropdownProps?: DropdownProps;
  /**
   * @zh 设定下拉菜单的内容
   */
  actions?: NavbarUserAction[] | NavbarUserAction[][];
  /**
   * @zh 点击菜单项时的回调
   */
  onActionClick?: (actionKey: string) => void;
}
