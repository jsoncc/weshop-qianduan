<template>
  <div class="site-navbar"
    :class="{'site-navbar-normal':!siteBarFold,'site-sitebar-fold':siteBarFold,'site-sitebar_normal':!siteBarFold}">

    <el-row class="nav_row">
      <el-col :span="16" style="text-align: left;">
        <font-awesome-icon :icon="['fas','outdent']" class="navbar-home" title="折叠" @click="tofold(true)"
          v-if="!siteBarFold"></font-awesome-icon>
        <font-awesome-icon :icon="['fas','indent']" class="navbar-home" title="展开" @click="tofold(false)"
          v-if="siteBarFold" />
        <font-awesome-icon :icon="['fas','home']" class="navbar-home" size="lg"></font-awesome-icon>
        <font-awesome-icon :icon="['fas','chevron-right']" class="navbar-home"></font-awesome-icon>
      </el-col>
      <el-col :span="8">
        <el-dropdown style="margin-right: 100px;cursor: pointer;" @command="handleCommand">
          <span class="el-dropdown-link">
            <font-awesome-icon :icon="['fas','bars']" class="navbar-home"></font-awesome-icon><i
              class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modpwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

  <!-- 导入别的vue文件，需要三步： -->
  <!-- 1. 修改密码 -->
  <ModPassword :visible.sync="showmodpwd" ref="modpwd"> </ModPassword>

  </div>
</template>

<script>
  //2. 导入密码修改
  const ModPassword = ()=>import('@/views/common/ModPassword.vue')

  export default {
    // 3.
    components:{
      ModPassword
    },
    data(){
      return{
        showmodpwd:false
      }
    },
    methods: {
      init(){
        this.user={
          password: '',
          newpassword: '',
          confirmpassword: '',
          id: ''
        };
      },
      tofold: function(val) {
        this.siteBarFold = val;
      },
      logout(){
        /* 非正确的退出登录，是跳转
        localStorage.removeItem("weshop_user");
        this.$router.push("/"); */

        this.$confirm('您确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清除本地的登录信息
          localStorage.removeItem("weshop_user");
          //退回登录页面
          this.$router.push("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          });
        });
      },
      //下拉框的修改密码和退出登录
      handleCommand(common){
        // this.$message('click on item ' + command);//提示点击的信息
        if(common=="modpwd"){//修改密码
          this.showmodpwd = true;
          this.$nextTick(()=>{
            this.$refs.modpwd.init();
          })
        }else if(common=="exit"){//退出登录
          this.logout();
        }
      }
    },
    computed: {
      siteBarFold: {
        get: function() {
          return this.$store.state.common.sidebarFold;
        },
        set: function(val) {
          this.$store.commit("updateSidebarFold", val);
        }
      }
    }
  }
</script>

<style lang="scss">
  .navbar-home {
    color: $theme_icon_color;
    margin-left: 20px;
    cursor: pointer;
  }
  .nav_row {
    width: 100%;
  }
</style>
