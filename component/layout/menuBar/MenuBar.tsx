import React, { useState } from 'react';
import { Icon, Image, Input, Menu } from 'semantic-ui-react';
import Link from 'next/link';
import { MenuWrapper, LoginMenuWrapper, SearchBarWrapper, LogoWrapper } from './MenuBar.styles';
import LoginModal from '../../../features/loginUser/loginModal/LoginModal';
import UserProfile from '../../../features/loginUser/UserProfile';

function MenuBar({ isLoggedOut } : { isLoggedOut: boolean }) {
  const [, setVisible] = useState(false);

  return (
    <Menu secondary>
      <Menu.Menu position="left">
        <Menu.Item>
          <MenuWrapper onClick={() => setVisible((prev) => !prev)}>
            <Icon link circular inverted color="violet" name="align justify" size="large" />
            <span>Menu</span>
          </MenuWrapper>
        </Menu.Item>
        <LogoWrapper>
          <Menu.Item>
            <Link href="/" passHref>
              <Image src="/gamstar_logo.PNG" size="small" />
            </Link>
          </Menu.Item>
        </LogoWrapper>
      </Menu.Menu>
      <Menu.Menu position="right">
        <SearchBarWrapper>
          <Menu.Item>
            <Input icon="search" placeholder="게임을 검색해보세요..." />
          </Menu.Item>
        </SearchBarWrapper>
        <LoginMenuWrapper>
          <Menu.Item>
            {isLoggedOut ? <LoginModal /> : <UserProfile />}
          </Menu.Item>
        </LoginMenuWrapper>
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
