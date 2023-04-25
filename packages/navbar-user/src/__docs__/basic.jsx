import React, { useState } from 'react';
import { Message } from '@arco-design/web-react';
import { IconBook, IconExport } from '@arco-design/web-react/icon';
import NavbarUser from '@arco-materials/navbar-user';

export default () => {
  const [popupVisible, setPopupVisible] = useState(true);

  return (
    <NavbarUser
      name="Helium Helium Helium Helium Helium Helium Helium"
      avatar={{
        url: 'https://avatars.githubusercontent.com/u/29861850?v=4',
        size: 24,
      }}
      dropdownProps={{ popupVisible, onVisibleChange: setPopupVisible }}
      actions={[
        [
          {
            key: 'material',
            label: (
              <>
                <IconBook style={{ marginRight: 6 }} /> 我的物料
              </>
            ),
          },
          {
            key: 'logout',
            label: (
              <>
                <IconExport style={{ marginRight: 6 }} /> 退出登录
              </>
            ),
          },
        ],
      ]}
      onActionClick={(key) => Message.info(`You clicked ${key}`)}
    />
  );
};
