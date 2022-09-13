import React, { useState } from 'react';
import { Button, Grid, Header, Icon, Modal } from 'semantic-ui-react';
import Image from 'next/image';
import styled from 'styled-components';

const ImageWrapper = styled(Image)`
  margin: 1em;
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

function PostModal({ coverImg } : {coverImg: string}) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <GridColumnWrapper>
          <ImageWrapper
            src={`http://localhost:3065/${coverImg}`}
            layout="responsive"
            width={16}
            height={9}
            objectFit="cover"
          />
        </GridColumnWrapper>
    )}
      size="tiny"
    >
      <Header icon>
        <Icon name="archive" />
        Archive Old Messages
      </Header>
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default PostModal;
