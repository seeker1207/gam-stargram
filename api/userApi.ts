import axios from 'axios';
import { Fetcher } from 'swr';
import { User } from '../types/userTypes';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

interface loginReqInfo {
  email: string
  password: string
}

function login(userInfo: loginReqInfo): Promise<User> {
  return axios.post('/user/login', userInfo);
}

function logout() {
  return axios.post('/user/logout');
}

function signUp(user: User) {
  return axios.post('/user', user);
}

function getUserFetcher(id: string) {
  return (url) => axios.get(url, { params: { id } })
    .then((res) => res.data);
}

const getLoginUserFetcher: Fetcher<User, string> = (url) => axios.get(url).then((res) => res.data);

export { login, logout, signUp, getUserFetcher, getLoginUserFetcher };
