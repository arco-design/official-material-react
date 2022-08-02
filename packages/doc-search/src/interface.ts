import { ReactNode } from 'react';
import { SelectProps } from '@arco-design/web-react';
import enUS from './locale/en-US';

type HotkeyDescription = {
  key: string;
  altKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
};

/**
 * @title DocSearch
 */
export interface DocSearchProps {
  /**
   * @zh 是否展示搜索面板
   */
  visible?: boolean;
  /**
   * @zh 自定义显示弹窗的快捷键
   * @defaultValue `{ metaKey: true, key: 'k' }`
   */
  hotkey?: HotkeyDescription;
  /**
   * @zh 搜索结果的数据源
   */
  data?: Record<
    string,
    Array<{
      text: ReactNode;
      href: string;
    }>
  >;
  /**
   * @zh 国际化文本
   */
  locale?: typeof enUS;
  /**
   * @zh 接受 Select 组件的属性
   */
  selectProps?: SelectProps;
  /**
   * @zh 搜索面板显示/隐藏时的回调
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 文本搜索时的回调
   */
  onSearch?: SelectProps['onSearch'];
  /**
   * @zh 跳转链接时的回调
   */
  onNavigate?: (href: string) => void;
}
