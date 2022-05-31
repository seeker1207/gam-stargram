import React, { useCallback, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import { Modal, Image, Button, Form, Menu, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import { login } from '../api/userApi';
import useInput from '../hooks/useInput';

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

const LabelWrapper = styled.label`
  font-weight: 600;
  margin: 4px;
  display: inline-block;
`;

function isValidEmail(inputText: string) {
  if (!inputText) return false;
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return inputText.match(mailFormat);
}
function LoginModal() {
  const [open, setOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('login');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [emailCheck, setEmailCheck] = useState(false);
  const { mutate } = useSWRConfig();
  const inputWrapper = useRef(null);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const onLogin = useCallback(async () => {
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await delay(1000);
    if (isValidEmail(email)) {
      setLoginLoading(true);
      await mutate('/user/login', await login({ email, password }), false);
    } else {
      setEmailCheck(true);
    }
  }, [email, password, mutate]);

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
        <div style={{ display: 'inline-block', position: 'relative', top: '0.1em' }}>
          {activeItem === 'login' ? '에 로그인' : '에 가입하세요'}
        </div>
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
              name="signUp"
              active={activeItem === 'signUp'}
              onClick={handleItemClick}
            >
              회원가입
            </Menu.Item>
          </Menu>
          <Form>
            {activeItem === 'login'
              && (
              <FormFiledWrapper ref={inputWrapper}>
                <Form.Input
                  error={emailCheck && { content: '이메일을 다시 확인해주세요', pointing: 'below' }}
                  fluid
                  type="email"
                  label="이메일"
                  placeholder="이메일"
                  value={email}
                  onChange={onChangeEmail}
                  onKeyDown={onEnterKeyPressEventHandler}
                />
                <Form.Field>
                  <label htmlFor="password">비밀번호</label>
                  <input name="password" value={password} onChange={onChangePassword} type="password" placeholder="Password" onKeyDown={onEnterKeyPressEventHandler} />
                </Form.Field>
              </FormFiledWrapper>
              )}
            {activeItem === 'signUp'
              && (
                <FormFiledWrapper>
                  <Form.Input fluid type="email" label="이메일" placeholder="이메일" />
                  <Form.Input fluid type="password" label="비밀번호" placeholder="비밀번호" />
                  <Form.Input fluid type="password" label="비밀번호 확인" placeholder="비밀번호 확인" />
                  <LabelWrapper>생년월일</LabelWrapper>
                  <Form.Group widths="equal">
                    <Form.Input fluid placeholder="년" />
                    <Form.Field fluid control="select">
                      <option value="1">1월</option>
                      <option value="2">2월</option>
                      <option value="3">3월</option>
                      <option value="4">4월</option>
                      <option value="5">5월</option>
                      <option value="6">6월</option>
                      <option value="7">7월</option>
                      <option value="8">8월</option>
                      <option value="9">9월</option>
                      <option value="10">10월</option>
                      <option value="11">11월</option>
                      <option value="12">12월</option>
                    </Form.Field>
                    <Form.Input fluid placeholder="일" />
                  </Form.Group>

                </FormFiledWrapper>
              )}
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <LoginButtonWrapper>
          <Button
            color="instagram"
            content={activeItem === 'login' ? '로그인' : '회원가입'}
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
