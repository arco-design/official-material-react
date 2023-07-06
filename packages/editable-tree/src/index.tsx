import React, {
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import cs from 'classnames';
import { nanoid } from 'nanoid';
import { IconEdit, IconPlus, IconDelete } from '@arco-design/web-react/icon';
import {
  Tree,
  TreeProps,
  Popconfirm,
  Input,
  InputProps,
  Tooltip,
  Empty,
  Popover,
  PopoverProps,
  Button,
} from '@arco-design/web-react';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import type { EditableTreeDataType, EditableTreeHandle, EditableTreeProps } from './interface';

import IconEnterKey from './assets/enter-key.svg';

const DEFAULT_TIPS: EditableTreeProps['tips'] = {
  editNode: 'Edit title',
  deleteNode: 'Delete',
  insertNode: 'Insert a node',
  insertRootNode: 'Insert a root node',
  deleteAll: 'Delete all',
};

const DEFAULT_CONFIRM_TEXTS: EditableTreeProps['confirms'] = {
  editNode: 'Edit node title',
  insertNode: 'Insert a new node',
  insertRootNode: 'Insert a new root node',
  deleteAll: 'Are you sure to delete all these tree nodes?',
  cancel: 'Cancel',
};

type PopupInputProps = PropsWithChildren<
  {
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    inputProps?: Partial<InputProps>;
    texts?: { cancel?: string };
    onChange?: (value: string) => void;
    onOK?: (value: string) => void;
  } & PopoverProps
>;

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

function PopupInput(props: PopupInputProps) {
  const {
    placeholder,
    inputProps,
    value: propValue,
    defaultValue,
    texts,
    onChange,
    onOK,
    ...popoverProps
  } = props;
  const refInput = useRef<RefInputType>(null);
  const [visible, setVisible] = useState(false);
  const [stateValue, setStateValue] = useState(defaultValue || '');
  const value = 'value' in props ? propValue : stateValue;

  useEffect(() => {
    if (visible) {
      refInput.current?.focus();
    }
  }, [visible]);

  const triggerVisibleChange = (_visible: boolean) => {
    setVisible(_visible);
    props?.onVisibleChange?.(_visible);
  };

  const triggerOnOK = () => {
    onOK?.(value);
    triggerVisibleChange(false);
  };

  const triggerCancel = () => {
    triggerVisibleChange(false);
  };

  return (
    <Popover
      trigger="click"
      popupVisible={visible}
      content={
        <>
          <Input
            ref={refInput}
            placeholder={placeholder}
            value={value}
            suffix={<IconEnterKey />}
            {...inputProps}
            onChange={(nextValue, ...args) => {
              setStateValue(nextValue);
              onChange?.(nextValue);
              inputProps?.onChange?.(nextValue, ...args);
            }}
            onPressEnter={(...args) => {
              triggerOnOK();
              inputProps?.onPressEnter?.(...args);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                triggerCancel();
              }
            }}
          />
          <Button onClick={() => triggerCancel()}>{texts.cancel}</Button>
        </>
      }
      {...popoverProps}
      onVisibleChange={(nextVisible) => {
        setVisible(nextVisible);
        popoverProps?.onVisibleChange?.(nextVisible);
      }}
    />
  );
}

