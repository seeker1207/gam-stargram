import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, Grid, Header, Icon, Menu, Modal, Segment, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import { photoUpload, postPost } from '../api/postApi';
import PhotoCarousel from './PhotoCarousel';
import Toast from './Toast';
import useInput from '../hooks/useInput';

const SegmentWrapper = styled(Segment)`
  min-height: 30rem !important;
`;

const TextBoxWrapper = styled(TextArea)`
  height: 30rem;
`;

function PostMyPhotoModal() {
  const [open, setOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [uploadedPhotosFileNames, setUploadedPhotosFileNames] = useState<String | null>(null);
  const [description, handler] = useInput('');

  const imageInput = useRef(null);

  const uploadPhoto = async (photoFormData) => {
    try {
      const { data: photoFilePaths } = await photoUpload(photoFormData);
      setIsUploaded(true);
      setOpenToast(true);
      setUploadedPhotosFileNames(photoFilePaths);

      setTimeout(() => setOpenToast(false), 3500);
      console.log(photoFilePaths);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const onClickImages = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(async (e) => {
    console.log(e.target.files);
    const { files } : {files: File[]} = e.target;
    const photoFormData = new FormData();
    console.log(files);
    Array.from(files).forEach((f) => {
      photoFormData.append('photo', f, encodeURI(f.name));
    });
    console.log(photoFormData);
    await uploadPhoto(photoFormData);
  }, []);

  const onSubmitPost = async () => {
    const typedDesc = description as string;
    await postPost({ description: typedDesc, filePath: uploadedPhotosFileNames });
    setOpenToast(true);
    setTimeout(() => setOpenToast(false), 3500);
  };

  const dropHandler = async (e) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const photoFormData = new FormData();
      Array.from(e.dataTransfer.files).forEach((f: File) => {
        photoFormData.append('photo', f, encodeURI(f.name));
      });

      await uploadPhoto(photoFormData);
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
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
      {openToast && <Toast toastColor="green" toastMsg="이미지 업로드 완료! 이미지를 드래그하여 다음이미지를 볼 수 있습니다." />}
      <Modal.Content>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={10}>
              {isUploaded ? (
                <PhotoCarousel filenames={uploadedPhotosFileNames} />
              )
                : (
                  <SegmentWrapper placeholder onDrop={dropHandler} onDragOver={dragOverHandler}>
                    <Header icon>
                      <Icon name="file image outline" />
                      내 게임 사진을 드래그하거나 올려보세요.
                    </Header>
                    <input required type="file" name="image" hidden multiple ref={imageInput} onChange={onChangeImages} />
                    <Button primary onClick={onClickImages}>사진 올리기</Button>
                  </SegmentWrapper>
                )}
            </Grid.Column>
            <Grid.Column width={6}>
              <Form onSubmit={onSubmitPost}>
                <TextBoxWrapper required placeholder="어떤 게임 이야기인가요?" onChange={handler} value={description} />
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
          onClick={onSubmitPost}
          color="violet"
          type="submit"
        />
      </Modal.Actions>
    </Modal>
  );
}

export default PostMyPhotoModal;
