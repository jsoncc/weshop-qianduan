<template>
  <div class="site-sitebar-one" :class="{'site-sitebar-one-fold':siteBarFold}">
    <template v-for="(item,index) in items">
      <sitebar-item :item="item" :key="index" :class="{'is-active':item.path===currentMenu.path}"></sitebar-item>
    </template>
  </div>
</template>

<script>
  const SitebarItem = () => import('@/views/sitebar-item.vue')
  export default {
    data() {
      return {
        items: [{
          name: '商家', //.......
          path: '/sys/oilprice', //默认当前栏打开的页面
          children: [ {
            name: '油站列表',
            path: '/oil'
          },{
            name: '油价列表',
            path: '/sys/oilprice'
          }]
        }, {
          name: '订单',
          path: '/order/oil',
          icon: ['fas', 'clipboard-list'],
          children:[
            {
              name: '订单列表',
              path: '/order/oil'
            }
          ]
        }, {
          name: '设置',
          path: '/sys/role',    //指定刷新后显示的初始界面
          icon: ['fas', 'cog'],
          children: [
            {
              name: '角色管理',
              path: '/sys/role' //放在前面就是指定默认显示的初始界面
            },
            {
              name: '菜单管理',
              path: '/sys/menu' //放在前面就是指定默认显示的初始界面
            }, {
            name: '用户管理',
            path: '/sys/user'
          }, {
            name: '字典管理',
            path: '/sys/dict'
          }]
        }]
      }
    },
    created() {
      this.currentMenu = this.items[0];
    },
    computed: {
      siteBarFold: {
        get: function() {
          return this.$store.state.common.sidebarFold;
        }
      },
      currentMenu: {
        get: function() {
          return this.$store.state.common.currentMenu;
        },
        set: function(val) {
          this.$store.commit("updateCurrentMenu", val);
        }
      }
    },
    components: {
      SitebarItem
    }
  }
</script>

<style>
</style>
