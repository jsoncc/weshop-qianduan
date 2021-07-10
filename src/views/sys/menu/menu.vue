<template>
  <div>
     <div style="text-align: left;margin-bottom: 10px;">
       <el-button type="primary" size="small" @click="saveorupdate(1,'0')">新增</el-button>
     </div>
     <el-table
        :data="data"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          label="名称"
          align="left"
          prop="menuname"
          header-align="center"
          >
        </el-table-column>
        <el-table-column
          label="图标"
          align="center"
          header-align="center"
          width="100">
          <!--scope.row.icon.split(',')  可以把图标的字符串转换成图标图片-->
          <template v-slot="scope">
            <font-awesome-icon :icon="scope.row.icon.split(',')" v-if="scope.row.icon"></font-awesome-icon>
          </template>
        </el-table-column>
      <el-table-column
        label="类型"
        align="center"
        header-align="center"
        width="100">
        <template v-slot="scope">
          <el-tag v-if="scope.row.menutype==1">一级菜单</el-tag>
           <el-tag v-else-if="scope.row.menutype==2" type="success">二级菜单</el-tag>
           <el-tag v-else  type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sorts"
        label="排序"
        align="center"
        header-align="center"
        width="100">
      </el-table-column>

      <el-table-column
        prop="routepath"
        label="路由"
        align="center"
        header-align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="authorization"
        label="授权"
        align="center"
        header-align="center"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        header-align="center"
        width="180">
        <template v-slot="scope">
           <font-awesome-icon :icon="['fas','plus']" size="lg" title="添加子菜单" class="opt" @click="saveorupdate(2,scope.row.id)" v-if="scope.row.menutype==1"></font-awesome-icon>
             <font-awesome-icon :icon="['fas','plus']" size="lg" title="添加子菜单" class="opt" @click="saveorupdate(3,scope.row.id)" v-else-if="scope.row.menutype==2"></font-awesome-icon>
       <font-awesome-icon v-bind:icon="['fas','edit']" size="lg" title="编辑" class="opt"
         @click="saveorupdate(scope.row.menutype,scope.row.parentId,scope.row)"></font-awesome-icon>
        </template>

      </el-table-column>

      </el-table>
       <!--添加菜单-->
      <menu-save-update :visible.sync="showmenu" ref="menuSave" @refreshData="query"></menu-save-update>
  </div>
</template>

<script>
  const MenuSaveUpdate=()=>import('@/views/sys/menu/menu-save-update.vue')
  export default{
    data(){
      return{
        data:[],
        showmenu:false,
        currentParentId:'0'
      }
    },
    components:{
      MenuSaveUpdate
    },
    created() {
       this.initData();
    },
    methods:{
      load(row, treeNode, resolve){
        console.log("treeNode>>>",row)
        this.$business.querymenu({"pid":row.id}).then(res=>{
            if(res.code==200){
              resolve(res.data);
            }else{
              resolve([]);
            }
        })
      },
      query(){
        this.data=[];
        this.initData();
      },
      async initData(){
        console.log("-----更新数据");
        console.log(res);
          const res=await this.$business.querymenu({"pid":this.currentParentId});
          if(res.code==200){
            this.data=res.data;
          }
      },
      saveorupdate(type,pid,data){
        console.log("type==>",type)
          this.showmenu=true;
          this.$nextTick(()=>{
            this.$refs.menuSave.init(type,pid,data);
          })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .opt{
    color: $font-color;
    cursor: pointer;
    margin-left: 10px;
  }
</style>
