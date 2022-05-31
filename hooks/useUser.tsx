import useSWR from 'swr';
import { getLoginUserFetcher } from '../api/userApi';

function useLoginUser() {
  const { data, error } = useSWR('/user/login', getLoginUserFetcher, { shouldRetryOnError: false });

  return {
    user: data,
    isLoading: !error && !data,
    isLoggedOut: error && error.response.status === 403,
    isError: error,
  };
}

export default useLoginUser;
