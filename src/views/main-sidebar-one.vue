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
          name: '商家',
          path: '/oil',
          children: [{
            name: '油站列表',
            path: '/oil'
          }]
        }, {
          name: '订单',
          path: '',
          icon: ['fas', 'clipboard-list']
        }, {
          name: '设置',
          path: '/sys/dict',
          icon:['fas','cog'],
          children: [{
            name: '字典管理',
            path: '/index'
          }]
        }, ]
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
