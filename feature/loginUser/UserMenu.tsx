import React, { useCallback } from 'react';
import { Label, Menu } from 'semantic-ui-react';
import { mutate } from 'swr';
import { logout } from '../../api/userApi';
import PostMyPhotoModal from '../post/PostMyPhotoModal';

function UserMenu() {
  const handleItemClick = useCallback(() => {
    console.log('11');
  }, []);

  const onLogoutButtonClick = useCallback(async () => {
    await logout();
    await mutate('/user/loginUser');
  }, []);

  return (
    <Menu vertical>
      <Menu.Item
        name="myPhoto"
        onClick={handleItemClick}
      >
        내 사진
      </Menu.Item>

      <Menu.Item
        name="updates"
        onClick={handleItemClick}
      >
        <Label color="violet">1</Label>
        관심 게이머 사진
      </Menu.Item>
      <PostMyPhotoModal />
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
