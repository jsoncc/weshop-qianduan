import axios from 'axios'
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import {
  Message
} from 'element-ui';
>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
  console.log("响应拦截器",response)

  if(response.status==200){
    //获取接口返回的数据
    var data = response.data;
    console.log("接口数据",data);
    return data;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  // console.log("响应拦截器", response)

  if (response.status == 200) {
    //获取接口返回的数据
    var data = response.data;
    // console.log("接口数据", data);
    console.log("接口数据",JSON.stringify(data));
    return data;
  } else {
    Message({
      message: "服务器受不了了",
      type: Error
    })
>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
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
=======

import {
  Message
} from 'element-ui';

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
      // 对响应数据做点什么

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
      },
      function(error) {
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
>>>>>>> add204c (init)
