import React from 'react';
import { Message } from '@arco-design/web-react';
import ContextMenu from '@arco-materials/context-menu';

export default () => {
  return (
    <ContextMenu
      onClickItem={(key) => {
        Message.info(`点击了${key}`);
      }}
      items={[
        {
          key: 'open',
          text: '新标签页打开',
        },
        {
          key: 'copy',
          text: '复制图片',
        },
        {
          key: 'copy_addr',
          text: '复制图片地址',
        },
        {
          key: 'download',
          text: '图片存储为...',
        },
        {
          type: 'divider',
        },
        {
          key: 'more',
          text: '发送到',
          children: [
            {
              key: 'email',
              text: '邮件',
            },
            {
              key: 'lark',
              text: 'Lark',
            },
          ],
        },
      ]}
    >
      <img
        style={{ width: 200 }}
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      />
    </ContextMenu>
  );
};
