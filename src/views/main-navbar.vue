
<template>
  <div class="site-navbar" :class="{'site-navbar-normal':!siteBarFold,'site-sitebar-fold':siteBarFold,'site-sitebar_normal':!siteBarFold}">
    <font-awesome-icon :icon="['fas','outdent']" class="navbar-home" title="折叠" @click="tofold(true)" v-if="!siteBarFold"></font-awesome-icon>
    <font-awesome-icon :icon="['fas','indent']" class="navbar-home" title="展开" @click="tofold(false)" v-if="siteBarFold" />
    <font-awesome-icon :icon="['fas','home']" class="navbar-home" size="lg" @click="logout" title="退出登录"></font-awesome-icon>
    <font-awesome-icon :icon="['fas','chevron-right']" class="navbar-home"></font-awesome-icon>
  </div>

</template>

<script>
  export default {
    methods: {
      tofold: function(val) {
        this.siteBarFold = val;
      },
      logout:function(){
        localStorage.removeItem("weshop_user");
        this.$router.push("/");
      }
    },
    computed: {
      siteBarFold: {
        get: function() {
          return this.$store.state.common.sidebarFold;
        },
        set: function(val) {
          this.$store.commit("updateSidebarFold", val);
        }
      }
    }
  }
</script>

<style lang="scss">
  .navbar-home {
    color: $theme_icon_color;
    margin-left: 20px;
    cursor: pointer;
  }
</style>
