import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import useInput from '../hooks/useInput';

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

function SignUpForm({ setSignUpInfo } :
                      { setSignUpInfo: React.Dispatch<React.SetStateAction<{}>> }) {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [birthdayDay, onChangeBirthdayDay] = useInput('');
  const [birthdayMonth, onChangeBirthdayMonth] = useInput('1');
  const [birthdayYear, onChangeBirthdayYear] = useInput('');

  useEffect(() => {
    const signUpInfo = {
      email,
      password,
      nickname,
      birthday: new Date(`${birthdayYear}-${birthdayMonth}-${birthdayDay}`),
    };
    setSignUpInfo(signUpInfo);
  }, [email, password, nickname, birthdayDay, birthdayYear, birthdayMonth]);

  return (
    <FormFiledWrapper>
      <Form.Input fluid type="email" label="이메일" placeholder="이메일" onChange={onChangeEmail} value={email} />
      <Form.Input fluid type="password" label="비밀번호" placeholder="비밀번호" onChange={onChangePassword} value={password} />
      <Form.Input fluid type="password" label="비밀번호 확인" placeholder="비밀번호 확인" />
      <Form.Input fluid type="text" label="닉네임" placeholder="닉네임" onChange={onChangeNickname} value={nickname} />
      <LabelWrapper>생년월일</LabelWrapper>
      <Form.Group widths="equal">
        <Form.Input fluid placeholder="년" onChange={onChangeBirthdayYear} value={birthdayYear} />
        <Form.Field fluid control="select" onChange={onChangeBirthdayMonth} value={birthdayMonth}>
          {Array(12).fill(null).map((_, idx) => <option value={idx + 1}>{idx + 1}월</option>)}
        </Form.Field>
        <Form.Input fluid placeholder="일" onChange={onChangeBirthdayDay} value={birthdayDay} />
      </Form.Group>
    </FormFiledWrapper>
  );
}

export default SignUpForm;
