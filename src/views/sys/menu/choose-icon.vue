<template>
  <div class="choose-icon-root" v-if="visible">
    <template v-for="item in icons">
      <div class="ci_item_container" @click="chg(item.icon)">
        <font-awesome-icon size="lg" :icon="item.icon" class="ci_item"></font-awesome-icon>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        icons: [{
            icon: ['fas', 'address-book']
          },
          {
            icon: ['fas', 'list']
          },
          {
            icon: ['fas', 'cogs']
          },
          {
            icon: ['fas', 'users']
          }
        ]
      }
    },
    methods: {
      chg(icon) {
        this.$emit("selecticon", icon.join(','));
        //关闭弹框
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .choose-icon-root {
    border: #eee solid 1px;
    border-radius: 15px;
    width: 100%;
    height: 300px;
    position: relative;
    z-index: 99999;
    background-color: #fff;
  }

  .ci_item {
    color: #999;
  }


  .ci_item_container {
    width: 40px;
    height: 40px;
    border: #ddd solid 1px;
    margin-left: 10px;
    margin-top: 10px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .ci_item_container:hover {
    border: #409EFF solid 1px;
  }

  .ci_item:hover {
    color: #409EFF;
  }
</style>
