import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import UserMenu from './UserMenu';

const UserMenuWrapper = styled.div`
  position: absolute;
  right: 1.0em;
  top: 4em;
`;

const IconWrapper = styled(Icon)`
    font-size: 3.0em !important;
`;

function UserProfile() {
  const [isClicked, setIsClicked] = useState(false);
  const menuContainer = useRef(null);
  const iconDivWrapper = useRef(null);
  const onClickOutsideHandler = useCallback((e) => {
    if (isClicked && !iconDivWrapper.current.contains(e.target)) {
      setIsClicked(false);
    }
  }, [isClicked]);

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  }, [onClickOutsideHandler]);

  return (
    <>
      <div ref={iconDivWrapper}>
        <IconWrapper
          link
          color="orange"
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
