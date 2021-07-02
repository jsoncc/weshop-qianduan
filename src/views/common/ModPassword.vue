<template>
  <el-dialog>
    <el-form :model="user" :rules="rules" ref="modform">
      <el-form-item prop="password">
        <el-input placeholder="请输入当前密码" v-model="password"></el-input>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input placeholder="请输入新密码" v-model="newpassword"></el-input>
      </el-form-item>
      <el-form-item prop="confirmpassword">
        <el-input placeholder="请再次输入新密码" v-model="confirmpassword"></el-input>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
  export default{
    data(){
      return{
        user:{
          password:'',
          newpassword:'',
          confirmpassword:'',
          id:''
        },
        rules:{
          password:[{required:true,message:""}]
        }
      }
    },
    components:{
      
    }
    
  }

</script>

<style>

</style>
