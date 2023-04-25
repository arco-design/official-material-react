import React from 'react';
import { Space } from '@arco-design/web-react';
import VerifyCode from '@arco-materials/verification-code';
import { IconMinus } from '@arco-design/web-react/icon';

export default () => {
  return (
    <Space>
      <VerifyCode
        renderSplit={(index) => {
          if (index === 2) {
            return (
              <span style={{ color: 'var(--color-text-3)', padding: '0 4px' }}>
                <IconMinus />
              </span>
            );
          }
        }}
      />
    </Space>
  );
};
