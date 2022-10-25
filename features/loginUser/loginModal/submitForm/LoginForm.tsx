import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { mutate } from 'swr';
import { FormFiledWrapper } from '../LoginModal.styles';
import { login } from '../../../../api/userApi';
import useInput from '../../../../hooks/useInput';
import {
  CallToastFunc,
  ClearToastTimeoutFunc,
  HideToastFunc,
} from '../../../../hooks/useToast';

interface props {
  setLoginLoading: Dispatch<SetStateAction<boolean>>;
  callToastMsg: CallToastFunc
  hideToastMsg: HideToastFunc
  clearToastTimeout: ClearToastTimeoutFunc
}

function isValidEmail(inputText) {
  if (!inputText) return false;
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return inputText.match(mailFormat);
}

function LoginForm({
  setLoginLoading,
  callToastMsg,
  hideToastMsg,
  clearToastTimeout,
} : props) {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const inputWrapper = useRef(null);
  const [emailValidCheck, setEmailValidCheck] = useState(false);

  const setLoginLoadingByEmailValidCheck = () => {
    if (isValidEmail(email)) {
      setLoginLoading(true);
    } else {
      setEmailValidCheck(true);
      setLoginLoading(false);
    }
  };

  const callErrorToastMsg = (errorMsg) => {
    callToastMsg({
      callToastMsg: errorMsg,
      callToastColor: 'red',
    });
    hideToastMsg(() => {});
  };

  const onLogin = useCallback(async (errorCallbackFunc) => {
    if (isValidEmail(email)) {
      try {
        await mutate('/user/loginUser', await login({ email, password }), false);
      } catch (error) {
        errorCallbackFunc(error.response.data.error);
        setLoginLoading(false);
      }
    }
  }, [email, password]);

  const onSubmitLoginForm = async () => {
    setLoginLoadingByEmailValidCheck();
    clearToastTimeout();
    await onLogin(callErrorToastMsg);
  };

  const onEnterKeyPressEventHandler = async (e) => {
    if (e.code === 'Enter') {
      await onSubmitLoginForm();
    }
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
      <button aria-label="loginButton" type="submit" hidden />
    </Form>
  );
}

export default LoginForm;
