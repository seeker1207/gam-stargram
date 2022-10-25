import React, {
  Dispatch, SetStateAction, useCallback, useEffect, useRef,
} from 'react';
import { Form } from 'semantic-ui-react';
import { mutate } from 'swr';
import useInput from '../../../../hooks/useInput';
import { FormFiledWrapper, LabelWrapper } from './SignUpForm.styles';
import { CallToastFunc, ClearToastTimeoutFunc, HideToastFunc } from '../../../../hooks/useToast';
import { login, signUp } from '../../../../api/userApi';

interface prop {
  setLoginLoading: Dispatch<SetStateAction<boolean>>
  callToastMsg: CallToastFunc
  hideToastMsg: HideToastFunc
  clearToastTimeout: ClearToastTimeoutFunc
  isClickedSignUpButton: boolean
}
function SignUpForm({ setLoginLoading, callToastMsg, hideToastMsg, clearToastTimeout, isClickedSignUpButton } : prop) {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [birthdayDay, onChangeBirthdayDay] = useInput('');
  const [birthdayMonth, onChangeBirthdayMonth] = useInput('1');
  const [birthdayYear, onChangeBirthdayYear] = useInput('');
  const submitButton = useRef(null);

  const onSignUp = useCallback(async () => {
    try {
      await signUp({ email, password });
      callToastMsg({
        callToastColor: 'green',
        callToastMsg: '회원가입 완료! 자동으로 로그인됩니다.',
      });
      hideToastMsg(async () => {
        const userInfo = await login({ email, password });
        await mutate('/user/loginUser', userInfo, false);
      });
    } catch (error) {
      callToastMsg({
        callToastColor: 'red',
        callToastMsg: error.response.data.error,
      });
    }
  }, [email, password, nickname, birthdayYear, birthdayMonth, birthdayDay]);

  const onSubmitSignUpForm = async () => {
    clearToastTimeout();
    setLoginLoading(true);
    await onSignUp();
  };

  const onEnterKeyPressEventHandler = async (e) => {
    if (e.code === 'Enter') {
      await onSubmitSignUpForm();
    }
  };

  useEffect(() => {
    submitButton.current.click();
  }, [isClickedSignUpButton]);

  return (
    <Form onSubmit={onSubmitSignUpForm}>
      <FormFiledWrapper>
        <Form.Input required fluid type="email" label="이메일" placeholder="이메일" onChange={onChangeEmail} onKeyDown={onEnterKeyPressEventHandler} value={email} />
        <Form.Input required fluid type="password" label="비밀번호" placeholder="비밀번호" onChange={onChangePassword} onKeyDown={onEnterKeyPressEventHandler} value={password} />
        <Form.Input required fluid type="password" label="비밀번호 확인" placeholder="비밀번호 확인" onKeyDown={onEnterKeyPressEventHandler} />
        <Form.Input required fluid type="text" label="닉네임" placeholder="닉네임" onChange={onChangeNickname} onKeyDown={onEnterKeyPressEventHandler} value={nickname} />
        <LabelWrapper>생년월일</LabelWrapper>
        <Form.Group widths="equal">
          <Form.Input required fluid placeholder="년" onChange={onChangeBirthdayYear} value={birthdayYear} />
          <Form.Field required fluid control="select" onChange={onChangeBirthdayMonth} value={birthdayMonth}>
            {Array(12).fill(null).map((_, idx) => <option value={idx + 1}>{idx + 1}월</option>)}
          </Form.Field>
          <Form.Input required fluid placeholder="일" onChange={onChangeBirthdayDay} value={birthdayDay} />
        </Form.Group>
      </FormFiledWrapper>
      <button ref={submitButton} aria-label="signup-button" type="submit" hidden />
    </Form>
  );
}

export default SignUpForm;
