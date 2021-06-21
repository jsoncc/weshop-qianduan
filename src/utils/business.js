
import http from './http.js'
import api from './api.js'

export default {
  //查询油站列表
  queryoil: function(params) {
    return http.post(api.listoil, params);
  }

}
