import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('@/views/main.vue')
//const 定义一个常量  import 动态导入 一个组件  存到常量Oil
const Oil=  ()=> import('@/views/oil/oil.vue') // 等价于  function(){return  import('@/views/oil/oil.vue') }
Vue.use(Router)


const router = new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      title: '微商店首页'
    },
    children:[
      {
          path:'/oil',
          component:Oil,
          meta:{
            title:"油站列表"
          }
      }
    ]
  }]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;
