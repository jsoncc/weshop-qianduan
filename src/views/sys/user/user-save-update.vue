<template>
  <el-dialog title="保存用户" :visible="visible" :append-to-body="true" @close="close">

    <el-form :model="user" :inline="true" :rules="rules" ref="userForm">

      <el-form-item label="用户名" class="formitem" prop="username">
        <el-input v-model="user.username" size="small" class="ipt"></el-input>
      </el-form-item>

      <el-form-item label="密码" class="formitem" prop="password">
        <el-input v-model="user.password" type="password" size="small" class="ipt"></el-input>
      </el-form-item>

      <el-form-item label="姓名" class="formitem">
        <el-input v-model="user.name" size="small" class="ipt"></el-input>
      </el-form-item>

      <el-form-item label="性别" class="formitem">
        <el-radio v-model="user.gender" :label="1">男</el-radio>
        <el-radio v-model="user.gender" :label="2">女</el-radio>
        <el-radio v-model="user.gender" :label="3">保密</el-radio>
      </el-form-item>

      <el-form-item label="手机号" class="formitem">
        <el-input v-model="user.mobile" size="small" class="ipt"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" class="formitem">
        <el-input v-model="user.email" size="small" class="ipt"></el-input>
      </el-form-item>

      <el-form-item label="用户类型" class="formitem">
        <el-select v-model="user.usertype">
          <el-option value="">请选择</el-option>
          <template v-for="item in usertypes">
            <el-option :label="item.dictname" :value="item.dictcode" :key="item.dictcode"></el-option>
          </template>
        </el-select>
      </el-form-item>

    </el-form>

    <el-row style="text-align: center;">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button size="small" @click="close">关闭</el-button>
    </el-row>

  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        usertypes: [],
        user: {
          username: '',
          password: '',
          name: '',
          email: '',
          gender: 1,
          mobile: '',
          usertype: '',
          bid: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            pattern: /^\w{6,}$/,
            message: '密码至少6位的字母或数字',
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
    created() {
      this.queryusertype();
    },
    methods: {
      //保存用户
      save() {
        console.log("------>", this.$refs.userForm)
        this.$refs.userForm.validate(val => {
          console.log("-------------", val)
          if (!val)
            return;
          console.log("保存的用户", this.user)
          this.$business.saveuser(this.user).then(res => {
            if (res.code == 200) {
              this.$message.success("保存成功");
              this.close();
              this.$emit("refreshData");
            } else if (res.code == 0) {
              let error = res.data;
              for (let i in error) {
                this.$message.error(error[i].msg);
              }
            }
          });

        });


      },
      //查询用户类型
      async queryusertype() {
        const res = await this.$business.queryChildDict({
          "code": "usertype"
        });

        console.log("用户类型----",res)
        if (res.code == 200) {
          this.usertypes = res.data;
          console.log("用户类型", this.usertypes)
        }
      },
      init(id) {
        this.user = {
          username: '',
          password: '',
          name: '',
          email: '',
          gender: 1,
          mobile: '',
          usertype: '',
          bid: ''
        };
      },

      close() {
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .formitem {
    width: 100%;
  }

  .ipt {
    width: 100%;
  }

  /deep/ {
    .el-form-item__content {
      width: 70%;
    }

    .el-form-item__label {
      width: 150px;
    }
  }
</style>
