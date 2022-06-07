import useSWR from 'swr';
import { getHashtagFetcher } from '../api/hashtagApi';

function useHashtag(name: string) {
  const { data, error } = useSWR(`/hashtag/${name}`, getHashtagFetcher);

  return {
    hashtag: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useHashtag;
