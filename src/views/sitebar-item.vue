<template>
  <div class="sitebar-item-root" @click="goto">
    <font-awesome-icon :icon="item.icon" class="navbar-icon" size="lg" v-if="hasicon"></font-awesome-icon>
    <font-awesome-icon :icon=" ['fas', 'list']" class="navbar-icon" size="lg" v-else></font-awesome-icon>
    <span class="category">{{item.name}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      hasicon: function() {
        if (this.item.icon && this.item.icon.length > 0)
          return true;
        return false;
      }
    },
    props: {
      item: {
        type: Object,
        default: function() {
          return {
            "to": "/",
            "name": "暂无",
            "icon": ['fas', 'list'],
            "children": []
          }
        },
        required: true
      }

    },
    methods: {
      goto() {
        this.$router.push(this.item.path);
         this.$store.commit("updateTwomenus",this.item.children||[]);
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .sitebar-item-root {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    line-height: 50px;
    cursor: pointer;
    border-style: none;
    border-bottom: #555 solid 1px;
    color: #ddd;
  }

  .sitebar-item-root:hover,
  .sitebar-item-root:active,
  .is-active {
    background-color: #555;
    color: $font-color;
    border-style: none;
    border-bottom: #999 solid 1px;
  }

  .category {
    font-size: 14px;
    margin-left: 10px;
  }
</style>
