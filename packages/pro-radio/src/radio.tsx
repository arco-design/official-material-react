import React, { useContext } from 'react';
import { Radio } from '@arco-design/web-react';
import { ProRadioGroupContext } from './context';
import type { ProRadioProps } from './interface';

const PREFIX_CLS = 'am-pro-radio';

const defaultProps = {
  maskRender: (dom) => dom,
};

const ProRadio = (props: ProRadioProps, _) => {
  const context = useContext(ProRadioGroupContext);
  const { title, type: propType, children, maskRender: propMaskRender, ...rest } = props;
  const type = propType || context.type;
  const maskRender = propMaskRender || context.maskRender || defaultProps.maskRender;

  return type === 'card' ? (
    <Radio {...rest} className={[PREFIX_CLS].concat(rest.className)}>
      {({ checked }) => {
        const cardPrefixCls = `${PREFIX_CLS}-card`;

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
    <Radio {...rest} className={[PREFIX_CLS].concat(rest.className)}>
      {children}
    </Radio>
  );
};

export default React.forwardRef(ProRadio);
