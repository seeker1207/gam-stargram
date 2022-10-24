import React from 'react';
import styled from 'styled-components';
import { Header } from 'semantic-ui-react';
import PhotoZone from '../../component/PhotoZone';
import Layout from '../../component/layout/Layout';
import useHashtag from '../../hooks/useHashtag';

const HeaderWrapper = styled.div`
  margin-top: 10em;
  animation-duration: 2s;
  animation-name: showheader;
  padding: 0 1em;
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
  padding: 0 1em;
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
  .ui.grid>.row {
    padding: 0;
  }
`;

function Main() {
  const { hashtag: lolHashtag, isLoading: lolImgLoading } = useHashtag('롤');
  console.log(lolHashtag);
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
          <Header size="medium" color="violet">#리그오브레전드 #lol #롤 #페이커</Header>
          <PhotoZone
            col={3}
            row={2}
            imgList={
            !lolImgLoading
              ? lolHashtag.posts.map((post) => post.photos[0].filePath) : null
}
            isLoading={lolImgLoading}
          />
        </ImageGridWrapper>
        <ImageGridWrapper>
          <PhotoZone
            col={3}
            row={2}
            imgList={
            !lolImgLoading
              ? lolHashtag.posts.map((post) => post.photos[0].filePath) : null
}
            isLoading={lolImgLoading}
          />
        </ImageGridWrapper>

      </div>
    </Layout>
  );
}

export default Main;
