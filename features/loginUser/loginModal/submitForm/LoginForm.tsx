import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { mutate } from 'swr';
import { FormFiledWrapper } from '../LoginModal.styles';
import { login } from '../../../../api/userApi';
import useInput from '../../../../hooks/useInput';

interface props {
  loginErrorHandler: Function;
  setLoginLoading: Dispatch<SetStateAction<boolean>>;
}

function isValidEmail(inputText) {
  if (!inputText) return false;
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return inputText.match(mailFormat);
}

function LoginForm({ loginErrorHandler, setLoginLoading } : props) {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const inputWrapper = useRef(null);
  const [emailCheck, setEmailCheck] = useState(false);
  const toastTimeoutHandler = useRef(null);

  const onLogin = useCallback(async () => {
    if (toastTimeoutHandler.current) {
      clearTimeout(toastTimeoutHandler.current);
    }
    if (isValidEmail(email)) {
      setLoginLoading(true);
      try {
        await mutate('/user/loginUser', await login({ email, password } as {email: string, password: string}), false);
      } catch (error) {
        loginErrorHandler(error.response.data.error);
        toastTimeoutHandler.current = setTimeout(() => {
          setToastAlert(false);
        }, 3500);
      }
    } else {
      setEmailCheck(true);
      setLoginLoading(false);
    }
  }, [email, password, mutate]);

  return (
    <Form onSubmit={onLogin}>
      <FormFiledWrapper ref={inputWrapper}>
        <Form.Input
          error={emailCheck && { content: '이메일 형식이 잘못되었습니다.', pointing: 'below' }}
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
          <input name="password" value={password as string} onChange={onChangePassword} type="password" placeholder="Password" onKeyDown={onEnterKeyPressEventHandler} required />
        </Form.Field>
      </FormFiledWrapper>
    </Form>
  );
}

export default LoginForm;
