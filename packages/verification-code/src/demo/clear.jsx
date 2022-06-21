import React from 'react';
import { Space, Typography } from '@arco-design/web-react';
import VerifyCode from '@arco-materials/verification-code';

export default () => {
  return (
    <Space direction="vertical">
      <div>
        <Typography.Text bold>基础模式：</Typography.Text>
        <VerifyCode allowClear />
      </div>
      <div>
        <Typography.Text bold>密码模式：</Typography.Text>
        <VerifyCode password={{ showEyeIcon: true }} allowClear />
      </div>
    </Space>
  );
};
