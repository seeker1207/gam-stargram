import React, { ReactElement, useState } from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

function SideBar({ children } : {children : ReactElement}) {
  const [visible, setVisible] = useState(false);
  return (
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
  );
}

export default SideBar;
