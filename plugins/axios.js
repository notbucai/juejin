import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 3000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // if (typeof localStorage !== 'undefined') {
  //   const token = localStorage.getItem('token');
  //   config.headers['Authorization'] = "Bearer " + token;
  // }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const data = response.data;

  if (data.code !== 0) {
    throw { data };
  }
  // if (data.token) {
  //   if (typeof localStorage !== 'undefined') {
  //     localStorage.setItem('token', data.token);
  //   }
  // }
  // 对响应数据做点什么
  return data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error.response);
});

import commonFn from './apis/common';
import postFn from './apis/post';
import commentFn from './apis/comment';
import userFn from './apis/user';
import likeFn from './apis/like';

const common = commonFn(instance);
const post = postFn(instance);
const comment = commentFn(instance);
const user = userFn(instance);
const like = likeFn(instance);

export default ({ }, inject) => {
  inject('api', { common, post, comment, user,like });
}