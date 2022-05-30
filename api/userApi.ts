import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

interface loginReqInfo {
  email: string
  password: string
}

interface User {
  email: string
  nickname: string
}

function login(userInfo: loginReqInfo): Promise<User> {
  return axios.post('http://localhost:3065/user/login', userInfo);
}

function getUserFetcher(id: string) {
  return (url) => axios.get(url, { params: { id } })
    .then((res) => res.data);
}

export { login, getUserFetcher };
