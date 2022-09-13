import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import UserMenu from './UserMenu';

const UserMenuWrapper = styled.div`
  position: absolute;
  right: 1.0em;
  top: 4em;
  z-index: 3;
`;

const IconWrapper = styled(Icon)`
    font-size: 3.0em !important;
`;

function UserProfile() {
  const [isClicked, setIsClicked] = useState(false);
  const menuContainer = useRef(null);
  const iconDivWrapper = useRef(null);
  const onClickOutsideHandler = useCallback((e) => {
    const activeModal = document.querySelector('.modal.visible.active');
    console.log(e.target);
    if (activeModal) {
      return;
    }
    if (isClicked && !iconDivWrapper.current.contains(e.target)
      && !menuContainer.current.contains(e.target)) {
      setIsClicked(false);
    }
  }, [isClicked]);

  useEffect(() => {
    window.addEventListener('mousedown', onClickOutsideHandler);
    return () => {
      window.removeEventListener('mousedown', onClickOutsideHandler);
    };
  }, [onClickOutsideHandler]);

  return (
    <>
      <div ref={iconDivWrapper}>
        <IconWrapper
          link
          color="grey"
          name="user circle"
          size="huge"
          onClick={() => setIsClicked((prevState) => !prevState)}
        />
      </div>
      {isClicked
        && (
        <UserMenuWrapper ref={menuContainer}>
          <UserMenu />
        </UserMenuWrapper>
        )}
    </>
  );
}

export default UserProfile;
