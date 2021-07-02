<template>
  <div class="login_root">
    <div class="login">
      <div class="title">管理员登录</div>
      <el-form :model="user" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="user.username" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 预定义一个类似于input框中的value，直接在浏览器显示界面输入用户名密码等 -->
          <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
        </el-form-item>

        <el-form-item prop="yzm">
          <el-input placeholder="请输入验证码" v-model="user.yzm" class="fi" ></el-input><span
            style="margin-left: 20px;">258221</span>
        </el-form-item>

      </el-form>
      <div class="loginbtn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
          yzm: ''
        },
        rules: {
          username: [{
            required: true,
            message: "用户名不能为空！",
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: "密码不能为空！",
            trigger: 'blur'
          }],
          yzm: [{
            required: true,
            message: "验证码不能为空！",
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      localStorage.removeItem("weshop_user");
    },
    methods:{
       login(){
          this.$refs.loginForm.validate(val=>{
             if(!val)
               return;
             console.log("用户登录信息",this.user)
             this.$business.login(this.user).then(res=>{
               if(res.code==200){
                    //将用户信息存储到本地
                    localStorage.setItem("weshop_user",JSON.stringify(res.data));
                    //跳转到主页面
                    this.$router.push("/main");
               }else if(res.code==0){
                 this.$message.error(res.msg);
               }
             })

          });
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .login_root {
    width: 100%;
    height: 100%;
    // background-image: url(../../assets/images/bg.jpg);
    padding-top: 100px;
  }

  .login {
    width: 500px;
    height: 500px;
    background-color: #ffffff;
    border-radius: 15px;
    margin: auto;

  }

  .title {
    line-height: 100px;
    font-size: 40px;
    color: #333;
  }

  .fi {
    width: 60%;
    margin-left: 0;

  }

  .loginbtn {
    width: 80%;
    margin: auto;
    background-color: #409EFF;
    color: #fff;
    padding: 10px 0;
    border-radius: 10px;
    margin-top: 100px;
    cursor: pointer;
  }

  /deep/ {
    .el-form-item__content {
      width: 80%;
      margin: auto;
      text-align: left;
    }
  }
</style>
