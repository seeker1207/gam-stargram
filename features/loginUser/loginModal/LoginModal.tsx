import React, { ChangeEventHandler, useCallback, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  Modal,
  Button,
  Form,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { login, signUp } from '../../../api/userApi';
import SignUpForm from './submitForm/SignUpForm';
import { User } from '../../../types/userTypes';
import { LoginButtonWrapper, FormFiledWrapper, ToastMsg } from './LoginModal.styles';
import LoginModalHeader from './LoginModalHeader';

function isValidEmail(inputText) {
  if (!inputText) return false;
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return inputText.match(mailFormat);
}

function LoginModal() {
  const [open, setOpen] = useState(false);
  const [toastAlert, setToastAlert] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('login');

  const [emailCheck, setEmailCheck] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] : [toastColor: 'red' | 'green', setToastColor: any] = useState('red');
  const InitialSignUpInfo: User = { email: '', nickname: '' };
  const [signUpInfo, setSignUpInfo] = useState(InitialSignUpInfo);

  const { mutate } = useSWRConfig();

  const inputWrapper = useRef(null);
  const toastTimeoutHandler = useRef(null);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const submitHiddenButton = useRef(null);

  const onSignUp = useCallback(async () => {
    try {
      setLoginLoading(true);
      await signUp(signUpInfo);
      setToastColor('green');
      setToastMsg('회원가입 완료! 자동으로 로그인됩니다.');
      setToastAlert(true);
      setTimeout(async () => {
        setToastAlert(false);
        await mutate(
          '/user/loginUser',
          await login({ email: signUpInfo.email, password: signUpInfo.password }),
          false,
        );
      }, 3500);
    } catch (error) {
      setToastMsg(error.response.data.error);
    }
  }, [signUpInfo]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="violet">로그인</Button>}
      size="tiny"
      style={loginLoading ? { cursor: 'not-allowed' } : {}}
    >
      <LoginModalHeader activeItem={activeItem} />
      <Modal.Content>
        { toastAlert && (
        <ToastMsg size="huge" internal position="left">
          <Segment inverted color={toastColor}>{toastMsg}</Segment>
        </ToastMsg>
        )}
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
          <Form onSubmit={activeItem === 'login' ? onLogin : onSignUp}>
            {activeItem === 'login'
              && (
              <FormFiledWrapper ref={inputWrapper}>
                <Form.Input
                  error={emailCheck && { content: '이메일 형식이 잘못되었습니다.', pointing: 'below' }}
                  fluid
                  type="email"
                  label="이메일"
                  placeholder="이메일"
                  name="email"
                  value={email}
                  onChange={onChangeEmail as ChangeEventHandler<HTMLInputElement>}
                  onKeyDown={onEnterKeyPressEventHandler}
                  required
                />
                <Form.Field>
                  <label htmlFor="password">비밀번호</label>
                  <input name="password" value={password as string} onChange={onChangePassword as ChangeEventHandler<HTMLInputElement>} type="password" placeholder="Password" onKeyDown={onEnterKeyPressEventHandler} required />
                </Form.Field>
              </FormFiledWrapper>
              )}
            {activeItem === 'signUp'
              && <SignUpForm setSignUpInfo={setSignUpInfo} />}
            <button ref={submitHiddenButton} type="submit" hidden />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <LoginButtonWrapper>
          <Form.Button
            color="instagram"
            content={activeItem === 'login' ? '로그인' : '회원가입'}
            labelPosition="right"
            icon="checkmark"
            onClick={() => submitHiddenButton.current.click()}
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
