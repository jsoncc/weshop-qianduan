<template>
  <div>
    <!--第一行增加一个添加按钮-->
    <el-row class="btn">
      <el-button type="primary" size="small" @click="saveorupdate()">添加用户</el-button>
    </el-row>
    <!--第二行 增加搜索功能-->
    <el-row class="search">
      <el-col :span="5">
        <el-input placeholder="请输入用户名称" size="small" v-model="filter.oil_name"></el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="5">
        <el-input placeholder="请输入用户地址" size="small" v-model="filter.address"></el-input>
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
        <el-button type="primary" size="small" @click="initData()">查询</el-button>
      </el-col>
    </el-row>
    <!--表格数据-->
    <el-table stripe border v-bind:data="data" style="width: 100%">
      <!--增加一列表 显示展开行内容-->
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="用户名:">
              <span>{{ props.row.username }}</span>

            </el-form-item>
            <el-form-item label="姓名:">
              <span>{{ props.row.name }}</span>
            </el-form-item>

            <!--
                展开行不显示性别了
                显示的话需要
            -->
            <!-- <el-form-item label="性别:">
              <span>{{ props.row.gender }}

              </span>
            </el-form-item> -->
            
            <el-form-item label="电话:">
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="邮件:">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="用户类型:">
              <span>{{ props.row.usertype }}</span>
            </el-form-item>
            <el-form-item label="状态:">
              <el-tag v-if="props.row.status==1">启用</el-tag>
              <el-tag type="info" v-else>禁用</el-tag>
            </el-form-item>
            <el-form-item label="添加日期:">
              <span>{{ props.row.adddate }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" width="80" header-align="center" align="center"></el-table-column>
      <el-table-column label="用户名" header-align="center" prop="username" width="150">
      </el-table-column>
      <el-table-column label="姓名" header-align="center" prop="name" width="150">
      </el-table-column>
      <el-table-column width="80" header-align="center" label="性别">
        <template v-slot="scope">
          <span v-if="scope.row.gender==1">男</span>
          <span v-else-if="scope.row.gender==2">女</span>
          <span v-else>保密</span>
        </template>
      </el-table-column>

      <el-table-column prop="usertype" width="150" header-align="center" align="center" label="用户类型">
      </el-table-column>

      <el-table-column prop="mobile" width="150" header-align="center" align="center" label="电话">
      </el-table-column>

      <el-table-column prop="status" width="100" header-align="center" align="center" label="状态">
        <template v-slot="scope">
          <el-tag v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column  header-align="center" align="center" label="操作">
        <template v-slot="scope">
          <font-awesome-icon v-bind:icon="['fas','play-circle']" size="lg" title="启用" class="fasbtn" @click="chgstauts(scope.row.id,1)"
            v-if="scope.row.status==0"></font-awesome-icon>
          <font-awesome-icon v-bind:icon="['fas','pause-circle']" size="lg" title="禁用" class="fasbtn" @click="chgstauts(scope.row.id,0)"
            v-else></font-awesome-icon>
          <font-awesome-icon v-bind:icon="['fas','edit']" size="lg" title="编辑" class="fasbtn" @click="saveorupdate(scope.row)"></font-awesome-icon>
          <font-awesome-icon v-bind:icon="['fas','trash-alt']" size="lg" title="删除" class="fasbtn" @click="deluser(scope.row.id)"></font-awesome-icon>
        </template>
      </el-table-column>

    </el-table>

    <!--分页   item in items -->
    <el-row class="fenye">
      共{{total}}条
      <span class="myxs">每页显示</span>
      <el-select size="small" class="sel" v-model="pageSize" v-on:change="chg">
        <el-option v-for="(p,index) in pageoptions" v-bind:value="p" :key="index">{{p}}</el-option>
      </el-select><span style="margin-left: 5px; margin-right: 20px;">条</span>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="goto">
      </el-pagination>
    </el-row>

    <!--添加或修改-->
    <user-save-update ref="saveOrUpdate" :visible.sync="isshow" @refreshData="initData"></user-save-update>
  </div>
</template>

<script>
  //引入新增或修改组件
  const UserSaveUpdate = () => import('@/views/sys/user/user-save-update.vue')
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
        data: [],
        pageoptions: [10, 15, 20, 50, 100],
        page: 1, //默认第一页数据
        pageSize: 10, //默认一页显示10条记录
        total: 0, //总记录数
        pageTotal: 1, //总页数
        isshow: false, //是否显示添加框
        showdata: {}, //添加或保存显示的数据
      }
    },
    components: {
      UserSaveUpdate
    },
    methods: {

      //启用和禁用
      async chgstauts(id, status) {
        let params = {
          id: id,
          status: status
        };
        const res = await this.$business.updateoil(params);
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.initData();
        }
      },
      //声明查询油站
      initData: async function() {
        var params = {
          "page": this.page,
          "pageSize": this.pageSize
        };

        const res = await this.$business.queryuserlist(params);
        if (res.code == 200) {
          this.data = res.data;
          // this.initData();//一旦开启，用户管理页面用户的展开栏打开不了，应该是在执行一直刷新，而且电脑内存cpu直接飙升
        }

      },
      // 更改每页显示的记录数
      chg: function() {
        this.page = 1; //当每页记录数变化 时   查询 第一页记录
        this.initData();
      },
      //页面跳转
      goto(page) {
        //更改当前页数
        this.page = page;
        this.initData();
      },
      //删除用户
      deluser(id) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          //调用删除功能
          this.$business.queryuserlist()

          this.$business.deleteoil(id).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //重新查询一次
              this.initData();
            } else if (res.code == 0) {
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          })


        }).catch(() => {});
      },
      saveorupdate(data) {
        //  this.showdata=data;
        this.isshow = true;
        this.$nextTick(() => {
          this.$refs.saveOrUpdate.init(data);
        })
      }
    },
    created() {
      //调用查询方法
      this.initData();
    }
  }
</script>


<!--scoped="scoped"  说明样式只适用于当前组件-->
<style scoped="scoped" lang="scss">
  .btn {
    text-align: left;
    margin-bottom: 20px;
  }

  .fasbtn {
    color: $font-color;
    cursor: pointer;
    margin-left: 10px;
  }

  .fenye {
    text-align: right;
    margin-top: 20px;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .myxs {
    margin-left: 20px;
    margin-right: 5px;
  }

  .sel {
    width: 100px;
  }

  .oilimg {
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .search {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
