import React from 'react';
import { Button } from '@arco-design/web-react';
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
      dropdownRender={(list, { checkboxProps: { checked, onChange } }) => (
        <>
          {list}
          <div
            style={{
              padding: '6px 12px 2px 12px',
              borderTop: '1px solid var(--color-border-1)',
              textAlign: 'right',
            }}
          >
            {checked ? (
              <Button size="mini" onClick={() => onChange(false)}>
                Unselect All
              </Button>
            ) : (
              <Button size="mini" type="primary" onClick={() => onChange(true)}>
                Select All
              </Button>
            )}
          </div>
        </>
      )}
    />
  );
};
