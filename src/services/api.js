import { makeUseAxios } from 'axios-hooks';
import { Config } from '../config';
import axios from 'axios';

const instance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export const useAxios = makeUseAxios({
  axios: instance,
});

export default instance;
