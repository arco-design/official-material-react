import React, { ReactNode, useContext } from 'react';
import { Radio, RadioProps } from '@arco-design/web-react';
import { PropRadioGroupContext } from './context';

/**
 * @title ProRadio
 */
export interface ProRadioProps extends Omit<RadioProps, 'title'> {
  title?: ReactNode;
  maskRender?: (dom: ReactNode, checked: boolean) => ReactNode;
  type?: 'card';
}

const defaultProps = {
  maskRender: (dom) => dom,
};

const ProRadio = (props: ProRadioProps, _) => {
  const context = useContext(PropRadioGroupContext);
  const { title, type: propType, children, maskRender: propMaskRender, ...rest } = props;
  const prefixCls = 'arco-pro-radio';
  const type = propType || context.type;
  const maskRender = propMaskRender || context.maskRender || defaultProps.maskRender;

  return type === 'card' ? (
    <Radio {...rest} className={[prefixCls].concat(rest.className)}>
      {({ checked }) => {
        const cardPrefixCls = `${prefixCls}-card`;

        const classnames = [
          `${cardPrefixCls}`,
          checked ? `${cardPrefixCls}-checked` : '',
          rest.disabled ? `${cardPrefixCls}-disabled` : '',
        ];

        const maskDom = maskRender(
          <div className={`${cardPrefixCls}-mask-wrapper`}>
            <div className={`${cardPrefixCls}-mask`}>
              <div className={`${cardPrefixCls}-mask-dot`} />
            </div>
          </div>,
          checked
        );

        return (
          <div className={classnames.filter(Boolean).join(' ')}>
            {maskDom}
            <div className={`${cardPrefixCls}-main`}>
              {title && <div className={`${cardPrefixCls}-title`}>{title}</div>}
              {children !== null && children !== undefined && (
                <div className={`${cardPrefixCls}-content`}>{children}</div>
              )}
            </div>
          </div>
        );
      }}
    </Radio>
  ) : (
    <Radio {...rest} className={[prefixCls].concat(rest.className)}>
      {children}
    </Radio>
  );
};

export default React.forwardRef(ProRadio);
