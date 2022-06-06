import React from 'react';
import { Grid, Header, Image, Placeholder, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

interface Props {
  col: SemanticWIDTHSNUMBER;
  row: number;
  imgList: Array<String>;
}

const PlaceholderWrapper = styled(Placeholder)`
  margin: 0 auto;
  
  .image {
    margin-top: 75%;
    height: 0 !important;
  }
`;

function PhotoZone({ col, imgList, row } : Props) {
  const getGridColumns = (rowImgList) => rowImgList
    .map((img : string) => (
      <Grid.Column key={uuid()} style={{ padding: 0 }}>
        <PlaceholderWrapper><Placeholder.Image /></PlaceholderWrapper>
        {/* <Image href="google.com" src={img} /> */}
      </Grid.Column>
    ));
  const calculatedRow = row ?? (imgList.length / col) + 1;

  return (
    <>
      <Header size="medium" color="violet">#리그오브레전드 #lol #롤 #페이커</Header>
      <Grid>
        {
        Array(calculatedRow).fill(null).map((_, idx) => (
          <Grid.Row key={uuid()} columns={col}>
            { getGridColumns(
              imgList.slice(
                (idx + 1) * col - col,
                Math.min(imgList.length, (idx + 1) * col),
              ),
            )}
          </Grid.Row>
        ))
      }
      </Grid>
    </>
  );
}

export default PhotoZone;
