import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Select } from '@arco-design/web-react';
import { IconEmpty, IconSearch } from '@arco-design/web-react/icon';
import { DocSearchProps } from './interface';
import enUS from './locale/en-US';

const PREFIX_CLS = 'am-doc-search';

const DocSearch = (props: DocSearchProps) => {
  const {
    data = [],
    hotkey = { key: 'k', metaKey: true },
    locale = enUS,
    onVisibleChange,
    onSearch,
    onNavigate,
    selectProps,
  } = props;
  const [stateVisible, setVisible] = useState(props.visible || false);
  const visible = 'visible' in props ? props.visible : stateVisible;

  const tryChangeVisible = (newVisible) => {
    setVisible(newVisible);
    onVisibleChange && onVisibleChange(newVisible);
  };

  const globalHotkeyHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      tryChangeVisible(false);
      return;
    }

    let needShow = true;
    Object.entries(hotkey).forEach(([param, value]) => {
      if (event[param] !== value) {
        needShow = false;
      }
    });
    needShow && tryChangeVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', globalHotkeyHandler);

    return () => {
      window.removeEventListener('keydown', globalHotkeyHandler);
    };
  }, []);

  const selectChildren = useMemo(() => {
    return Object.entries(data).map(([title, options], index) => {
      return (
        <Select.OptGroup key={index} label={title}>
          {options.map(({ text, href }, index) => {
            return (
              <Select.Option
                className={index === options.length - 1 ? `${PREFIX_CLS}-option-tail` : ''}
                value={href}
              >
                {text}
              </Select.Option>
            );
          })}
        </Select.OptGroup>
      );
    });
  }, [JSON.stringify(data)]);

  return (
    <Select
      className={PREFIX_CLS}
      value={undefined}
      showSearch
      placeholder={locale.tipStartSearch}
      suffixIcon={<IconSearch />}
      children={selectChildren}
      popupVisible={visible}
      triggerProps={{
        className: `${PREFIX_CLS}-popup`,
      }}
      notFoundContent={
        <div className={`${PREFIX_CLS}-no-result`}>
          <IconEmpty />
          <p>{locale.tipNoSearchResult}</p>
        </div>
      }
      {...selectProps}
      onVisibleChange={(visible) => {
        selectProps?.onVisibleChange?.(visible);
        tryChangeVisible(visible);
      }}
      onSearch={(inputValue, reason) => {
        selectProps?.onSearch?.(inputValue, reason);
        onSearch?.(inputValue, reason);
      }}
      onChange={(value, option) => {
        selectProps?.onChange?.(value, option);
        onNavigate?.(value);
      }}
    />
  );
};

export default DocSearch;
