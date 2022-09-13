import React, { ReactElement, useState } from 'react';
import { Button, Grid, GridRow, Icon, Image, Input, Menu, Rail, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import LoginModal from './LoginModal';
import useLoginUser from '../hooks/useUser';
import UserProfile from './UserProfile';

const LayoutWrapper = styled.div`
  margin: 0 auto!important;
  max-width: 2000px;
`;

const ImageWrapper = styled.div`
  @media all and (max-width:1250px) {
    display: none;
  }
  .small.image {
    width: 200px;
  }
  
`;
const MenuWrapper = styled.div`
  cursor: pointer;

  span {
    margin-left: 5px;
    color: #6435c9;
    font-weight: bold;
    font-size: large;
  }
`;

const MenuGridWrapper = styled(GridRow)`
  margin-top: 2em;
  .row:first-of-type {
    position: fixed;
    z-index: 10;
    background: white;
    margin: 0 auto;
    max-width: 2000px;
  }
  
`;

const LoginMenuWrapper = styled.div`
  @media all and (max-width:800px) {
    display: none;
  }
  display: flex;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  @media all and (max-width:580px){
    display: none;
  }
  display: flex;
  align-items: center;
`;

const GridColumnWrapper = styled(Grid.Column)`
  margin: 0 4% !important;
  padding: 0 !important;
  @media all and (max-width: 800px) {
    max-width: 98%;
  }
`;
export default function Layout({ children } : {children : ReactElement}) {
  const [visible, setVisible] = useState(false);
  const { isLoggedOut } = useLoginUser();
  return (
    <LayoutWrapper>
      <MenuGridWrapper>
        <Grid>
          <GridColumnWrapper width={16}>
            <Menu secondary>
              <Menu.Menu position="left">
                <Menu.Item>
                  <MenuWrapper onClick={() => setVisible((prev) => !prev)}>
                    <Icon link circular inverted color="violet" name="align justify" size="large" />
                    <span>Menu</span>
                  </MenuWrapper>
                </Menu.Item>
                <ImageWrapper>
                  <Menu.Item>
                    <Link href="/" passHref>
                      <Image src="/gamstar_logo.PNG" size="small" />
                    </Link>
                  </Menu.Item>
                </ImageWrapper>
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
          </GridColumnWrapper>
        </Grid>
      </MenuGridWrapper>

      <Grid>

        <GridColumnWrapper width={16}>
          <Sidebar.Pushable style={{ transform: 'none' }}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              style={{ position: 'fixed', width: '15em' }}
              color="violet"
            >
              <Menu.Item color="purple" as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="gamepad" />
                Games
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="camera" />
                Channels
              </Menu.Item>

            </Sidebar>

            <Sidebar.Pusher>
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </GridColumnWrapper>
      </Grid>
    </LayoutWrapper>
  );
}
