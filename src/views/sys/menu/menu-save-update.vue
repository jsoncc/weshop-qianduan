<template>
  <el-dialog title="新增菜单" :visible="visible" :append-to-body="true" @close="close">
    <el-form label-width="120px" :model="menu" :rules="rules" ref="menuForm">
      <!--
      <el-form-item label="类型">
        <el-radio v-model="menu.menutype" label="1">一级菜单</el-radio>
        <el-radio v-model="menu.menutype" label="2">二级菜单</el-radio>
        <el-radio v-model="menu.menutype" label="3">按钮</el-radio>
      </el-form-item>-->

      <el-form-item label="菜单名称" prop="menuname">
        <el-input size="small" v-model="menu.menuname"></el-input>
      </el-form-item>

      <el-form-item label="路由" v-if="menu.menutype==2">
        <el-input size="small" v-model="menu.routepath"></el-input>
      </el-form-item>

      <el-form-item label="授权" v-if="menu.menutype==3">
        <el-input size="small" v-model="menu.authorization"></el-input>
      </el-form-item>

      <el-form-item label="图标" v-if="menu.menutype!=3">
        <el-input size="small" v-model="menu.icon" :readonly="true" @click.native="showchooseicon=true"></el-input>
        <!--选择图标-->
        <choose-icon :visible.sync="showchooseicon" @selecticon="sel"></choose-icon>
      </el-form-item>

      <el-form-item label="排序">
        <el-input-number size="small" v-model="menu.sorts" :min="0"></el-input-number>
      </el-form-item>

    </el-form>

    <div style="text-align: center;">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </div>



  </el-dialog>
</template>

<script>
  const ChooseIcon = () => import('@/views/sys/menu/choose-icon.vue')
  export default {
    data() {
      return {
        showchooseicon: false,
        menu: {
          menutype: '1',
          menuname: '',
          parentid: '0',
          routepath: '',
          sorts: 0,
          authorization: '',
          icon: ''
        },
        rules: {
          menuname: [{
            required: true,
            message: "菜单名称不能为空！",
            trigger: 'blur'
          }]
        }
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    components: {
      ChooseIcon
    },
    methods: {
      init(type, pid, data) {
        if (data == undefined) {
          this.menu = {
            menutype: type + "",
            menuname: '',
            parentid: pid,
            routepath: '',
            sorts: 0,
            authorization: '',
            icon: ''
          };
        } else {
          this.menu = data;
          console.log("修改", this.menu)
        }
      },

      save() {
        this.$refs.menuForm.validate(val => {
          if (!val) {
            return;
          }

          var result = null;
          if (this.menu.id) {
            result = this.$business.updatemenu(this.menu);
          } else {
            result = this.$business.savemenu(this.menu);
          }


          console.log("当前菜单信息", this.menu)
          result.then(res => {
            if (res.code == 200) {
              this.$message.success("保存成功");
              this.close();
              this.$emit("refreshData");
            }
          })
        });
      },
      sel(icon) {
        console.log("选择：", icon)
        this.menu.icon = icon;
      },
      close() {
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style>
</style>
