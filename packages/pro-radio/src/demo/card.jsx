import React from 'react';
import ProRadio from '@arco-materials/pro-radio';
import { Space } from '@arco-design/web-react';

export default () => {
  return (
    <Space>
      <ProRadio value="1" checked title="Radio card 1" type="card">
        radio card 1 content
      </ProRadio>
      <ProRadio value="2" title="Radio card 1" type="card">
        radio card 2 content
      </ProRadio>
    </Space>
  );
};
