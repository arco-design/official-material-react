import React from 'react';
import { Radio } from '@arco-design/web-react';
import ProRadio from './radio';
import { ProRadioGroupContext } from './context';
import type { ProRadioGroupProps } from './interface';

const ProRadioGroup = (props: ProRadioGroupProps) => {
  const { options, type, maskRender, ...rest } = props;

  return (
    <ProRadioGroupContext.Provider value={{ maskRender, type }}>
      <Radio.Group {...rest}>
        {options
          ? options.map((option) => {
              const item =
                Object.prototype.toString.call(option) === '[object Object]'
                  ? option
                  : ({ value: option, title: option } as any);

              return (
                <ProRadio key={item.value} {...item}>
                  {item.label}
                </ProRadio>
              );
            })
          : rest.children}
      </Radio.Group>
    </ProRadioGroupContext.Provider>
  );
};

export default ProRadioGroup;
