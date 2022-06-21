import React from 'react';
import ProRadio from '@arco-materials/pro-radio';
import { Divider, Space, Typography } from '@arco-design/web-react';

export default () => {
  return (
    <div>
      <div>
        <Typography.Paragraph>基本用法</Typography.Paragraph>
        <Space>
          <ProRadio value="A" checked>
            A
          </ProRadio>
          <ProRadio value="B">B</ProRadio>
          <ProRadio value="C">C</ProRadio>
        </Space>
      </div>
      <Divider />
      <div>
        <Typography.Paragraph>单选框组</Typography.Paragraph>

        <ProRadio.Group options={['A', 'B', 'C']} defaultValue="A" />
      </div>
      <Divider />
      <div>
        <Typography.Paragraph>卡片类型</Typography.Paragraph>
        <Space>
          <ProRadio value="1" checked title="Radio card 1" type="card">
            radio card 1 content
          </ProRadio>
          <ProRadio value="2" title="Radio card 1" type="card">
            radio card 2 content
          </ProRadio>
        </Space>
      </div>
      <Divider />
      <div>
        <Typography.Paragraph>卡片类型单选组</Typography.Paragraph>
        <ProRadio.Group type="card" options={['A', 'B', 'C']} />
        <br />
        <br />
        <ProRadio.Group
          defaultValue={1}
          type="card"
          options={[1, 2, 3].map((x) => {
            return {
              value: x,
              disabled: x < 2,
              title: `Radio card ${x}`,
              label: `radio card ${x} content`,
            };
          })}
        />
      </div>
    </div>
  );
};
