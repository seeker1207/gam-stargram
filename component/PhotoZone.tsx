import React from 'react';
import { Grid, Image, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

interface Props {
  col: SemanticWIDTHSNUMBER;
  row: number;
  imgList: Array<String>;
}

function PhotoZone({ col, imgList, row } : Props) {
  const getGridColumns = (rowImgList) => rowImgList
    .map((img : string) => <Grid.Column key={uuid()}> <Image src={img} /> </Grid.Column>);
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
