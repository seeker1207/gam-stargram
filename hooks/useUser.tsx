import useSWR from 'swr';
import { getUserFetcher } from '../api/userApi';

function useUser(id) {
  const { data, error } = useSWR(`/user/${id}`, getUserFetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isLoggedOut: error && error.status === 403,
    isError: error,
  };
}

export default useUser;
