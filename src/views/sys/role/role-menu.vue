<template>
  <div class="role-menu-root">
    <el-tree :data="data" show-checkbox default-expand-all node-key="id" highlight-current
      :props="defaultProps" ref="menuTree" style="border-radius: 5px;margin-left: 30px;">
    </el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'menuname'
        },
        data: []
      };
    },
    created(){
      this.queryTree();
    },
    methods: {

      //算是初始化数据吧
      async queryTree(){
        const res=await this.$business.querytree({});
        if(res.code == 200){
          this.data = res.data;
        }
      },
      //角色里面的添加数，设置全选、半选子菜单
      getkeys(){
        //返回选择的菜单数组信息
        var info = this.$refs.menuTree.getCheckedKeys(false);
        //返回选择的子菜单跟随的父菜单一起的数组信息
        var tmp = this.$refs.menuTree.getHalfCheckedKeys();
        //定义一个数组，将这俩数组合在一起
        var obj ={};
        obj.all = info;
        obj.half = tmp;
        this.$emit("updateAuths",obj);
        
      }
    }
  };
</script>

<style scoped="scoped">
  .role-menu-root {
    border: #ddd solid 1px;
    border-radius: 5px;
  }
</style>
