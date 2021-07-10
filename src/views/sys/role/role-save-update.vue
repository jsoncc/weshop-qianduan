<template>
  <el-dialog title="添加角色" :visible="visible" :append-to-body="true" @close="close">
    <el-form label-width="120px">

      <el-form-item label="角色">
        <el-input size="small" v-model="role.role_name" placeholder="请输入角色名"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="role.note" :rows="4" size="small" placeholder="请输入角色描述信息"></el-input>
      </el-form-item>

      <el-form-item label="授权">
        <role-menu ref="roleMenu" @updateAuths="toSave"></role-menu>
      </el-form-item>

    </el-form>

    <div style="text-align: center;">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  const RoleMenu = () => import('@/views/sys/role/role-menu.vue')
  export default {
    data() {
      return {
        role: {
          role_name: '',
          note: '',
          all: [],
          half: []
        }
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false //访问该role页面时是否自动显示新增里的内容
      }
    },
    components: {
      RoleMenu
    },
    methods: {
      save() {
        this.$nextTick(() => {
          this.$refs.roleMenu.getkeys();
        })
      },
      async toSave($event) {
        this.role.all = $event.all;
        this.role.half = $event.half;
        
        //权限为空不允许提交
        if (this.role.all.length == 0) {
          this.$message.warning("请选择角色的授权！");
          return;
        }
        
        console.log("role>>>", JSON.stringify(this.role))
        var res;
        if (this.role.id) {
          res = await this.$business.updaterole(this.role);
        } else {
          res = await this.$business.saverole(this.role);
        }
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.close();
          this.$emit("refreshData");
        }
      },
      init(data) {

      },
      close() {
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style>
</style>
