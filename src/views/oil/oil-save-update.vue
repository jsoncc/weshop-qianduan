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
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-col>
    </el-row>

    <el-row>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">取消</el-button>
    </el-row>

  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        oil: {
          oil_name: '',
          address: '',
          longitude: 0,
          latitude: 0,
          discount: '',
          explains: ''
        }
      }
    },
    //保存再次点击时清空
    watch: {
      visible: function(val) {
        if (val == true) {
          this.oil = {
            oil_name: '',
            address: '',
            longitude: 0,
            latitude: 0,
            discount: '',
            explains: ''
          };
        }
      }
    },
    methods: {
      // 保存商品
      save() {
        this.$business.saveoil(this.oil).then(res => {
          if (res.code == 200) {
            this.$message.success("保存成功");
            // 保存成功后关闭
            this.close();
            // 表格显示保存成功的数据，就是刷新一下页面
            this.$emit("refreshData")
          }
        });
      },
      //页面的取消按钮
      close() {
        //抛出一个事件
        this.$emit("update:visible", false)

      },
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      tmpoil: {
        type: Object
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
</style>
