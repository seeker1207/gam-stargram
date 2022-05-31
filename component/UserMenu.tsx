import React, { useState } from 'react';
import { Input, Label, Menu } from 'semantic-ui-react';

function UserMenu() {
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu vertical>
      <Menu.Item
        name="myPhoto"
        active={activeItem === 'spam'}
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
        active={activeItem === 'inbox'}
        onClick={handleItemClick}
      >
        로그아웃
      </Menu.Item>
    </Menu>
  );
}

export default UserMenu;
