import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import PhotoZone from '../../component/PhotoZone';
import Layout from '../../component/Layout';
import LoginModal from '../../component/LoginModal';

const HeaderWrapper = styled.div`
  margin-top: 10em;
  animation-duration: 2s;
  animation-name: showheader;
  
  @media all and (max-width:800px) {
    display: none;
  }
  
  @keyframes showheader {
    from {
      opacity: 0;
      margin-top: 15em;
    }
    to {
      opacity: 1;
      margin-top: 10em;
    }
  }
`;

const ImageGridWrapper = styled.div`
  margin-top: 13%;
  animation-duration: 2s;
  animation-name: showImage;
  
  @keyframes showImage {
    from {
      opacity: 0;
      margin-top: 18%
    }
    to {
      opacity: 1;
      margin-top: 13%;
    }
  }
`;

function Main() {
  return (
    <Layout>
      <div style={{ marginTop: '10em' }}>
        <HeaderWrapper>
          <Header as="h1" icon textAlign="left">
            <Header.Content>지금 가장 핫🔥🔥한 게임의</Header.Content>
          </Header>
          <Header as="h1" icon textAlign="left">
            <Header.Content>게이머들의 업적을 구경해보세요.🎮 </Header.Content>
          </Header>
        </HeaderWrapper>
        <ImageGridWrapper>
          <PhotoZone
            col={3}
            row={2}
            imgList={Array(15).fill(null).map(() => 'https://react.semantic-ui.com/images/wireframe/image.png')}
          />
        </ImageGridWrapper>
        <ImageGridWrapper>
          <PhotoZone
            col={3}
            row={2}
            imgList={Array(15).fill(null).map(() => 'https://react.semantic-ui.com/images/wireframe/image.png')}
          />
        </ImageGridWrapper>

      </div>
    </Layout>
  );
}

export default Main;
