import React, { useState } from 'react';
import GuideTip from '@arco-materials/guide-tip';
import { Button, Space } from '@arco-design/web-react';

export default () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <Space size={30}>
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          点击跳转到 Step2
        </Button>
        <Button className="step1">Step 1 </Button>
        <Button className="step2">Step 2 </Button>
        <Button className="step3">Step 3 </Button>
      </Space>

      <GuideTip
        visible={visible}
        onEnd={() => setVisible(false)}
        steps={[
          {
            title: 'Step 1',
            content: '这里是描述文字这里是描述文字',
            target: () => document.querySelector('.step1'),
          },
          {
            title: 'Step 2',
            content: '这里是描述文字这里是描述文字',
            target: () => document.querySelector('.step2'),
          },
          {
            title: 'Step 3',
            content: '这里是描述文字这里是描述文字',
            target: () => document.querySelector('.step3'),
          },
        ]}
      />
    </div>
  );
};
