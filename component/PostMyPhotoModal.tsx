import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, Grid, Header, Icon, Menu, Modal, Segment, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import { photoUpload } from '../api/postApi';
import PhotoCarousel from './PhotoCarousel';

const SegmentWrapper = styled(Segment)`
    min-height: 30rem !important;
`;

const TextBoxWrapper = styled(TextArea)`
  height: 30rem;
`;

function PostMyPhotoModal() {
  const [open, setOpen] = useState(false);
  const imageInput = useRef(null);
  const onClickImages = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(async (e) => {
    console.log(e.target.files);
    const { files } : {files: string[]} = e.target;
    const photoFormData = new FormData();

    Array.from(files).forEach((f) => {
      photoFormData.append('photo', f);
    });

    await photoUpload(photoFormData);
    console.log(photoFormData);
  }, []);

  const onSubmitPost = () => {
    console.log(3434);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={(
        <Menu.Item
          name="updates"
        >
          내 게임 사진 올리기
        </Menu.Item>
      )}
      size="large"
    >
      <Modal.Header>내 게임 사진 올리기</Modal.Header>
      <Modal.Content>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={10}>
              <SegmentWrapper placeholder>
                <Header icon>
                  <Icon name="file image outline" />
                  내 게임 사진을 드래그하거나 올려보세요.
                </Header>
                <PhotoCarousel />
                <input required type="file" name="image" hidden multiple ref={imageInput} onChange={onChangeImages} />
                <Button primary onClick={onClickImages}>사진 올리기</Button>
              </SegmentWrapper>
            </Grid.Column>
            <Grid.Column width={6}>
              <Form onSubmit={onSubmitPost}>
                <TextBoxWrapper required placeholder="어떤 게임 이야기인가요?" />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          닫기
        </Button>
        <Button
          content="내 앨범에 추가"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          color="violet"
          type="submit"
        />
      </Modal.Actions>
    </Modal>
  );
}

export default PostMyPhotoModal;
