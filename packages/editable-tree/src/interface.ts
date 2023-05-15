import type { ReactNode } from 'react';
import type { TreeProps } from '@arco-design/web-react';

/**
 * @title EditableTree
 */
export interface EditableTreeProps extends Partial<TreeProps> {
  /**
   * @zh 提示文本
   * @en Tip texts
   */
  tips?: {
    editNode?: ReactNode;
    insertNode?: ReactNode;
    insertRootNode?: ReactNode;
    deleteNode?: ReactNode;
    deleteAll?: ReactNode;
  };

  /**
   * @zh 树数据改变时的回调
   * @en Callback for tree data changed
   */
  onChange?: (treeData: TreeProps['treeData']) => void;
}
