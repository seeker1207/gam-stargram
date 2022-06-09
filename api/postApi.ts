import axios from 'axios';

function photoUpload(photoFormData) {
  return axios.post('/photo', photoFormData);
}

export { photoUpload };
