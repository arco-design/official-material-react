import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Input, Button } from '@arco-design/web-react';
import useMergeValue from '@arco-design/web-react/es/_util/hooks/useMergeValue';
import { isObject, isString, isUndefined } from '@arco-design/web-react/es/_util/is';
import { RefInputType } from '@arco-design/web-react/es/Input/interface';
import { IconClose, IconEyeInvisible, IconEye } from '@arco-design/web-react/icon';
import cs from 'classnames';

import type { VerificationCodeProps } from './interface';

const PREFIX_CLS = 'am-verification-code';

const trimFn = (value?: string | number) => {
  if (!isUndefined(value)) {
    return String(value).trim();
  }
  return '';
};

const getActiveIndex = (value: string[], length: number) => {
  const lengthValue = new Array(length).fill('').map((_, index) => {
    return value[index] || '';
  });

  return lengthValue.findIndex((code) => {
    const validCode = trimFn(code);
    return !validCode;
  });
};

function VerificationCode(props: VerificationCodeProps) {
  const {
    autoFocus = true,
    allowClear,
    password,
    renderSplit = () => '',
    overwrite = true,
    validate,
    size = 'default',
    length = 6,
    className,
    style,
  } = props;

  const [value, setValue] = useMergeValue(new Array(length).fill(''), {
    defaultValue: 'defaultValue' in props ? props.defaultValue : undefined,
    value: 'value' in props ? props.value : undefined,
  });

  const [activeIndex, setActiveIndex] = useState(autoFocus ? getActiveIndex(value, length) : -1);
  const [visibility, setVisibility] = useState(false);

  const inputRef = useRef<Map<number, RefInputType>>(new Map());
  const instanceId = useMemo(() => +new Date(), []);

  const handleComplete = (value: string[], index: number) => {
    if (value.every((code) => trimFn(code))) {
      props.onComplete && props.onComplete(value, index);
    }
  };

  const handleActiveChange = (method: 'focus' | 'blur', currentIndex: number) => {
    if (inputRef.current.has(currentIndex)) {
      const activeInput = inputRef.current.get(currentIndex);
      if (typeof activeInput[method] === 'function') {
        activeInput[method]();
      }
    }
  };

  const handleChange = (index) => (code: string) => {
    const lastValue = [...value];
    const lastCode = trimFn(code).split('').pop();
    const firstCode = trimFn(code).split('').shift();
    const currentValue = value[index];
    if (firstCode !== lastCode && firstCode !== currentValue) {
      lastValue[index] = firstCode;
    } else {
      lastValue[index] = lastCode;
    }
    const isValid = validate && trimFn(lastValue[index]) ? validate(lastValue[index], index) : true;

    if (isValid) {
      setValue(lastValue);
      props.onChange && props.onChange(lastValue, index);
      handleComplete(lastValue, index);
      if (trimFn(lastValue[index])) {
        setActiveIndex(index !== value.length - 1 ? index + 1 : -1);
      }
    }
  };

  const adjustActiveIndex = (currentIndex) => {
    const firstActiveIndex = getActiveIndex(value, length);
    if (firstActiveIndex !== -1 && currentIndex > firstActiveIndex) {
      handleActiveChange('blur', currentIndex);
      setActiveIndex(firstActiveIndex);
      handleActiveChange('focus', firstActiveIndex);
    }
  };

  const handleClear = () => {
    const newValue = new Array(length).fill('');
    setValue(newValue);
    props.onClear && props.onClear();

    if (autoFocus) {
      setActiveIndex(0);
      props.onChange && props.onChange(newValue, 0);
    } else {
      handleActiveChange('blur', activeIndex);
      setActiveIndex(-1);
      props.onChange && props.onChange(newValue, -1);
    }
  };

  const handleVisibleChange = () => {
    setVisibility(!visibility);
    handleActiveChange('focus', activeIndex);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const { key, target } = event;
    if (!target) {
      return;
    }
    let isCodeInput = false;
    const currentIndex = (target as Element).getAttribute('data-verify-input-index');
    const currentInstanceId = (target as Element).getAttribute('data-verify-input-instanceId');
    isCodeInput = isString(currentIndex) && Number(currentInstanceId) === instanceId;
    if (!isCodeInput) {
      return;
    }
    let nextActiveIndex = Number(currentIndex);
    if (key === 'Backspace') {
      const value = (target as Element).getAttribute('value');
      if (!trimFn(value)) {
        nextActiveIndex = Math.max(nextActiveIndex - 1, 0);
      }
    }
    if (key === 'ArrowRight' || key === 'Tab') {
      nextActiveIndex = Math.min(nextActiveIndex + 1, value.length - 1);
    }
    if (key === 'ArrowLeft') {
      nextActiveIndex = Math.max(nextActiveIndex - 1, 0);
    }
    setActiveIndex(nextActiveIndex);
  };

  useEffect(() => {
    handleActiveChange('focus', activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const passwordConfig = password ? (isObject(password) ? password : { showEyeIcon: false }) : {};
  const hasValidValue = value.filter((code) => trimFn(code)).length;
  const InputComponent = password ? Input.Password : Input;
  const classNames = cs(
    PREFIX_CLS,
    {
      [`${PREFIX_CLS}-password`]: password,
    },
    className
  );

  const valueWithLength = useMemo(() => {
    return new Array(length).fill('').map((_, index) => value[index]);
  }, [value, length]);

  return (
    <span className={classNames} style={style}>
      {valueWithLength.map((currentValue, index) => {
        const splitDom = renderSplit(index);
        return (
          <React.Fragment key={index}>
            <InputComponent
              className={cs(`${PREFIX_CLS}-input`, `${PREFIX_CLS}-input-${size}`)}
              key={index}
              ref={(node) => inputRef.current.set(index, node)}
              value={currentValue}
              onChange={(value) => {
                handleChange(index)(value);
              }}
              data-verify-input-instanceId={instanceId}
              data-verify-input-index={index}
              visibility={visibility}
              maxLength={overwrite ? undefined : 1}
              onClick={() => adjustActiveIndex(index)}
              error={props.error}
              readOnly={props.readonly}
              size={size}
              disabled={props.disabled}
            />
            {splitDom}
          </React.Fragment>
        );
      })}
      <Button.Group style={{ verticalAlign: 'top' }}>
        {!!(allowClear && hasValidValue) && (
          <Button onClick={handleClear} type="text" icon={<IconClose />} size={size} />
        )}
        {!!(password && hasValidValue && passwordConfig.showEyeIcon) && (
          <Button
            onClick={handleVisibleChange}
            type="text"
            icon={visibility ? <IconEyeInvisible /> : <IconEye />}
            size={size}
          />
        )}
      </Button.Group>
    </span>
  );
}

export default VerificationCode;

export type { VerificationCodeProps };
