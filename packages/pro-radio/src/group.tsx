import React, { ReactNode } from 'react';
import { Radio, RadioGroupProps } from '@arco-design/web-react';
import ProRadio from './radio';
import { PropRadioGroupContext } from './context';

/**
 * @title ProRadio.Group
 */
export interface ProRadioGroupProps extends Omit<RadioGroupProps, 'type' | 'options'> {
  maskRender?: (dom: ReactNode, checked: boolean) => ReactNode;
  type?: 'card' | 'radio' | 'button';
  children?: ReactNode;
  options?: (
    | RadioGroupProps['options'][number]
    | {
        label: React.ReactNode;
        title: React.ReactNode;
        value: any;
        disabled?: boolean;
      }
  )[];
}

const ProRadioGroup = (props: ProRadioGroupProps) => {
  const { options, type, maskRender, ...rest } = props;

  return (
    <PropRadioGroupContext.Provider value={{ maskRender, type }}>
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
    </PropRadioGroupContext.Provider>
  );
};

export default ProRadioGroup;
