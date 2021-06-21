// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//路由配置
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

import business from './utils/business.js';

>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
=======

import business from './utils/business.js';

>>>>>>> add204c (init)
library.add(solid)
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI)

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
//将business添加到vue上
Vue.prototype.$business = business;

>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
=======
//将business添加到vue上
Vue.prototype.$business = business;

>>>>>>> add204c (init)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
