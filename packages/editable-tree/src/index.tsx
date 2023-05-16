import React, { useMemo, useState } from 'react';
import cs from 'classnames';
import { IconEdit, IconPlus, IconMinus, IconDelete } from '@arco-design/web-react/icon';
import {
  Tree,
  TreeProps,
  Popconfirm,
  Input,
  PopconfirmProps,
  InputProps,
  Tooltip,
  Empty,
} from '@arco-design/web-react';

import type { EditableTreeDataType, EditableTreeProps } from './interface';

const DEFAULT_TIPS: EditableTreeProps['tips'] = {
  editNode: 'Edit title',
  deleteNode: 'Delete',
  insertNode: 'Insert a node',
  insertRootNode: 'Insert a root node',
  deleteAll: 'Delete all',
};

const DEFAULT_CONFIRM_TEXTS: EditableTreeProps['confirms'] = {
  editNode: 'Edit node title',
  deleteNode: 'Are you sure to delete this node?',
  insertNode: 'Insert a new node',
  insertRootNode: 'Insert a new root node',
  deleteAll: 'Are you sure to delete all these tree nodes?',
};

function walkTreeNodeData(
  data: EditableTreeDataType[],
  targetKey: string,
  callback: (
    item: EditableTreeDataType,
    index: number,
    arr: EditableTreeDataType[],
    path: string
  ) => void,
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
  const { tips, confirms, onChange, onNodeDelete, ...treeProps } = props;
  const [treeData, setTreeData] = useState<TreeProps['treeData']>(treeProps.treeData || []);
  const [editingNodeTitle, setEditingNodeTitle] = useState<string>(null);
  const [addingNodeTitle, setAddingNodeTitle] = useState<string>(null);

  const tryUpdateTreeData = (nextTreeData: TreeProps['treeData']) => {
    setTreeData(nextTreeData);
    onChange?.(nextTreeData);
  };

  const mergedTips = { ...DEFAULT_TIPS, ...tips };
  const mergedConfirmTexts = { ...DEFAULT_CONFIRM_TEXTS, ...confirms };

  const mergedTreeData = useMemo(() => {
    const merged = [...(treeProps?.treeData || treeData)];
    walkTreeNodeData(merged, null, (item, _index, _arr, nodePath) => {
      item.key = item.key || nodePath;
    });
    return merged;
  }, [treeProps?.treeData, treeData]);

  const commonPopconfirmProps: Partial<PopconfirmProps> = {
    icon: null,
    className: `${prefixCls}-node-edit-confirm`,
  };
  const commonInputProps: Partial<InputProps> = {
    size: 'mini',
  };

  return (
    <div className={`${prefixCls}-wrapper`}>
      <div className={`${prefixCls}-header`}>
        <Popconfirm
          {...commonPopconfirmProps}
          title={mergedConfirmTexts.insertRootNode}
          content={<Input {...commonInputProps} onChange={setAddingNodeTitle} />}
          onOk={() => {
            const nextTreeData = [
              ...mergedTreeData,
              {
                title: addingNodeTitle,
                key: `${mergedTreeData.length}`,
                editable: true,
                children: [],
              },
            ];
            tryUpdateTreeData(nextTreeData);
          }}
        >
          <Tooltip content={mergedTips.insertRootNode}>
            <IconPlus />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          {...commonPopconfirmProps}
          title={mergedConfirmTexts.deleteAll}
          onOk={() => {
            tryUpdateTreeData([]);
          }}
        >
          <Tooltip content={mergedTips.deleteAll}>
            <IconDelete />
          </Tooltip>
        </Popconfirm>
      </div>

      {treeData?.length ? (
        <Tree
          {...treeProps}
          className={cs(prefixCls, treeProps.className)}
          treeData={mergedTreeData}
          renderExtra={(_node) => {
            const node = _node as EditableTreeDataType;
            const eleExtraFromProps = treeProps?.renderExtra?.(node);
            const editable = node.editable;

            return editable || eleExtraFromProps ? (
              <div className={`${prefixCls}-node-icon-group`}>
                {eleExtraFromProps}

                {editable === true || (editable && editable.rename) ? (
                  <Popconfirm
                    {...commonPopconfirmProps}
                    title={mergedConfirmTexts.editNode}
                    content={
                      <Input
                        {...commonInputProps}
                        defaultValue={node.title as string}
                        onChange={setEditingNodeTitle}
                      />
                    }
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
                    <Tooltip content={mergedTips.editNode}>
                      <IconEdit />
                    </Tooltip>
                  </Popconfirm>
                ) : null}

                {editable === true || (editable && editable.insert) ? (
                  <Popconfirm
                    {...commonPopconfirmProps}
                    title={mergedConfirmTexts.insertNode}
                    content={<Input {...commonInputProps} onChange={setAddingNodeTitle} />}
                    onOk={() => {
                      const nextTreeData = [...mergedTreeData];
                      walkTreeNodeData(nextTreeData, node._key, (item) => {
                        item.children ||= [];
                        item.children.push({
                          title: addingNodeTitle,
                          key: `${node._key}-${item.children.length}`,
                          editable: true,
                          children: [],
                        });
                      });
                      tryUpdateTreeData(nextTreeData);
                    }}
                  >
                    <Tooltip content={mergedTips.insertNode}>
                      <IconPlus />
                    </Tooltip>
                  </Popconfirm>
                ) : null}

                {editable === true || (editable && editable.delete) ? (
                  <Popconfirm
                    {...commonPopconfirmProps}
                    title={mergedConfirmTexts.deleteNode}
                    onOk={() => {
                      const nextTreeData = [...mergedTreeData];
                      walkTreeNodeData(nextTreeData, node._key, (_item, index, arr) => {
                        arr.splice(index, 1);
                      });
                      tryUpdateTreeData(nextTreeData);
                      onNodeDelete?.(_node);
                    }}
                  >
                    <Tooltip content={mergedTips.deleteNode}>
                      <IconMinus />
                    </Tooltip>
                  </Popconfirm>
                ) : null}
              </div>
            ) : null;
          }}
          onDrop={(info) => {
            const { dragNode, dropNode, dropPosition } = info;
            const nextTreeData = [...mergedTreeData];

            let dragItem: EditableTreeDataType;
            let dragItemIndex: number;
            let dragItemSiblings: EditableTreeDataType[] = [];
            walkTreeNodeData(nextTreeData, dragNode.props._key, (item, index, arr) => {
              dragItem = item;
              dragItemIndex = index;
              dragItemSiblings = arr;
              dragItem.className = 'tree-node-dragged';
            });

            if (dropPosition === 0) {
              // Move dragging node to drop node's children list
              if (Array.isArray(dropNode.props.dataRef.children)) {
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
      ) : (
        <Empty />
      )}
    </div>
  );
}

export type { EditableTreeProps, EditableTreeDataType };
