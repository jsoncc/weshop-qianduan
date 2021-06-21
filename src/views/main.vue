<template>
  <div class="main">
    <main-sidebar></main-sidebar>
    <main-content></main-content>
  </div>
</template>

<script>
  const MainSidebar=()=>import('./main-sidebar')
  const MainContent=()=>import('./main-content.vue')
  export default {
    data() {
      return {

      }
    },
    components: {
      MainSidebar,
      MainContent
    }
  }
</script>

<style lang="scss">

</style>
