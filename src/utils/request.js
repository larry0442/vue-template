import axios from 'axios';
import Qs from 'qs';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000,
  transformRequest: (params) => Qs.stringify(params),
});
const token = ''; // get true token
axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      // for a error tip
    }
    return res;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

export default axiosInstance;
