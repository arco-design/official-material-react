import React from 'react';
import ProRadio from '@arco-materials/pro-radio';

export default () => {
  return (
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
  );
};
