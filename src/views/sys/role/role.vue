<template>
  <div>

    <div style="text-align: left;margin-bottom: 10px;">
      <el-button type="primary" size="small" @click="saveupdate()">新增</el-button>
    </div>

    <el-table :data="data" border style="width: 100%">
      <el-table-column type="index" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="180">
      </el-table-column>
      <el-table-column prop="note" label="描述">
      </el-table-column>
      <el-table-column prop="adddate" label="创建日期" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <font-awesome-icon v-bind:icon="['fas','edit']" size="lg" title="编辑" class="fasbtn"></font-awesome-icon>
          <font-awesome-icon v-bind:icon=" ['fas','trash-alt']" size="lg" title="删除" class="fasbtn"></font-awesome-icon>
        </template>
      </el-table-column>
    </el-table>

    <!--角色管理-->
    <role-save-update :visible.sync="showrole" ref="roleSave">
    </role-save-update>
  </div>
</template>

<script>
  const RoleSaveUpdate = () => import('@/views/sys/role/role-save-update.vue')

  export default {
    data() {
      return {
        data: [],
        showrole: false
      }
    },
    components: {
      RoleSaveUpdate
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        const res = await this.$business.queryrole({});
        if (res.code == 200) {
          this.data = res.data;
        }
      },
      saveupdate(data) {
        this.showrole = true;
        this.$nextTick(() => {
          this.$refs.roleSave.init(data);
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  // 修改和删除按钮样式
  .fasbtn {
    color: $font-color;
    cursor: pointer;
    margin-left: 10px;
  }
</style>
