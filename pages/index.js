import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import Layout from '../component/Layout';
import PhotoZone from '../component/PhotoZone';

const HeaderWrapper = styled.div`
  margin-top: 5%;
  animation-duration: 2s;
  animation-name: showheader;
  
  
  @keyframes showheader {
    from {
      opacity: 0;
      margin-top: 10%
    }
    to {
      opacity: 1;
      margin-top: 5%;
    }
  }
`;

const ImageGridWrapper = styled.div`
  margin-top: 5%;
  animation-duration: 2s;
  animation-name: showheader;
  
  @keyframes showheader {
    from {
      opacity: 0;
      margin-top: 10%
    }
    to {
      opacity: 1;
      margin-top: 5%;
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
  const [startBtnClicked, setStartBtnClicked] = useState(false);
  useEffect(() => {

  }, [startBtnClicked]);

  return (
    <>

      <Head>
        <meta charSet="UTF-8" />
        <title>GamStargram</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        {!startBtnClicked
          ? (
            <HeaderWrapper>
              <Header as="h1" icon textAlign="center">
                <Header.Content>당신의 게임 업적🥇, </Header.Content>
              </Header>
              <Header as="h1" icon textAlign="center">
                <Header.Content>동료들에게 자랑 해보세요. </Header.Content>
              </Header>
              <Header textAlign="center">
                <Link href="/photo/main" passHref>
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
            </HeaderWrapper>
          )
          : (
            <ImageGridWrapper startBtnClicked={startBtnClicked}>
              <PhotoZone
                col={3}
                imgList={Array(15).fill(null).map(() => 'https://react.semantic-ui.com/images/wireframe/image.png')}
              />
            </ImageGridWrapper>
          )}
      </Layout>
    </>
  );
}
