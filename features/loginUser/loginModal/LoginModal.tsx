import React, { useCallback, useState } from 'react';
import {
  Modal,
  Button,
  Form,
} from 'semantic-ui-react';
import { LoginButtonWrapper } from './LoginModal.styles';
import LoginModalHeader from './LoginModalHeader';
import LoginModalContents from './LoginModalContents';

function LoginModal() {
  const [open, setOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeItem, setActiveItem] = useState('login');
  const [isClickedLoginButton, setIsClickedLoginButton] = useState(false);
  const [isClickedSignupButton, setIsClickedSignupButton] = useState(false);

  const handleItemClick = (e, { name } : {name:string}) => setActiveItem(name);

  const onClickSubmitButtonHandler = useCallback(() => {
    if (activeItem === 'login') {
      setIsClickedLoginButton((prev) => !prev);
    } else {
      setIsClickedSignupButton((prev) => !prev);
    }
  }, [activeItem]);

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
      <LoginModalContents
        activeItem={activeItem}
        onClickModalMenuHandler={handleItemClick}
        setLoginLoading={setLoginLoading}
        isClickedLoginButton={isClickedLoginButton}
        isClickSignUpButton={isClickedSignupButton}
      />
      <Modal.Actions>
        <LoginButtonWrapper>
          <Form.Button
            color="instagram"
            content={activeItem === 'login' ? '로그인' : '회원가입'}
            labelPosition="right"
            icon="checkmark"
            onClick={onClickSubmitButtonHandler}
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
