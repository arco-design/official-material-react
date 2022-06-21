import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { Checkbox, Select, SelectProps } from '@arco-design/web-react';
import { SelectHandle } from '@arco-design/web-react/es/Select/interface';

import { SelectWithCheckAllProps } from './interface';

const defaultProps: Partial<SelectWithCheckAllProps> = {
  checkAll: (checkbox) => (
    <div
      style={{
        padding: '6px 12px',
        borderBottom: '1px solid var(--color-border-1)',
        color: 'var(--color-text-2)',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      Check All {checkbox}
    </div>
  ),
  checkGroup: true,
};

type OptionCheckedInfo = {
  validOptionValues: any[];
  checked: boolean;
  indeterminate: boolean;
};

const _SelectWithCheckAll = (props: SelectWithCheckAllProps, ref) => {
  const {
    defaultValue,
    groupedOptions,
    options,
    children,
    checkAll,
    checkGroup,
    dropdownRender,
    onChange,
    ...rest
  } = props;

  const [stateValue, setValue] = useState(
    'value' in props ? props.value : 'defaultValue' in props ? props.defaultValue : []
  );
  const refSelect = useRef<SelectHandle>(null);
  const value = 'value' in props ? props.value : stateValue;

  const optionCheckedInfo: OptionCheckedInfo & { groupCheckedInfo?: Array<OptionCheckedInfo> } =
    useMemo(() => {
      const getOptionCheckedInfo = (options: SelectProps['options']): OptionCheckedInfo => {
        const validGroupOptionValues = [];
        for (const option of options) {
          if (typeof option === 'object') {
            if (!option.disabled) {
              validGroupOptionValues.push(option.value);
            }
          } else {
            validGroupOptionValues.push(option);
          }
        }

        const countOptionChecked = value.filter(
          (item) => validGroupOptionValues.indexOf(item) > -1
        ).length;

        return {
          validOptionValues: validGroupOptionValues,
          checked: countOptionChecked > 0 && countOptionChecked === validGroupOptionValues.length,
          indeterminate:
            countOptionChecked > 0 && countOptionChecked < validGroupOptionValues.length,
        };
      };

      if (Array.isArray(groupedOptions)) {
        const groupCheckedInfo = groupedOptions.map(({ options }) => getOptionCheckedInfo(options));
        const checked = groupCheckedInfo.every(({ checked }) => checked);
        const indeterminate =
          !checked &&
          groupCheckedInfo.some(({ indeterminate, checked }) => indeterminate || checked);
        return {
          groupCheckedInfo,
          checked,
          indeterminate,
          validOptionValues: groupCheckedInfo.reduce(
            (current, { validOptionValues }) => current.concat(validOptionValues),
            []
          ),
        };
      }

      if (Array.isArray(options)) {
        return getOptionCheckedInfo(options);
      }

      return null;
    }, [groupedOptions, options, value]);

  const tryUpdateValue = useCallback(
    (value, option = null) => {
      setValue(value);
      if (onChange) {
        if (option === null) {
          option = value.map((v) => refSelect.current.getOptionInfoByValue(v));
        }
        onChange(value, option);
      }
    },
    [onChange]
  );

  const checkOptions = useCallback(
    (optionValues: any[], checked: boolean) => {
      const newValue = checked
        ? [...new Set(value.concat(optionValues))]
        : value.filter((v) => optionValues.indexOf(v) === -1);
      tryUpdateValue(newValue);
    },
    [value]
  );

  const usedChildren = useMemo(() => {
    if (Array.isArray(groupedOptions) && optionCheckedInfo) {
      return groupedOptions.map(({ label, options }, index) => {
        const { groupCheckedInfo } = optionCheckedInfo;
        const { validOptionValues, checked, indeterminate } = groupCheckedInfo[index];
        const checkboxProps = {
          checked,
          indeterminate,
          onChange: (checked) => checkOptions(validOptionValues, checked),
        };
        const checkbox = <Checkbox {...checkboxProps} />;

        return (
          <Select.OptGroup
            key={`__group_${index}`}
            label={
              checkGroup ? (
                typeof checkGroup === 'function' ? (
                  checkGroup(checkbox, checkboxProps, label)
                ) : (
                  <>
                    {label} {checkbox}
                  </>
                )
              ) : (
                label
              )
            }
          >
            {options.map((option) => {
              if (typeof option === 'object') {
                const { label, value, extra, disabled } = option;
                return (
                  <Select.Option key={value} value={value} extra={extra} disabled={!!disabled}>
                    {label}
                  </Select.Option>
                );
              }

              return <Select.Option key={option} value={option} />;
            })}
          </Select.OptGroup>
        );
      });
    }

    return children;
  }, [groupedOptions, checkOptions]);

  const usedDropdownRender = (optionList: ReactNode) => {
    if (!optionCheckedInfo) {
      return optionList;
    }

    const { validOptionValues, checked, indeterminate } = optionCheckedInfo;
    const checkboxProps = {
      checked,
      indeterminate,
      onChange: (checked) => checkOptions(validOptionValues, checked),
    };
    const checkbox = <Checkbox {...checkboxProps} />;

    return dropdownRender ? (
      dropdownRender(optionList, { checkbox, checkboxProps })
    ) : (
      <>
        {typeof checkAll === 'function' ? checkAll(checkbox, checkboxProps) : checkbox}
        {optionList}
      </>
    );
  };

  return (
    <Select
      {...rest}
      ref={(_ref) => {
        ref = _ref;
        refSelect.current = ref;
      }}
      mode="multiple"
      labelInValue={false}
      defaultValue={defaultValue as any}
      value={value as any}
      onChange={tryUpdateValue}
      dropdownRender={
        checkAll ? (list) => usedDropdownRender(list) : (list) => dropdownRender(list)
      }
    >
      {usedChildren}
    </Select>
  );
};

const SelectWithCheckAll = React.forwardRef<unknown, SelectWithCheckAllProps>(_SelectWithCheckAll);

SelectWithCheckAll.defaultProps = defaultProps;

SelectWithCheckAll.displayName = 'SelectWithCheckAll';

export default SelectWithCheckAll;

export type { SelectWithCheckAllProps };
