<template>
  <div>
    <!--第一行增加一个返回按钮-->
    <el-row class="back">
      <a href="../">返回</a>
      <!-- <el-button type="primary" size="small" ">返回</el-button> -->
    </el-row>
    用户：{{oil.oil_name}}的充值记录表
  </div>
</template>

<script>
  export default {
    data() {
      return {
        oil: {},
        page: 1, //默认第一页数据
        pageSize: 10, //默认一页显示10条记录
        total: 0, //总记录数
        pageTotal: 1 //总页数
      }
    },
    methods: {
      queryData() {
        let params = {
          "page": this.page,
          "pageSize": this.pageSize,
          "oilId": this.oil.id
        }
      }
    },
    created() {
      this.oil = this.$route.params;
      this.queryData();
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .back {
    text-align: left;
  }
</style>
