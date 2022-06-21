import React from 'react';
import { Select } from '@arco-design/web-react';
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
    <>
      <SelectWithCheckAll
        style={{ width: 400, marginRight: 20 }}
        allowClear
        defaultValue={groupedOptions[0].options}
        groupedOptions={groupedOptions}
      />
      <SelectWithCheckAll
        style={{ width: 400 }}
        allowClear
        placeholder="Pass options via children"
      >
        <Select.OptGroup label="number">
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
        </Select.OptGroup>
      </SelectWithCheckAll>
    </>
  );
};
