<template>
  <div class="sitebar-two-item-root" :class="['_flexcc',{'is-active':isactive}]" @click="goto">
    {{item.name}}
  </div>
</template>

<script>
  export default {
    methods: {
      goto() {
         this.$emit("update:activeitem",this.item.path)
         this.$router.push(this.item.path);
      }
    },
    computed:{
      isactive:function(){
        return this.item.path===this.activeitem;
      }
    },
    props: {
      item: {
        type: Object,
        default: function() {
          return {
            name: '二级菜单',
            path: '/'
          }
        }

      },
      activeitem:{
        type:String,
        default:""
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .sitebar-two-item-root {
    line-height: 50px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
  }

  .sitebar-two-item-root:hover {
    background-color: #f8f8f8;
    color: $font-color;
  }

  .sitebar-two-item-root:active , .is-active  {
     background-color: #f1f1f1;
      color: $font-color;
  }


</style>
