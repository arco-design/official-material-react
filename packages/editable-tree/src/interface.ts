import type { ReactNode } from 'react';
import type { TreeProps } from '@arco-design/web-react';
import type { NodeProps, TreeDataType } from '@arco-design/web-react/es/Tree/interface';

export type EditableTreeDataType = TreeDataType & {
  editable?:
    | boolean
    | {
        insert?: boolean;
        delete?: boolean;
        rename?: boolean;
      };
};

/**
 * @title EditableTree
 */
export interface EditableTreeProps extends Partial<TreeProps> {
  /**
   * @zh 经过拓展的 Arco `TreeProps['treeData]`
   * @en Arco `TreeProps['treeData]` with extra properties
   */
  treeData?: EditableTreeDataType[];

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
   * @zh 二次确认话术
   * @en Text for confirm
   */
  confirms?: {
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

  /**
   * @zh 节点删除回调
   * @en Callback for node delete
   */
  onNodeDelete?: (node: NodeProps) => void;
}
