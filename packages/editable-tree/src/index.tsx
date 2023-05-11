import React, { useMemo, useState } from 'react';
import cs from 'classnames';
import { IconEdit, IconPlus, IconMinus } from '@arco-design/web-react/icon';
import { Tree, TreeProps, Popconfirm, Input } from '@arco-design/web-react';
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface';

import type { EditableTreeProps } from './interface';

const DEFAULT_TIPS: EditableTreeProps['tips'] = {
  editNode: 'Edit node title',
  deleteNode: 'Are you sure to delete this node?',
  insertNode: 'Insert a new node',
};

function walkTreeNodeData(
  data: TreeDataType[],
  targetKey: string,
  callback: (item: TreeDataType, index: number, arr: TreeDataType[], path: string) => void,
  path = ''
) {
  data.some((item, index, arr) => {
    const nodePath = path ? `${path}-${index}` : `${index}`;

    if (!targetKey || item.key === targetKey) {
      callback(item, index, arr, nodePath);

      if (targetKey) {
        return true;
      }
    }

    if (item.children) {
      return walkTreeNodeData(item.children, targetKey, callback, nodePath);
    }
  });
}

export default function EditableTree(props: EditableTreeProps) {
  const prefixCls = 'am-editable-tree';
  const { tips, onChange, ...treeProps } = props;
  const [treeData, setTreeData] = useState<TreeProps['treeData']>(treeProps.treeData || []);
  const [editingNodeTitle, setEditingNodeTitle] = useState<string>(null);
  const [addingNodeTitle, setAddingNodeTitle] = useState<string>(null);

  const tryUpdateTreeData = (nextTreeData: TreeProps['treeData']) => {
    setTreeData(nextTreeData);
    onChange?.(nextTreeData);
  };

  const mergeTips = { ...DEFAULT_TIPS, ...tips };

  const mergedTreeData = useMemo(() => {
    const merged = [...(treeProps?.treeData || treeData)];
    walkTreeNodeData(merged, null, (item, _index, _arr, nodePath) => {
      item.key = nodePath;
    });
    return merged;
  }, [treeProps?.treeData, treeData]);

  return (
    <Tree
      {...treeProps}
      className={cs(prefixCls, treeProps.className)}
      treeData={mergedTreeData}
      renderExtra={(node) => {
        const eleExtraFromProps = treeProps?.renderExtra?.(node);
        return (node as any).editable || eleExtraFromProps ? (
          <div className={`${prefixCls}-node-icon-group`}>
            {eleExtraFromProps}
            <Popconfirm
              className={`${prefixCls}-node-edit-confirm`}
              icon={null}
              title={mergeTips.editNode}
              content={<Input defaultValue={node.title as string} onChange={setEditingNodeTitle} />}
              onOk={() => {
                const nextTreeData = [...mergedTreeData];
                walkTreeNodeData(nextTreeData, node._key, (item) => {
                  item.title = editingNodeTitle;
                });
                tryUpdateTreeData(nextTreeData);
              }}
              onCancel={() => {
                setEditingNodeTitle(null);
              }}
            >
              <IconEdit />
            </Popconfirm>
            <Popconfirm
              className={`${prefixCls}-node-edit-confirm`}
              icon={null}
              title={mergeTips.insertNode}
              content={<Input onChange={setAddingNodeTitle} />}
              onOk={() => {
                const nextTreeData = [...mergedTreeData];
                walkTreeNodeData(nextTreeData, node._key, (item) => {
                  item.children ||= [];
                  item.children.push({
                    title: addingNodeTitle,
                    key: `${node._key}-${item.children.length}`,
                    editable: true,
                  });
                });
                tryUpdateTreeData(nextTreeData);
              }}
            >
              <IconPlus />
            </Popconfirm>
            <Popconfirm
              icon={null}
              title={mergeTips.deleteNode}
              onOk={() => {
                const nextTreeData = [...mergedTreeData];
                walkTreeNodeData(nextTreeData, node._key, (_item, index, arr) => {
                  arr.splice(index, 1);
                });
                tryUpdateTreeData(nextTreeData);
              }}
            >
              <IconMinus />
            </Popconfirm>
          </div>
        ) : null;
      }}
      onDrop={(info) => {
        const { dragNode, dropNode, dropPosition } = info;
        const nextTreeData = [...mergedTreeData];

        let dragItem: TreeDataType;
        let dragItemIndex: number;
        let dragItemSiblings: TreeDataType[] = [];
        walkTreeNodeData(nextTreeData, dragNode.props._key, (item, index, arr) => {
          dragItem = item;
          dragItemIndex = index;
          dragItemSiblings = arr;
          dragItem.className = 'tree-node-dragged';
        });

        if (dropPosition === 0) {
          // Move dragging node to drop node's children list
          if ((dropNode.props as any).editable) {
            dragItemSiblings.splice(dragItemIndex, 1);
            walkTreeNodeData(nextTreeData, dropNode.props._key, (item) => {
              item.children = item.children || [];
              item.children.push(dragItem);
            });
          }
        } else {
          dragItemSiblings.splice(dragItemIndex, 1);
          walkTreeNodeData(nextTreeData, dropNode.props._key, (_, index, arr) => {
            arr.splice(dropPosition < 0 ? index : index + 1, 0, dragItem);
          });
        }

        tryUpdateTreeData(nextTreeData);
        setTimeout(() => {
          dragItem.className = '';
        }, 1000);

        treeProps?.onDrop?.(info);
      }}
    />
  );
}

export type { EditableTreeProps };
