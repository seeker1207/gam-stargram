import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Menu, MenuItemProps, Modal, Segment } from 'semantic-ui-react';
import { ToastMsg } from './LoginModal.styles';
import SignUpForm from './submitForm/SignUpForm';
import LoginForm from './submitForm/LoginForm';
import useToast from '../../../hooks/useToast';

interface Props{
  activeItem: string;
  onClickModalMenuHandler: (event: MouseEvent, data: MenuItemProps) => void
  setLoginLoading: Dispatch<SetStateAction<boolean>>
  isClickedLoginButton: boolean
  isClickSignUpButton: boolean
}

function LoginModalContents({ activeItem, onClickModalMenuHandler, setLoginLoading, isClickedLoginButton, isClickSignUpButton } : Props) {
  const [callToastMsg, hideToastMsg, clearToastTimeout, toastInfo] = useToast({});
  const { toastAlert, toastColor, toastMsg } = toastInfo;

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
        {activeItem === 'login'
          ? (
            <LoginForm
              setLoginLoading={setLoginLoading}
              callToastMsg={callToastMsg}
              hideToastMsg={hideToastMsg}
              clearToastTimeout={clearToastTimeout}
              isClickedLoginButton={isClickedLoginButton}
            />
          )
          : (
            <SignUpForm
              setLoginLoading={setLoginLoading}
              callToastMsg={callToastMsg}
              hideToastMsg={hideToastMsg}
              clearToastTimeout={clearToastTimeout}
              isClickedSignUpButton={isClickSignUpButton}
            />
          )}
      </Modal.Description>
    </Modal.Content>
  );
}

export default LoginModalContents;
