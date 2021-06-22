import http from './http.js'
import api from './api.js'

export default {
  //查询油站列表
  queryoil: function(params) {
    return http.post(api.listoil, params);
  },

  //删除油站
  deleteoil: function(id) {
    return http.get(api.deleteoild, {
      "id": id
    });
  },

  // 保存油站
  saveoil: function(params) {
    return http.post(api.saveoil, params);
  }

}
