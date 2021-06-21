<template>
  <div>
    <!--第一行增加一个添加按钮-->
    <el-row class="btn">
      <el-button type="primary" size="small">添加油站</el-button>
    </el-row>
    <!--表格数据-->
<<<<<<< HEAD
    <el-table stripe v-bind:data="oils" style="width: 100%">
=======
    <el-table stripe border v-bind:data="oils" style="width: 100%">
      <el-table-column label="序号" type="index"></el-table-column>

>>>>>>> add204c (init)
      <el-table-column label="油站名称" width="180" prop="oil_name">
      </el-table-column>

      <el-table-column label="地址" width="180" prop="address">
      </el-table-column>

<<<<<<< HEAD
<<<<<<< HEAD
      <el-table-column label="优惠" prop="discount" >
=======
<<<<<<< HEAD
      <el-table-column label="优惠" prop="discount" >
=======
<<<<<<< HEAD
      <el-table-column label="优惠" prop="discount" >
=======
      <el-table-column label="优惠" prop="discount">
>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
=======
      <el-table-column label="优惠" prop="discount">

>>>>>>> add204c (init)
      </el-table-column>

      <el-table-column label="添加日期" prop="adddate">
      </el-table-column>

      <el-table-column label="状态" prop="status">
<<<<<<< HEAD
      </el-table-column>

<<<<<<< HEAD
      <el-table-column label="操作" >
=======
<<<<<<< HEAD
      <el-table-column label="操作" >
=======
<<<<<<< HEAD
      <el-table-column label="操作" >
=======
      <el-table-column label="操作">
>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
        <a href="#">编辑</a>|<a href="#">删除</a>
=======
        <template v-slot="scope">
          <el-tag v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <font-awesome-icon v-bind:icon="['fas','edit']" size="lg" title="编辑" class="fasbtn"></font-awesome-icon>&nbsp&nbsp
        <font-awesome-icon v-bind:icon="['fas','trash-alt']" size="lg" title="删除" class="fasbtn"></font-awesome-icon>
>>>>>>> add204c (init)
      </el-table-column>

    </el-table>

<<<<<<< HEAD

=======
    <!-- 新增或修改 -->
    <!-- <abc></abc> -->
>>>>>>> add204c (init)
  </div>
</template>

<script>
<<<<<<< HEAD
<<<<<<< HEAD
  import http from '../../utils/http.js'
=======
<<<<<<< HEAD
  import http from '../../utils/http.js'
=======
<<<<<<< HEAD
  import http from '../../utils/http.js'
=======
  

>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
=======
  import http from '../../utils/http.js'

  // 导入新增或修改
  // const OilSaveOrUpdate =()=>import('@/views/oil/oil-save-update.vue')

>>>>>>> add204c (init)
  export default {
    data() {
      //返回一个对象
      return {
        //在这里定义数据属性
        oils: []
      }
    },
<<<<<<< HEAD
    methods: {
      queryOil: function() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
        http.post("/api/oil/list", {}).then(response => {
          //判断接口返回的数据是否正常
          if (response.code == 200) {
            this.oils = response.data;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
        this.$business.queryoil({}).then(response => {
          //判断接口返回的数据是否正常
          if (response.code == 200) {
            // 获取数据
            this.oils = response.data;
          } else {
            this.$message({
              showClose: true,
              message: '跟个🐷似的',
              type: 'error'
            });
>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
          }
=======
    // components:{
    //   "abc":OilSaveOrUpdate()
    // },
    methods: {
      queryOil: function() {

        http.post("/api/oil/list", {}).then(response => {
          this.$business.queryoil({}).then(response => {
            //判断接口返回的数据是否正常
            if (response.code == 200) {
              // 获取数据
              this.oils = response.data;
            } else {
              this.$message({
                showClose: true,
                message: '跟个🐷似的',
                type: 'error'
              });
            }
          });
>>>>>>> add204c (init)
        });
      }
    },
    created() {
      this.queryOil();
    }
<<<<<<< HEAD
<<<<<<< HEAD


=======
<<<<<<< HEAD


=======
<<<<<<< HEAD


=======
>>>>>>> 74f4288 (结构调整完成)
>>>>>>> dbb98e3 (结构调整完成)
>>>>>>> 1a5fe25 (结构调整完成)
=======
>>>>>>> add204c (init)
  }
</script>


<<<<<<< HEAD
<!--scoped="scoped"  说明样式只适用于当前组件-->
<style scoped="scoped">
  .btn {
    text-align: left;
  }
=======
<!-- scoped="scoped"  说明样式只适用于当前组件 -->

<style scoped="scoped" lang="scss">
  .btn {
    text-align: left;
  }

  // 修改和删除按钮样式 
  .fasbtn {
    color: $font-color;
    cursor: pointer;
    margin-left: 10px;
  }
>>>>>>> add204c (init)
</style>
