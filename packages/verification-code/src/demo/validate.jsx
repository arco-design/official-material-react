import React from 'react';
import { Space, Typography } from '@arco-design/web-react';
import VerifyCode from '@arco-materials/verification-code';

export default () => {
  const validate = (code, index) => {
    let reg = /[0-9]/;
    if (index % 2 === 0) {
      reg = /[A-Za-z]/;
    }
    return new RegExp(reg).test(code);
  };

  return (
    <Space direction="vertical">
      <Typography.Text>奇数位：数字；偶数位：字母</Typography.Text>
      <div>
        <Typography.Text bold>基础模式：</Typography.Text>
        <VerifyCode validate={validate} />
      </div>
      <div>
        <Typography.Text bold>密码模式：</Typography.Text>
        <VerifyCode validate={validate} />
      </div>
    </Space>
  );
};
