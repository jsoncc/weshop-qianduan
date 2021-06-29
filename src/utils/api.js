import host from './env.js'
export default {
  uploadfile: `${host}/api/file/upload`, //上传文件
  listoil: '/api/oil/list', //查询油站
  deleteoild: '/api/oil/delete', //删除油站
  saveoil: '/api/oil/save', //添加油站
  updateoil: '/api/oil/update', //修改油站
  deleteatt: '/api/attach/delete', //删除图片
  saverecord: '/api/oil/record/save', //添加充值记录
  listrecord: '/api/oil/record/list', //查询充值记录
  savedict: '/api/sys/dict/save', //保存字典
  querydict: '/api/sys/dict/list', //字典列表
  deletedicttaball: '/api/sys/dict/deletetab', //删除字典tab及其子项数据
  updatedict: '/api/sys/dict/update', //修改字典数据
  checkcode: '/api/sys/dict/checkcode' //检查编码唯一性
}
