import React from 'react';
import { Grid, Placeholder, SemanticWIDTHSNUMBER } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import PostModal from '../post/PostModal';

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

function PhotoZone({ col, imgList, row, isLoading } : Props) {
  // const [modalOpen, setModalOpen] = useState(true);
  const getGridColumns = (rowImgList) => rowImgList
    .map((img : string) => (

      <PostModal key={uuid()} coverImg={img} />

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
