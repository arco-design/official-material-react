import React, { useState } from 'react';
import { Message } from '@arco-design/web-react';
import DocSearch from '@arco-materials/doc-search';

const MOCK_DATA = {
  Guide: [
    {
      text: 'Quick Start. This is a very long paragraph text. This is a very long paragraph text. This is a very long paragraph text.',
      href: '/quick_start',
    },
    { text: 'Change Log', href: '/change_log' },
  ],
  Component: [
    { text: 'Select', href: '/component/select' },
    { text: 'Table', href: '/component/Table' },
    { text: 'Form', href: '/component/Form' },
    { text: 'Menu', href: '/component/Menu' },
  ],
};

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <DocSearch
      selectProps={{ style: { width: 320 } }}
      visible={visible}
      data={MOCK_DATA}
      onVisibleChange={setVisible}
      onNavigate={(href) => {
        Message.info(`Navigate to ${href}`);
      }}
    />
  );
};
