import React, { useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Modal, Image, Button, Form, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { getUserFetcher, login } from '../api/userApi';
import useInput from '../hooks/useInput';
import useLoginUser from '../hooks/useUser';

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

function LoginModal() {
  const [open, setOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('login');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { mutate } = useSWRConfig();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const onLogin = useCallback(async () => {
    setLoginLoading(true);
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000);
    await mutate('/user/login', await login({ email, password }), false);
  }, [email, password]);

  const onEnterKeyPressEventHandler = useCallback((e) => {
    if (e.code === 'Enter') {
      onLogin();
    }
  }, [onLogin]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="violet">로그인</Button>}
      size="tiny"
      style={loginLoading ? { cursor: 'not-allowed' } : {}}
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
                <label htmlFor="email">이메일</label>
                <input name="email" value={email} onChange={onChangeEmail} type="email" placeholder="Email" onKeyDown={onEnterKeyPressEventHandler} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">비밀번호</label>
                <input name="password" value={password} onChange={onChangePassword} type="password" placeholder="Password" onKeyDown={onEnterKeyPressEventHandler} />
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
            onClick={() => onLogin()}
            loading={loginLoading}
            disabled={loginLoading}
            positive
            htmlType="submit"
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
