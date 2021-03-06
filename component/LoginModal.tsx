import React, { ChangeEventHandler, useCallback, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  Modal,
  Image,
  Button,
  Form,
  Menu,
  Rail,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { login, signUp } from '../api/userApi';
import useInput from '../hooks/useInput';
import SignUpForm from './SignUpForm';
import { User } from '../types/userTypes';

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

const ToastMsg = styled(Rail)`
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  
  .segment {
    position: relative;
    opacity: 0;
    bottom: 2em;
    animation: 3.5s linear alternate showToast;
    
    @keyframes showToast {
      5% {
        opacity: 1;
        bottom: 0;
      }
      
      95% {
          opacity: 1;
          bottom: 0;
      }
      
      100% {
        opacity: 0;
        bottom: 2em;
      }
    }
  }
`;
function isValidEmail(inputText) {
  if (!inputText) return false;
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return inputText.match(mailFormat);
}

function LoginModal() {
  const [open, setOpen] = useState(false);
  // const [secondOpen, setSecondOpen] = useState(false);
  const [toastAlert, setToastAlert] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('login');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
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

  const onLogin = useCallback(async () => {
    if (toastTimeoutHandler.current) {
      clearTimeout(toastTimeoutHandler.current);
    }
    if (isValidEmail(email)) {
      setLoginLoading(true);
      try {
        await mutate('/user/login', await login({ email, password } as {email: string, password: string}), false);
      } catch (error) {
        setToastColor('red');
        setToastMsg(error.response.data.error);
        setLoginLoading(false);
        setToastAlert(true);
        toastTimeoutHandler.current = setTimeout(() => {
          setToastAlert(false);
        }, 3500);
      }
    } else {
      setEmailCheck(true);
      setLoginLoading(false);
    }
  }, [email, password, mutate]);

  const onSignUp = useCallback(async () => {
    try {
      setLoginLoading(true);
      await signUp(signUpInfo);
      setToastColor('green');
      setToastMsg('???????????? ??????! ???????????? ??????????????????.');
      setToastAlert(true);
      setTimeout(async () => {
        setToastAlert(false);
        await mutate(
          '/user/login',
          await login({ email: signUpInfo.email, password: signUpInfo.password }),
          false,
        );
      }, 3500);
    } catch (error) {
      setToastMsg(error.response.data.error);
    }
  }, [signUpInfo]);

  const onEnterKeyPressEventHandler = useCallback(async (e) => {
    if (e.code === 'Enter') {
      await onLogin();
    }
  }, [onLogin]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="violet">?????????</Button>}
      size="tiny"
      style={loginLoading ? { cursor: 'not-allowed' } : {}}
    >
      <Modal.Header style={{ color: '#5829bb' }}>
        <Image src="/gamstar_logo.PNG" size="small" style={{ display: 'inline-block' }} />
        <div style={{ display: 'inline-block', position: 'relative', top: '0.1em' }}>
          {activeItem === 'login' ? '??? ?????????' : '??? ???????????????'}
        </div>
      </Modal.Header>
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
              ?????????
            </Menu.Item>

            <Menu.Item
              name="signUp"
              active={activeItem === 'signUp'}
              onClick={handleItemClick}
            >
              ????????????
            </Menu.Item>
          </Menu>
          <Form onSubmit={activeItem === 'login' ? onLogin : onSignUp}>
            {activeItem === 'login'
              && (
              <FormFiledWrapper ref={inputWrapper}>
                <Form.Input
                  error={emailCheck && { content: '????????? ????????? ?????????????????????.', pointing: 'below' }}
                  fluid
                  type="email"
                  label="?????????"
                  placeholder="?????????"
                  name="email"
                  value={email}
                  onChange={onChangeEmail as ChangeEventHandler<HTMLInputElement>}
                  onKeyDown={onEnterKeyPressEventHandler}
                  required
                />
                <Form.Field>
                  <label htmlFor="password">????????????</label>
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
            content={activeItem === 'login' ? '?????????' : '????????????'}
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
          ??????
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default LoginModal;
