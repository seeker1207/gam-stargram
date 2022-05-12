import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

function PhotoZone({ col, imgList, row }) {
  const getGridColumns = (rowImgList) => rowImgList
    .map((img) => <Grid.Column> <Image src={img} /> </Grid.Column>);
  const calculatedRow = row ?? parseInt(imgList.length / col, 10) + 1;

  return (
    <Grid celled>
      {
        Array(calculatedRow).fill(null).map((_, idx) => (
          <Grid.Row columns={col}>
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
