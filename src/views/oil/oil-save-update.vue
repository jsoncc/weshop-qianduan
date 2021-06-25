<template>
  <!--弹框-->
  <el-dialog title="油站保存" :visible="visible" width="40%" :modal-append-to-body="false" @close="close">
    <el-row class="oil_row">
      <el-col :span="6" class="oil_label">油站名称:</el-col>
      <el-col :span="14" class="oil_ipt_root">
        <el-input size="small" placeholder="请输入油站名称" v-model="oil.oil_name"></el-input>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>

    <el-row class="oil_row">
      <el-col :span="6" class="oil_label">地址:</el-col>
      <el-col :span="14" class="oil_ipt_root">
        <el-input size="small" placeholder="请选择地址" readonly v-model="oil.address"></el-input>
      </el-col>
      <el-col :span="4">
        <font-awesome-icon :icon="['fas','map-marker-alt']" size="2x" style="color: #d00;cursor: pointer;"></font-awesome-icon>
      </el-col>
    </el-row>

    <el-row class="oil_row">
      <el-col :span="6" class="oil_label">优惠:</el-col>
      <el-col :span="14" class="oil_ipt_root">
        <el-input size="small" placeholder="请输入优惠信息" v-model="oil.discount"></el-input>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>

    <el-row class="oil_row">
      <el-col :span="6" class="oil_label">说明:</el-col>
      <el-col :span="14" class="oil_ipt_root">
        <el-input size="small" placeholder="请输入优惠信息" type="textarea" :rows="4" v-model="oil.explains"></el-input>
      </el-col>
      <el-col :span="4">&nbsp;</el-col>
    </el-row>

    <el-row class="oil_row">
      <el-col :span="6" class="oil_label">图片:</el-col>
      <el-col :span="18" class="oil_ipt_root">

        <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload> -->

        <!-- 加上在上传的时候会多一个图片
              感觉应该多显示的这个才是对的，因为设置了只显示一个图片
        -->
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->

        <el-upload :action="uploadurl" :file-list="imglist" list-type="picture-card" :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess" :on-remove="removepic" :before-remove="removeatt">
          <i class="el-icon-plus"></i>

        </el-upload>

        <!-- <template v-for="(imageUrl,index) in imageUrls">
          <img :src="imageUrl" :key="index" class="avatar">
        </template> -->
      </el-col>
    </el-row>

    <el-row>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">取消</el-button>
    </el-row>

  </el-dialog>
</template>

<script>
  //引入api @相当于src
  import api from '@/utils/api.js'

  import host from '../../utils/env.js'

  export default {
    data() {
      return {
        imglist: [],
        host: host,
        oil: {
          oil_name: '',
          address: '',
          longitude: 0,
          latitude: 0,
          discount: '',
          explains: ''
        },
        oilpics: [], //油站图片.
        isshowmap: false,
        uploadurl: api.uploadfile,
        imageUrls: [],
        issub: false
      };
    },

    props: {
      visible: {
        type: Boolean,
        default: false
      },
      tmpoil: {
        type: Object
      }
    },

    //保存再次点击时清空 file_list=[]
    watch: {
      tmpoil: function(val) {
        if (val == undefined) {
          this.oil = {
            oil_name: '',
            address: '',
            longitude: 0,
            latitude: 0,
            discount: '',
            explains: ''
          };
          this.imglist = [];
          this.oilpics = []; //置空
        } else {
          this.oil = val;
          var tmp = this.oil.attachments;
          // 修改功能的图片显示
          for (var i in tmp) {
            this.imglist.push({
              url: this.host + "/" + tmp[i].attUrl,
              id: tmp[i].id
            });
          }

        }
      }
    },

    methods: {

      // 保存商品
      save() {
        if (this.issub) {
          return;
        }
        this.issub = true;


        // 保存商品
        this.oil.pics = this.oilpics;
        console.log("油站信息：", JSON.stringify(this.oil))

        //保存和修改的区别是保存的时候不传ID，修改的时候有id
        var rs;
        if (this.oil.id) {
          //要执行修改
          rs = this.$business.updateoil(this.oil);
        } else {
          //执行保存，也就是添加油站
          rs = this.$business.saveoil(this.oil)
        }
        rs.then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
            //关闭
            this.close();
            //抛出一个事件  去触发父组件的方法
            this.$emit("refeshData");
          }
          this.issub = false;
        });
      },

      // this.$business.saveoil(this.oil).then(res => {
      //   if (res.code == 200) {
      //     this.$message.success("保存成功");
      //     // 保存成功后关闭
      //     this.close();
      //     // 表格显示保存成功的数据，就是刷新一下页面
      //     this.$emit("refreshData")
      //   }
      // });


      //页面的取消按钮
      close() {
        //抛出一个事件
        this.$emit("update:visible", false)

      },

      //用户头像上传
      //上传成功之后的图片
      handleAvatarSuccess(res, file, fileList) {
        console.log("上传成功", fileList)

        this.processpic(fileList);


        //对应上面的 <img v-if>
        // this.imageUrl = URL.createObjectURL(file.raw);


        // //遍历上传的结果
        // for(let i in fileList){
        //   let tmp = fileList[i];
        //   let tmpurl = URL.createObjectURL(tmp.raw);
        //   this.imageUrls.push(tmpurl);
        // }

      },
      //上传前的图片的类型
      beforeAvatarUpload(file) {

        var ptype = "image/jpeg;image/png"

        // const isJPG = file.type === 'image/jpeg';
        const isLt10M = file.size / 1024 / 1024 < 10;

        if (ptype.indexOf(file.type) < 0) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
          return false;
        }
        if (!isLt10M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isLt10M;
      },
      //移除图片
      removepic(file, fileList) {
        console.log("移除图片", fileList);
        this.processpic(fileList);
      },
      //处理上传的图片集
      processpic(fileList) {
        //先清空
        this.imageUrls = [];
        //遍历上传的结果
        for (let i in fileList) {
          let tmp = fileList[i];
          this.oilpics.push(tmp.response.data);
        }
      },
      // // 删除附件-图片
      // removeatt(file, fileList) {
      //   console.log("要删除的图片：", file);
      //   this.$confirm('确定要删除图片吗?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {

      //     this.$business.deleteatt({id:file.id}).then(res=>{
      //       console.log(res);
      //     })

      //   }).catch(() => {
      //     //返回（取消）有误
      //     return false;
      //   });
      // },
      // 删除附件-图片--改为异步修改返回的值
      async removeatt(file, fileList) {
        const res = await this.$business.deleteatt({id:file.id});
        
        if(res.code==200){
          return true;
        }else{
          return false;
        }
      }
      


    }
  }
</script>

<style scoped="scoped">
  .oil_row {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .oil_label {
    text-align: right;
    padding-right: 10px;
    color: #666;
    font-size: 16px;

  }

  .oil_ipt_root {
    text-align: left;
  }


  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    float: left;
    margin-left: 10px;
  }
</style>
