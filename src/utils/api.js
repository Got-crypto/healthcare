import axios from '../../node_modules/axios/index';

const _instance = axios.create({
  baseURL: 'https://2f74-2405-201-4036-c8bc-a52b-6f3c-ea5f-52c1.ngrok-free.app/'
});

const globalData = {};

_instance.interceptors.request.use(
  (config) => {
    let Authorization = `Bearer ${JSON.parse(localStorage.getItem('authUser'))?.accessToken}`;
    config.headers = {
      ...config.headers,
      Authorization
    };

    return config;
  },
  (error) => {
    console.log('interceptor', error);
    return Promise.reject(error);
  }
);

_instance.interceptors.response.use(undefined, (error) => {
  let status, data;
  if (error?.response?.status === 401) {
    console.log(error);
  }
  status = error?.response?.status;
  data = error?.response?.data;

  return Promise.reject({ status, data });
});

export { _instance as API, globalData };
