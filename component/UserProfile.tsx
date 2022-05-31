import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import UserMenu from './UserMenu';

const UserMenuWrapper = styled.div`
  position: absolute;
  right: 1.0em;
  top: 5em;
`;

function UserProfile() {
  const [isClicked, setIsClicked] = useState(false);
  const menuContainer = useRef(null);
  const iconWrapper = useRef(null);
  const onClickOutsideHandler = useCallback((e) => {
    if (isClicked && !iconWrapper.current.contains(e.target)) {
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
      <div ref={iconWrapper}>
        <Icon
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
