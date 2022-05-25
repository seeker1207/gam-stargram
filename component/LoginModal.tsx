import React, { useState } from 'react';
import { Modal, Image, Header, Button, Form, Checkbox, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const LoginButtonWrapper = styled.div`
  display: inline-block;
  .ui.button {
    background-color: #5829bb  
  }
`;

const FormFiledWrapper = styled.div`
  input:focus {
    border-color: #5829BBFF !important;
  }
`;

function LoginModal(props) {
  const [open, setOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('login');
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="violet">로그인</Button>}
      size="tiny"
      style={loginLoading && { cursor: 'not-allowed' }}
    >
      <Modal.Header style={{ color: '#5829bb' }}>
        <Image src="/gamstar_logo.PNG" size="small" style={{ display: 'inline-block' }} />
        <div style={{ display: 'inline-block', position: 'relative', top: '0.1em' }}>에 로그인</div>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Menu pointing secondary color="violet">
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={handleItemClick}
            >
              로그인
            </Menu.Item>

            <Menu.Item
              name="signIn"
              active={activeItem === 'signIn'}
              onClick={handleItemClick}
            >
              회원가입
            </Menu.Item>
          </Menu>
          <Form>
            <FormFiledWrapper>
              <Form.Field>
                <label>아이디</label>
                <input placeholder="ID" />
              </Form.Field>
              <Form.Field>
                <label>비밀번호</label>
                <input placeholder="Password" />
              </Form.Field>
            </FormFiledWrapper>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <LoginButtonWrapper>
          <Button
            color="instagram"
            content="로그인"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setLoginLoading(true)}
            loading={loginLoading}
            disabled={loginLoading}
            positive
          />
        </LoginButtonWrapper>
        <Button color="black" onClick={() => setOpen(false)}>
          취소
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default LoginModal;
