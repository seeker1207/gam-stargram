import { Fetcher } from 'swr';
import axios from 'axios';
import Hashtag from '../types/hashtagTypes';

const getHashtagFetcher: Fetcher<Hashtag, string> = (url: string) => (
  axios.get(url).then((res) => res.data));

export { getHashtagFetcher };
