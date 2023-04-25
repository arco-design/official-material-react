import React from 'react';
import SelectWithCheckAll from '@arco-materials/select-with-check-all';

export default () => {
  const groupedOptions = [
    { label: 'Number', options: [1, 2, 3, 4] },
    { label: 'Chinese', options: ['一', '二', '三', '四'] },
    {
      label: 'English',
      options: ['One', 'Two', 'Three', { label: 'Four', value: 'Four', disabled: true }],
    },
  ];
  return (
    <SelectWithCheckAll
      style={{ width: 400 }}
      allowClear
      defaultValue={groupedOptions[0].options}
      groupedOptions={groupedOptions}
      checkAll={(checkbox, { checked, indeterminate }) => (
        <div
          style={{
            marginTop: -4,
            marginBottom: 4,
            padding: '8px 12px 6px 12px',
            background: 'var(--color-fill-2)',
            borderBottom: '1px solid var(--color-border-2)',
            color: 'var(--color-text-2)',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {checkbox} {checked ? 'All checked' : indeterminate ? 'Partially checked' : 'Check all'}
        </div>
      )}
      checkGroup={(checkbox, _, label) => (
        <div
          style={{
            margin: '0 -5px 4px -5px',
            padding: '4px 8px',
            borderBottom: '2px solid rgb(var(--arcoblue-5))',
          }}
        >
          {label} {checkbox}
        </div>
      )}
    />
  );
};
