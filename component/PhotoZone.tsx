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
  .image {
    margin-top: 75%;
    height: 0 !important;
  }
`;

function PhotoZone({ col, imgList, row } : Props) {
  const getGridColumns = (rowImgList) => rowImgList
    .map((img : string) => (
      <Grid.Column key={uuid()}>
        <PlaceholderWrapper><Placeholder.Image /></PlaceholderWrapper>
        {/* <Image href="google.com" src={img} /> */}
        <Header size="medium">이미지 제목</Header>
      </Grid.Column>
    ));
  const calculatedRow = row ?? (imgList.length / col) + 1;

  return (
    <Grid celled>

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
  );
}

export default PhotoZone;
