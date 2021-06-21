<template>

  <div class="content" >
    <MainNavbar></MainNavbar>
    <div style="height: 50px;"></div>
    <div class="workspace">
      <transition >
      <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>
  const MainNavbar=()=>import('./main-navbar.vue') 
  export default {
    components:{
      MainNavbar
    },
    computed: {
      siteBarFold: {
        get: function() {
          return this.$store.state.common.sidebarFold;
        }
      }
    }
  }
</script>

<style>

</style>
