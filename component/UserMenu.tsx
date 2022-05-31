import React, { useCallback, useState } from 'react';
import { Input, Label, Menu } from 'semantic-ui-react';
import { mutate } from 'swr';
import { logout } from '../api/userApi';

function UserMenu() {
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = useCallback(() => {
    console.log('11');
  }, []);

  const onLogoutButtonClick = useCallback(async () => {
    await logout();
    await mutate('/user/login');
  }, []);

  return (
    <Menu vertical>
      <Menu.Item
        name="myPhoto"
        active={activeItem === 'myPhoto'}
        onClick={handleItemClick}
      >
        내 사진
      </Menu.Item>

      <Menu.Item
        name="updates"
        active={activeItem === 'updates'}
        onClick={handleItemClick}
      >
        <Label color="violet">1</Label>
        관심 게이머 사진
      </Menu.Item>
      <Menu.Item
        name="loggedOut"
        onClick={onLogoutButtonClick}
      >
        로그아웃
      </Menu.Item>
    </Menu>
  );
}

export default UserMenu;
