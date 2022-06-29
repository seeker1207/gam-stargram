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

const GridColumnWrapper = styled(Grid.Column)`
  padding: 0.3em !important;
  
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  
  :hover::after {
    content:' ';
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    border: none;
    margin: 0.3em;
    
    display: block;
    min-width: 97%;
    max-width: 100%;
    min-height: 97%;
    max-height: 100%;

  }
`;
const ImageWrapper = styled(Image)`
  margin: 1em;
  

`;

function PhotoZone({ col, imgList, row, isLoading } : Props) {
  const getGridColumns = (rowImgList) => rowImgList
    .map((img : string) => (
      <GridColumnWrapper key={uuid()}>
        <ImageWrapper
          src={`http://localhost:3065/${img}`}
          layout="responsive"
          width={16}
          height={9}
          objectFit="cover"
        />
        {/* <DivWrapper> efefe </DivWrapper> */}
      </GridColumnWrapper>
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
