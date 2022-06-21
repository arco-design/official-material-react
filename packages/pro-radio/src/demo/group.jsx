import React from 'react';
import ProRadio from '@arco-materials/pro-radio';

export default () => {
  return <ProRadio.Group options={['A', 'B', 'C']} defaultValue="A" />;
};
