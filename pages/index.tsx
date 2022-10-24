import React, { useEffect, useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from '../component/layout/Layout';

const MainHeaderWrapper = styled.div`
  margin-top: 17%;
  animation-duration: 2s;
  animation-name: showMainheader;
  
  
  @keyframes showMainheader {
    from {
      opacity: 0;
      margin-top: 22%
    }
    to {
      opacity: 1;
      margin-top: 17%;
    }
  }
`;

const IconWrapper = styled.div`
  position: relative;
  right: 4%;
  font-size: 1.5em;
`;

const StartTextWrapper = styled.div`
  z-index: 1;
  color: white;
  position: relative;
  top: 4.5em;
`;

export default function Home() {
  const [startBtnClicked] = useState(false);
  useEffect(() => {

  }, [startBtnClicked]);

  return (
    <Layout>
      <MainHeaderWrapper>
        <Header as="h1" textAlign="center">
          당신의 게임 업적🥇,
        </Header>
        <Header as="h1" textAlign="center">
          동료들에게 자랑 해보세요.
        </Header>
        <Header textAlign="center">
          <Link href="/pages/photo/main" passHref>
            <Header.Content>
              <StartTextWrapper>
                <h2>시작하기 </h2>
              </StartTextWrapper>
              <IconWrapper>
                <Icon link name="gamepad" size="massive" color="violet" />
              </IconWrapper>
            </Header.Content>
          </Link>
        </Header>
      </MainHeaderWrapper>
    </Layout>
  );
}
