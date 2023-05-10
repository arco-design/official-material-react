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
          },
          {
            title: '2.x',
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
          },
          {
            title: 'Tag',
          },
        ],
      },
      {
        title: 'Data Input',
        editable: true,
        children: [
          {
            title: 'Input',
          },
          {
            title: 'InputNumber',
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
          console.log(data);
          setTreeData(data);
        }}
      />
    </div>
  );
};
