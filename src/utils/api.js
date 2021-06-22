import host from './env.js'
export default {
  uploadfile:`${host}/api/file/upload`,//上传文件
  listoil: '/api/oil/list',
  deleteoild: '/api/oil/delete', //删除油站
  saveoil: '/api/oil/save' //保存油站
}
