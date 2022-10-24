import React from 'react';
import { Modal, Image } from 'semantic-ui-react';

function LoginModalHeader({ activeItem } : {activeItem: string}) {
  return (
    <Modal.Header style={{ color: '#5829bb' }}>
      <Image src="/gamstar_logo.PNG" size="small" style={{ display: 'inline-block' }} />
      <div style={{ display: 'inline-block', position: 'relative', top: '0.1em' }}>
        {activeItem === 'login' ? '에 로그인' : '에 가입하세요'}
      </div>
    </Modal.Header>
  );
}

export default LoginModalHeader;
