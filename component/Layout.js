import React, { useState } from 'react';
import { Button, Grid, Icon, Image, Input, Menu, Sidebar } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';

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

function Layout({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <Grid divided>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src="https://react.semantic-ui.com//images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column width={10}>
          <Menu secondary>
            <Menu.Menu position="left">
              <Menu.Item>
                <MenuWrapper onClick={() => setVisible((prev) => !prev)}>
                  <Icon circular inverted color="violet" name="align justify" size="large" />
                  <span>Menu</span>
                </MenuWrapper>
              </Menu.Item>
              <ImageWrapper>
                <Menu.Item>
                  <Link href="/" passHref>
                    <Image src="/gam_logo.PNG" size="small" />
                  </Link>
                </Menu.Item>
              </ImageWrapper>
            </Menu.Menu>
            <Menu.Menu position="right">
              <SearchBarWrapper>
                <Menu.Item>
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>
              </SearchBarWrapper>
              <LoginMenuWrapper>
                <Menu.Item>
                  <Button color="violet">로그인</Button>
                </Menu.Item>
              </LoginMenuWrapper>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src="https://react.semantic-ui.com//images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>

        <Grid.Column width={3}>
          <Image src="https://react.semantic-ui.com//images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column width={10}>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item as="a">
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
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src="https://react.semantic-ui.com//images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Layout;
