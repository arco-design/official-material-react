import React from 'react';
import { Table, TableColumnProps } from '@arco-design/web-react';
import ResizeTableTitle, { resizeCols } from '@arco-materials/resize-table-title';

const originColumns: TableColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 120,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: 180,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 180,
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];

export default () => {
  // 第一步：使用resizeCols转化原column
  const columns = resizeCols(originColumns);

  // 第二步：Table增加components
  const components = {
    header: {
      th: ResizeTableTitle,
    },
  };

  return (
    <div>
      <Table components={components} columns={columns} data={data} />
    </div>
  );
};
