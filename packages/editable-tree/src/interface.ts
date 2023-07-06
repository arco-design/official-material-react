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
   * @zh 是否允许编辑
   * @en Weather this tree is editable
   */
  editable?: boolean;

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
    editNode?: string;
    insertNode?: string;
    insertRootNode?: string;
    deleteAll?: string;
    cancel?: string;
  };

  /**
   * @zh 自定义图标
   * @en Customize icons
   * @version 1.3.0
   */
  editableTreeIcons?: {
    edit?: ReactNode;
    insert?: ReactNode;
    delete?: ReactNode;
    headerInsert?: ReactNode;
    headerClear?: ReactNode;
  };

  /**
   * @zh 自定义标题区域渲染
   * @en Customize header render
   * @version 1.3.0
   */
  renderHeader?: (nodes: { insert: ReactNode; clear: ReactNode }) => ReactNode;

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

/**
 * @title EditableTreeHandle
 */
export type EditableTreeHandle = {
  expandAll: (treeData?: TreeProps['treeData']) => void;
};
