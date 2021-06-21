<template>
  <div class="site-sitebar " :class="{'site-sitebar-fold':siteBarFold}">
    <main-site-bar-one></main-site-bar-one>
    <main-site-bar-two></main-site-bar-two>
  </div>
</template>

<script>
  const MainSiteBarOne =()=>import('./main-sidebar-one.vue')
   const MainSiteBarTwo=()=>import('./main-sidebar-two.vue')
   export default{
     data(){
       return{

       }
     },
     components:{
       MainSiteBarOne,
       MainSiteBarTwo
     },
     computed:{
       siteBarFold:{
         get:function(){
           return this.$store.state.common.sidebarFold;
         }
       }
     }
   }
</script>

<style>
</style>
