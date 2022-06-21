import React from 'react';
import ProRadio from '@arco-materials/pro-radio';
import { Space } from '@arco-design/web-react';

export default () => {
  return (
    <Space>
      <ProRadio value="A" checked>
        A
      </ProRadio>
      <ProRadio value="B">B</ProRadio>
      <ProRadio value="C">C</ProRadio>
    </Space>
  );
};
