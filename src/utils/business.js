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
  },

  //删除字典tab及其子项数据
  deletedicttaball(params) {
    return http.get(api.deletedicttaball, params);
  },

  //修改字典数据
  updatedict(params) {
    return http.post(api.updatedict, params);
  },

  //检查编码唯一性
  checkcode(params){
    return http.post(api.checkcode,params);
  },

  //
  queryChildDict(params){
    return http.get(api.queryChildDict,params);
  },

  saveuser(params){
    return http.post(api.saveuser,params);
  },

  queryuserlist(params){
    return http.post(api.queryuserlist,params);
  },

  //登录
  login(params){
    return http.post(api.login,params);
  },

  //添加菜单
  savemenu(params){
    return http.post(api.savemenu,params);
  },

  //查询菜单
  querymenu(params){
    return http.get(api.querymenu,params);
  },

  //查询菜单树
  querytree(params){
    return http.get(api.querytree,params);
  },

  //保存角色
  saverole(params){
    return http.post(api.saverole,params);
  },
  
  //查询角色列表
  queryrole(params){
    return http.get(api.queryrole,params);
  }


}
