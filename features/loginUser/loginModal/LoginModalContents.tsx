import React, { Dispatch, MouseEventHandler, SetStateAction, useCallback, useState } from 'react';
import { Form, Menu, Modal, Segment } from 'semantic-ui-react';
import { mutate } from 'swr';
import { FormFiledWrapper, ToastMsg } from './LoginModal.styles';
import SignUpForm from './submitForm/SignUpForm';
import { login, signUp } from '../../../api/userApi';
import LoginForm from './submitForm/LoginForm';

interface Props{
  activeItem: string;
  onClickModalMenuHandler: MouseEventHandler;
  setLoginLoading: Dispatch<SetStateAction<boolean>>
}

function LoginModalContents({ activeItem, onClickModalMenuHandler, setLoginLoading } : Props) {
  const [toastAlert, setToastAlert] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] : [toastColor: 'red' | 'green', setToastColor: any] = useState('red');

  const loginErrorHandler = (errorMsg) => {
    setToastColor('red');
    setToastMsg(errorMsg);
    setLoginLoading(false);
    setToastAlert(true);
  };

  const onSignUp = useCallback(async () => {
    try {
      setLoginLoading(true);
      await signUp({ email, password });
      setToastColor('green');
      setToastMsg('회원가입 완료! 자동으로 로그인됩니다.');
      setToastAlert(true);
      setTimeout(async () => {
        setToastAlert(false);
        await mutate(
          '/user/loginUser',
          await login({ email, password }),
          false,
        );
      }, 3500);
    } catch (error) {
      setToastMsg(error.response.data.error);
    }
  }, [email, password]);

  const onEnterKeyPressEventHandler = useCallback(async (e) => {
    if (e.code === 'Enter') {
      await onLogin();
    }
  }, [onLogin]);

  return (
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
            onClick={onClickModalMenuHandler}
          >
            로그인
          </Menu.Item>
          <Menu.Item
            name="signUp"
            active={activeItem === 'signUp'}
            onClick={onClickModalMenuHandler}
          >
            회원가입
          </Menu.Item>
        </Menu>
        {activeItem === 'login' ?
          <LoginForm
            loginErrorHandler={loginErrorHandler}
            setLoginLoading={setLoginLoading}
            setToastAlert={setToastAlert}
            onEnterKeyPressEventHandler={onEnterKeyPressEventHandler} />
          : <SignUpForm setSignUpInfo={} />
        }
        <button ref={submitHiddenButton} type="submit" hidden />
        </Form>
      </Modal.Description>
    </Modal.Content>
  );
}

export default LoginModalContents;
