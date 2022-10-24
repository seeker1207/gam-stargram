import React, { Dispatch, KeyboardEventHandler, SetStateAction, useCallback, useRef, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { mutate } from 'swr';
import { FormFiledWrapper } from '../LoginModal.styles';
import { login } from '../../../../api/userApi';
import useInput from '../../../../hooks/useInput';

const TOAST_ERROR_ALERT_TIME = 3500;

interface props {
  loginErrorHandler: Function;
  setLoginLoading: Dispatch<SetStateAction<boolean>>;
  setToastAlert: Dispatch<SetStateAction<boolean>>
  onEnterKeyPressEventHandler: KeyboardEventHandler
}

function isValidEmail(inputText) {
  if (!inputText) return false;
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return inputText.match(mailFormat);
}

function LoginForm(
  { loginErrorHandler, setLoginLoading, setToastAlert, onEnterKeyPressEventHandler } : props,
) {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const inputWrapper = useRef(null);
  const [emailValidCheck, setEmailValidCheck] = useState(false);
  const toastTimeoutHandler = useRef(null);

  const clearToastTimeoutHandler = () => {
    if (toastTimeoutHandler.current) {
      clearTimeout(toastTimeoutHandler.current);
    }
  };

  const setToastAlertFalseTimer = () => {
    toastTimeoutHandler.current = setTimeout(() => {
      setToastAlert(false);
    }, TOAST_ERROR_ALERT_TIME);
  };

  const setLoginLoadingByEmailValidCheck = () => {
    if (isValidEmail(email)) {
      setLoginLoading(true);
    } else {
      setEmailValidCheck(true);
      setLoginLoading(false);
    }
  };

  const onLogin = useCallback(async () => {
    if (isValidEmail(email)) {
      try {
        await mutate('/user/loginUser', await login({ email, password }), false);
      } catch (error) {
        loginErrorHandler(error.response.data.error);
        setToastAlertFalseTimer();
      }
    }
  }, [email, password, mutate]);

  const onSubmitLoginForm = async () => {
    setLoginLoadingByEmailValidCheck();
    clearToastTimeoutHandler();
    await onLogin();
  };

  return (
    <Form onSubmit={onSubmitLoginForm}>
      <FormFiledWrapper ref={inputWrapper}>
        <Form.Input
          error={!emailValidCheck && { content: '이메일 형식이 잘못되었습니다.', pointing: 'below' }}
          fluid
          type="email"
          label="이메일"
          placeholder="이메일"
          name="email"
          value={email}
          onChange={onChangeEmail}
          onKeyDown={onEnterKeyPressEventHandler}
          required
        />
        <Form.Field>
          <label htmlFor="password">비밀번호</label>
          <input
            name="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="Password"
            onKeyDown={onEnterKeyPressEventHandler}
            required
          />
        </Form.Field>
      </FormFiledWrapper>
    </Form>
  );
}

export default LoginForm;
