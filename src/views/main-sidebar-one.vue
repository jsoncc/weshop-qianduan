<template>
  <div class="site-sitebar-one" :class="{'site-sitebar-one-fold':siteBarFold}">
    <template v-for="(item,index) in items">
      <sitebar-item :item="item" :key="index"></sitebar-item>
    </template>
  </div>
</template>

<script>
  const SitebarItem = () => import('@/views/sitebar-item.vue')
  export default {
    data() {
      return {
        items: [{
          name: '商品',
          path: '/goods/index',
          children: [{
              name: '商品列表',
              path: '/goods/index'
            },
            {
              name: '发布商品',
              path: '/goods/save'
            },
            {
              name: '商品分类',
              path: '/category/index'
            }
          ]
        }, {
          name: '设置',
          path: '/sys/menu/index',
          icon: ['fas', 'cog'],
          children:[{
              name: '导航管理',
              path: '/sys/menu/index'
            }]
        }]
      }
    },
    created() {
      let len = this.items.length;
      for (let i = 0; i < len; i++) {
        let tmp = this.items[i];
        if (tmp.path === this.$route.path) {
          this.$store.commit("updateTwomenus", tmp.children || []);
          break;
        }
      }
    },
    computed: {
      siteBarFold: {
        get: function() {
          return this.$store.state.common.sidebarFold;
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
