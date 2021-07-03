<template>
  <!-- :visible.sync.sync---------------------------- -->
  <el-dialog :visible.sync="visible" :append-to-body="true" width="30%" @close="close">
    <el-form :model="user" :rules="rules" ref="modform">
      <el-form-item prop="password">
        <el-input placeholder="请输入当前密码" v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input placeholder="请输入新密码" v-model="user.newpassword"></el-input>
      </el-form-item>
      <el-form-item prop="confirmpassword">
        <el-input placeholder="请再次输入新密码" v-model="user.confirmpassword"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="modify">修改</el-button>
      <el-button @click="close">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          password: '',
          newpassword: '',
          confirmpassword: '',
          id: ''
        },
        rules: {
          password: [{
            required: true,
            message: "请输入当前密码",
            trigger: 'blur'
          }],
          newpassword: [{
            required: true,
            message: "新密码不能为空",
            trigger: 'blur'
          }],
          confirmpassword: [{
            required: true,
            message: "确认密码不能为空",
            trigger: 'blur'
          }]
        }
      }
    },
    props: {
      //dialogVisible
      visible: {
        type: Boolean,
        default: false
      }
    },
    //方法里面的值都是加括号,不加冒号的
    methods:{
      init(){
        this.user={
          password: '',
          newpassword: '',
          confirmpassword: '',
          id: ''
        };
      },
      close(){
        this.$emit("update:visible",false);//--------------------------------------------------dialogVisible
      },
      modify(){
        this.$refs.modform.validate(val=>{
          if(!val)
            return;
            console.log("修改用户信息",this.user)
        });
      }
    }
  }
</script>

<style>

</style>
