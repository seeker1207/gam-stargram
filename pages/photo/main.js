import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import PhotoZone from '../../component/PhotoZone';
import Layout from '../../component/Layout';

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

function Main(props) {
  return (
    <Layout>
      <Header as="h1" icon textAlign="left">
        <Header.Content>지금 가장 핫🔥🔥한 게임의</Header.Content>
      </Header>
      <Header as="h1" icon textAlign="left">
        <Header.Content>게이머들의 업적을 구경해보세요.🎮 </Header.Content>
      </Header>
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
    </Layout>
  );
}

export default Main;
