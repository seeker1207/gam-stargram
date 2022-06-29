import React from 'react';
import { Grid, Header, Placeholder, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

interface Props {
  col: SemanticWIDTHSNUMBER;
  row: number;
  imgList: Array<String>;
  isLoading: boolean;
}

const PlaceholderWrapper = styled(Placeholder)`
  margin: 0 auto;
  
  .image {
    margin-top: 75%;
    height: 0 !important;
  }
`;

// const ImageWrapper = styled(Image)`
//   height: 100%;
//   object-fit: cover;
// `;

function PhotoZone({ col, imgList, row, isLoading } : Props) {
  const getGridColumns = (rowImgList) => rowImgList
    .map((img : string) => (
      <Grid.Column key={uuid()} style={{ padding: 0, background: '#d3badb', overflow: 'hidden', height: '100%' }}>
        <Image
          src={`http://localhost:3065/${img}`}
          layout="responsive"
          width={16}
          height={9}
          objectFit="cover"
        />
        {/* <ImageWrapper layout="fill" src={`http://localhost:3065/${img}`} /> */}
      </Grid.Column>
    ));
  const calculatedRow = row ?? (imgList.length / col) + 1;

  return (
    <Grid>
      {
        Array(calculatedRow).fill(null).map((_, idx) => (
          <Grid.Row key={uuid()} columns={col}>
            { isLoading ? Array(col).fill(null).map(() => <PlaceholderWrapper><Placeholder.Image /></PlaceholderWrapper>)
              : getGridColumns(imgList.slice(
                (idx + 1) * col - col,
                Math.min(imgList.length, (idx + 1) * col),
              ))}
          </Grid.Row>
        ))
      }
    </Grid>
  );
}

export default PhotoZone;
