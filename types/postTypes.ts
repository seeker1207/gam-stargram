import PhotoTypes from './photoTypes';

interface Post {
  id?: string
  description: string
  regDtm?: Date
  photos: PhotoTypes[]
}

export default Post;
