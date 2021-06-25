<template>
  <div>
    <!--第一行增加一个添加按钮-->
    <el-row class="btn">
      <el-button type="primary" size="small" @click="saveorupdate()">添加油站</el-button>
    </el-row>
    <!--第二行 增加搜索功能-->
    <el-row class="search">
      <el-col :span="5">
        <el-input placeholder="请输入油站名称" size="small" v-model="filter.oil_name"></el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="5">
        <el-input placeholder="请输入油站地址" size="small" v-model="filter.address"></el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="5">
        <el-select v-model="filter.status" placeholder="请选择">
          <el-option value="">全部</el-option>
          <el-option value="1">启用</el-option>
          <el-option value="0">禁用</el-option>
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="queryOil()">查询</el-button>
      </el-col>
    </el-row>

    <!--表格数据-->
    <el-table stripe border v-bind:data="oils" style="width: 100%">
      <!--增加一列表 显示展开行内容-->
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="油站名称">
              <span>{{ props.row.oil_name }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="优惠">
              <span>{{ props.row.discount }}</span>
            </el-form-item>
            <el-form-item label="添加日期">
              <span>{{ props.row.adddate }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag v-if="props.row.status==1">启用</el-tag>
              <el-tag type="info" v-else>禁用</el-tag>
            </el-form-item>
            <el-form-item label="说明">
              <span>{{ props.row.explains }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <template v-for="pic in props.row.attachments">
                <img :src="host+pic.attMiniUrl" class="oilimg" />
              </template>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="序号" type="index"></el-table-column>

      <el-table-column label="油站名称" width="150" prop="oil_name">
      </el-table-column>

      <el-table-column label="地址" width="180" prop="address">
      </el-table-column>

      <el-table-column label="优惠" prop="discount">

      </el-table-column>

      <el-table-column label="说明" prop="explains">

      </el-table-column>

      <el-table-column label="添加日期" prop="adddate">
      </el-table-column>

      <el-table-column prop="status" width="100" header-align="center" align="center" label="状态">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template v-slot="scope">
          <font-awesome-icon v-bind:icon="['fas','play-circle']" size="lg" title="启用" class="fasbtn" @click="chgstauts(scope.row.id,1)" v-if="scope.row.status==0"></font-awesome-icon>
          <font-awesome-icon v-bind:icon="['fas','pause-circle']" size="lg" title="禁用" class="fasbtn" @click="chgstauts(scope.row.id,0)" v-else></font-awesome-icon>
          <font-awesome-icon v-bind:icon="['fas','edit']" size="lg" title="编辑" class="fasbtn" @click="saveorupdate(scope.row)"></font-awesome-icon>&nbsp&nbsp
          <font-awesome-icon v-bind:icon="['fas','trash-alt']" size="lg" title="删除" class="fasbtn" @click="del(scope.row.id)"></font-awesome-icon>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增或修改 -->
    <!--添加或修改-->
    <!-- <oil-save-or-update :visible.sync="isshow" @refeshData="queryOil" :tmpoil="showdata"></oil-save-or-update> -->
    <oil-save-or-update ref="saveOrUpdate" :visible.sync="isshow" @refreshData="queryOil" :tmpoil="showdata"></oil-save-or-update>
  </div>
</template>

<script>
  // import http from '../../utils/http.js'
  import host from '../../utils/env.js'

  // 导入新增或修改
  const OilSaveOrUpdate = () => import('@/views/oil/oil-save-update.vue')

  export default {
    data() {
      //返回一个对象
      return {
        //查询条件
        filter: {
          oil_name: '',
          address: '',
          status: ''
        },

        //在这里定义数据属性
        oils: [],
        isshow: false, //是否显示添加框
        host: host + "/",
        showdata: {}
      }
    },
    components: {
      OilSaveOrUpdate
    },

    methods: {
      //启用和禁用
      async chgstauts(id,status){
        let params = {
          id:id,
          status:status
        };
        const res = await this.$business.updateoil(params);
        if(res.code == 200){
          this.$message.success("操作成功");
          this.queryOil();
        }
      },
      //查询 这个this指的是啥
      queryOil: function() {
        var params = {
          "page": this.page,
          "pageSize": this.pageSize, //分页功能还没实现
          "oil_name": this.filter.oil_name,
          "address": this.filter.address,
          "status": this.filter.status
        };
        this.$business.queryoil(params).then(response => {
          //判断接口返回的数据是否正常
          // console.log(response);
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
      },
      //删除油站
      del(id) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          //调用删除功能
          this.$business.deleteoil(id).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //重新查询一次
              this.queryOil();
            } else if (res.code == 0) {
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          })
        }).catch(() => {});
      },

      //添加油站
      saveorupdate(data) {
        // console.log("edit:", data);
        this.showdata = data;
        this.isshow = true;
        //methods中init方法的使用，对watch优化
        this.$refs.saveOrUpdate.init(data);

      }
    },

    created() {
      this.queryOil();
    }
  }
</script>
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

  //列表的图片样式
  .oilimg {
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  //
  .search {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
