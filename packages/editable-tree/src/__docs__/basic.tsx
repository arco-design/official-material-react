import React, { useState } from 'react';
import EditableTree, { EditableTreeProps } from '@arco-materials/editable-tree';

const INITIAL_TREE_DATA: EditableTreeProps['treeData'] = [
  {
    title: 'Guide',
    editable: true,
    children: [
      {
        title: 'Quick Start',
      },
      {
        title: 'Changelog',
        editable: true,
        children: [
          {
            title: '1.x',
            editable: { delete: true },
          },
          {
            title: '2.x',
            editable: { delete: true },
          },
        ],
      },
    ],
  },
  {
    title: 'Components',
    editable: true,
    children: [
      {
        title: 'Common',
        editable: true,
        children: [
          {
            title: 'Button',
            editable: { delete: true },
          },
          {
            title: 'Tag',
            editable: { delete: true },
          },
        ],
      },
      {
        title: 'Data Input',
        editable: true,
        children: [
          {
            title: 'Input',
            editable: { delete: true },
          },
          {
            title: 'InputNumber',
            editable: { delete: true },
          },
        ],
      },
    ],
  },
];

export default () => {
  const [treeData, setTreeData] = useState(INITIAL_TREE_DATA);
  return (
    <div>
      <EditableTree
        blockNode
        draggable
        treeData={treeData}
        onChange={(data) => {
          console.log(`EditableTree data changed: `, data);
          setTreeData(data);
        }}
      />
    </div>
  );
};
