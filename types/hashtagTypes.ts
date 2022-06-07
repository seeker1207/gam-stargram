import PostTypes from './postTypes';

interface Hashtag {
  id?: string
  name: string
  posts: PostTypes[]
}

export default Hashtag;
