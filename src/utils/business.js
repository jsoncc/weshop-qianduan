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
  },

  // 修改油站
  updateoil: function(params) {
    return http.post(api.updateoil, params);
  },

  //删除图片
  deleteatt: function(params) {
    return http.get(api.deleteatt, params);
  },

  //添加充值记录
  saverecord: function(params) {
    return http.post(api.saverecord, params);
  },

  //查询充值记录listrecord
  listrecord: function(params) {
    return http.post(api.listrecord, params);
  },
  //保存字典
  savedict(params) {
    return http.post(api.savedict, params);
  },
  //字典列表 
  querydict(params) {
    return http.get(api.querydict, params);
  }


}
