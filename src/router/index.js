import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('@/views/main.vue')
//const 定义一个常量  import 动态导入 一个组件  存到常量Oil
const Oil = () => import('@/views/oil/oil.vue') // 等价于  function(){return  import('@/views/oil/oil.vue') }
const OilTopupRecord = () => import('@/views/oil/oil-topup-record.vue')
const DictIndex = () => import('@/views/sys/dict/index.vue')
const OilPrice = () => import('@/views/sys/oilprice/oilprice.vue')
const User = () => import('@/views/sys/user/user.vue')
const Login = () => import('@/views/common/Login.vue')
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        title: '微商店首页'
      },
      children: [{
          path: '/sys/dict',
          name: 'dict',
          component: DictIndex,
          meta: {
            title: "字典管理"
          }
        },
        {
          path: '/oil',
          component: Oil,
          meta: {
            title: "油站列表"
          }
        },
        {
          path: '/oil/record',
          name: 'oilrecord',
          component: OilTopupRecord,
          meta: {
            title: "油站充值记录"
          }
        },
        {
          path: '/sys/oilprice',
          name: 'oilprice',
          component: OilPrice,
          meta: {
            title: "油价列表"
          }
        },
        {
          path: '/sys/user',
          name: 'user',
          component: User,
          meta: {
            title: "用户管理"
          }
        }

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  //获取用户信息
  let user = localStorage.getItem("weshop_user");
  if (to.path == "/") {
    if (user == null || user == undefined) { //用户未登录
      //跳到登录界面
      next();
    } else {
      next("/main");
    }
  } else {
    if (null == user || user == undefined) { //用户未登录
      //跳到登录界面
      next("/");
    } else {
      next();
    }
  }

})

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;
