import axios from 'axios'

import {
  Message
} from 'element-ui';

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么

  console.log("响应拦截器", response)

  if (response.status == 200) {
    //获取接口返回的数据
    var data = response.data;
    // console.log("接口数据", data);
    console.log("接口数据", JSON.stringify(data));
    return data;
  } else {
    Message({
      message: "服务器受不了了",
      type: Error
    })
  }

}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

axios.defaults.baseURL = "http://localhost:8090"

export default {
  get: function(url, params) {
    return axios({
      url: url,
      method: 'get',
      params: params
    });

  },
  post: function(url, params) {
    return axios({
      url: url,
      method: 'post',
      data: params
    });
  }
}