export default React.forwardRef<unknown, EditableTreeProps>(function EditableTree(
  props: EditableTreeProps,
  ref
) {
  const prefixCls = 'am-editable-tree';
  const {
    editable: treeEditable,
    tips,
    confirms,
    editableTreeIcons,
    renderHeader,
    onChange,
    onNodeDelete,
    ...treeProps
  } = props;

  const [stateTreeData, setStateTreeData] = useState<TreeProps['treeData']>(
    treeProps.treeData || []
  );
  const [expandKeys, setExpandKeys] = useState<string[]>([]);
  const [editingNodeKey, setEditingNodeKey] = useState<string>(null);

  const tryUpdateTreeData = (nextTreeData: TreeProps['treeData']) => {
    setStateTreeData(nextTreeData);
    onChange?.(nextTreeData);
  };

  useImperativeHandle<unknown, EditableTreeHandle>(
    ref,
    () => {
      return {
        expandAll: (data = treeProps.treeData) => {
          const keys: string[] = [];
          const walkTreeNodes = (data: EditableTreeProps['treeData']) => {
            if (Array.isArray(data)) {
              for (const node of data) {
                keys.push(node.key);
                if (Array.isArray(node.children)) {
                  walkTreeNodes(node.children);
                }
              }
            }
          };

          walkTreeNodes(data);
          setExpandKeys(keys);
        },
      };
    },
    [treeProps.treeData]
  );

  const mergedTips = { ...DEFAULT_TIPS, ...tips };
  const mergedConfirmTexts = { ...DEFAULT_CONFIRM_TEXTS, ...confirms };
  const mergedTreeData = useMemo(() => {
    const merged = [...(treeProps?.treeData || stateTreeData)];
    walkTreeNodeData(merged, null, (item) => {
      item.key = item.key || nanoid();
    });
    return merged;
  }, [treeProps?.treeData, stateTreeData]);

  const commonPopoverProps: Partial<PopupInputProps> = {
    className: `${prefixCls}-node-edit-popover`,
    texts: {
      cancel: mergedConfirmTexts.cancel,
    },
  };

  const mergedIcons: EditableTreeProps['editableTreeIcons'] = {
    insert: <IconPlus />,
    delete: <IconDelete />,
    edit: <IconEdit />,
    headerInsert: <IconPlus />,
    headerClear: <IconDelete />,
    ...editableTreeIcons,
  };

  const mergedRenderHeader = () => {
    const eleIconInsert = treeEditable ? (
      <PopupInput
        {...commonPopoverProps}
        placeholder={mergedConfirmTexts.insertRootNode}
        onOK={(value) => {
          const nextTreeData = [
            ...mergedTreeData,
            {
              title: value,
              key: nanoid(),
              editable: true,
              children: [],
            },
          ];
          tryUpdateTreeData(nextTreeData);
        }}
      >
        <Tooltip content={mergedTips.insertRootNode}>{mergedIcons.headerInsert}</Tooltip>
      </PopupInput>
    ) : null;

    const eleIconClear = treeEditable ? (
      <Popconfirm
        icon={null}
        title={mergedConfirmTexts.deleteAll}
        onOk={() => tryUpdateTreeData([])}
      >
        <Tooltip content={mergedTips.deleteAll}>{mergedIcons.headerClear}</Tooltip>
      </Popconfirm>
    ) : null;

    if (typeof renderHeader === 'function') {
      return renderHeader({ insert: eleIconInsert, clear: eleIconClear });
    }

    return (
      <>
        {eleIconInsert}
        {eleIconClear}
      </>
    );
  };

  return (
    <div className={`${prefixCls}-wrapper`}>
      <div className={`${prefixCls}-header`}>{mergedRenderHeader()}</div>

      {mergedTreeData?.length ? (
        <Tree
          {...treeProps}
          expandedKeys={expandKeys}
          onExpand={setExpandKeys}
          className={cs(prefixCls, treeProps.className)}
          treeData={mergedTreeData}
          renderExtra={(_node) => {
            if (!treeEditable) {
              return null;
            }

            const node = _node as EditableTreeDataType;
            const eleExtraFromProps = treeProps?.renderExtra?.(node);
            const editable = node.editable;

            return editable || eleExtraFromProps ? (
              <div
                className={`${prefixCls}-node-icon-group`}
                style={node._key === editingNodeKey ? { display: 'block' } : {}}
              >
                {eleExtraFromProps}

                {editable === true || (editable && editable.rename) ? (
                  <PopupInput
                    {...commonPopoverProps}
                    defaultValue={node.title as string}
                    placeholder={mergedConfirmTexts.editNode}
                    onVisibleChange={(visible) => {
                      setEditingNodeKey(visible ? node._key : null);
                      commonPopoverProps?.onVisibleChange?.(visible);
                    }}
                    onOK={(value) => {
                      const nextTreeData = [...mergedTreeData];
                      walkTreeNodeData(nextTreeData, node._key, (item) => {
                        item.title = value;
                      });
                      tryUpdateTreeData(nextTreeData);
                    }}
                  >
                    <Tooltip content={mergedTips.editNode}>{mergedIcons.edit}</Tooltip>
                  </PopupInput>
                ) : null}

                {editable === true || (editable && editable.insert) ? (
                  <PopupInput
                    {...commonPopoverProps}
                    placeholder={mergedConfirmTexts.insertNode}
                    onVisibleChange={(visible) => {
                      setEditingNodeKey(visible ? node._key : null);
                    }}
                    onOK={(value) => {
                      const nextTreeData = [...mergedTreeData];
                      walkTreeNodeData(nextTreeData, node._key, (item) => {
                        item.children ||= [];
                        item.children.push({
                          title: value,
                          key: nanoid(),
                          editable: true,
                          children: [],
                        });
                      });
                      tryUpdateTreeData(nextTreeData);
                    }}
                  >
                    <Tooltip content={mergedTips.insertNode}>{mergedIcons.insert}</Tooltip>
                  </PopupInput>
                ) : null}

                {editable === true || (editable && editable.delete) ? (
                  <Tooltip content={mergedTips.deleteNode}>
                    <span
                      onClick={() => {
                        const nextTreeData = [...mergedTreeData];
                        walkTreeNodeData(nextTreeData, node._key, (_item, index, arr) => {
                          arr.splice(index, 1);
                        });
                        tryUpdateTreeData(nextTreeData);
                        onNodeDelete?.(_node);
                      }}
                    >
                      {mergedIcons.delete}
                    </span>
                  </Tooltip>
                ) : null}
              </div>
            ) : null;
          }}
          onDragStart={(...args) => {
            const [, node] = args;
            const nodeKeys = node.props._key;
            const index = expandKeys.indexOf(nodeKeys);

            if (index > -1) {
              const _expandKeys = [...expandKeys];
              _expandKeys.splice(index, 1);
              setExpandKeys(_expandKeys);
            }

            treeProps?.onDragStart?.(...args);
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
});

export type { EditableTreeProps, EditableTreeDataType };
