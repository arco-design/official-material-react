import React from 'react';
import WaterMarket from '@arco-materials/watermark';
import { Typography } from '@arco-design/web-react';

const { Title, Paragraph } = Typography;

const node = (
  <div style={{ height: '400px' }}>
    <Title heading={2}>设置wmId后会监听dom变化</Title>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
    <Paragraph>设置wmId后会监听dom变化， 水印dom无法通过控制台删除</Paragraph>
  </div>
);

export default () => {
  return (
    <div>
      <WaterMarket
        content="机密！严禁外传！"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.15)' }}
        wmId="text"
      >
        {node}
      </WaterMarket>
      <WaterMarket
        image="https://raw.githubusercontent.com/yuhan0709/blog/7fede48cd490d27e857b00f94584c10083cc7370/src/assets/watermark.svg"
        width={115}
        height={18}
        wmId="image"
      >
        {node}
      </WaterMarket>
    </div>
  );
};
