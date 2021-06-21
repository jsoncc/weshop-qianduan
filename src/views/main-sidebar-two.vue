<template>
  <div class="site-sitebar-two" :class="{'site-sitebar-two-fold':siteBarFold}">
    <div v-if="!siteBarFold" class="mst_setting _flex_space-around">
      <span>快捷菜单</span>
      <font-awesome-icon :icon="['fas','cog']" class="site-common-color" style="cursor:pointer;"></font-awesome-icon>
    </div>
    <!--具体功能项-->
    <template v-for="m in menus">
      <sitebar-two-item :item="m" :activeitem.sync="currentPath"></sitebar-two-item>
    </template>
  </div>
</template>

<script>
  const SitebarTwoItem = () => import('@/views/sitebar-two-item.vue')
  export default {
    data() {
      return {
        menus: [],
        currentPath: ''
      }
    },

    watch: {
      $route: function(to) {
        if (to.path !== this.currentPath) {
          this.currentPath = to.path;
           this.menus=this.$store.state.common.twomenus;
        }
      }
    },
    created() {
      this.currentPath = this.$route.path;
      this.menus=this.$store.state.common.twomenus;
    },
    methods: {

    },
    components: {
      SitebarTwoItem
    },
    computed: {
      siteBarFold: {
        get: function() {
          return this.$store.state.common.sidebarFold;
        }
      }
    },

  }
</script>

<style lang="scss">
  .site-colspan {
    color: $theme_icon_color;
    text-align: right;
  }

  .min {
    margin: 5px 10px 0 0;
    cursor: pointer;
  }

  .mst_setting {
    line-height: 50px;
    font-size: 14px;
    color: $menu_two_color;
    font-weight: bold;

  }
</style>
