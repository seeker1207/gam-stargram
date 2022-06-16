import axios from 'axios';

function photoUpload(photoFormData) {
  return axios.post('/photo', photoFormData);
}

function postPost(postFormData : {description: string, filePath: string[]}) {
  return axios.post('/post', postFormData);
}
export { photoUpload, postPost };
