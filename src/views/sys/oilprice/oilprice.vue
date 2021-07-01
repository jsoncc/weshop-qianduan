<template>
  <div>

    <el-row style="margin-top: 10px;margin-bottom: 10px;" >
      <el-col :span="4">[动态显示油站名称]</el-col>
      <el-col :span="20">
        <el-button class="btn" round size="small">新增</el-button>
        <el-button round size="small" @click="$router.back(-1)">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
</script>

<style scoped="scoped" lang="scss">
  .btn {
    font-color: white;
  }
</style>
