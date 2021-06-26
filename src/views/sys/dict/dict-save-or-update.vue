<template>
  <el-dialog :title="title" :visible="visible" :append-to-body="true" @close="close">
    <el-row class="dict-row">
      <el-col :span="6" style="text-align: right;padding-right: 20px;">
        {{isgroup?'分组编码:':'字典编码:'}}
      </el-col>
      <el-col :span="18">
        <el-input :placeholder="isgroup?'请输入分组编码(唯一)':'请输入字典编码(唯一)'" v-model="dict.dictcode" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row class="dict-row">
      <el-col :span="6" style="text-align: right;padding-right: 20px;">
        {{isgroup?'分组名称':'字典名称'}}
        :</el-col>
      <el-col :span="18">
        <el-input :placeholder="[isgroup?'请输入分组名称':'请输入字典名称']" v-model="dict.dictname" size="small"></el-input>
      </el-col>
    </el-row>

    <el-row class="dict-row" v-if="!isgroup">
      <el-col :span="6" style="text-align: right;padding-right: 20px;">字典值:</el-col>
      <el-col :span="18">
        <el-input placeholder="请输入字典值" v-model="dict.dictvalue" size="small"></el-input>
      </el-col>
    </el-row>

    <el-row class="dict-row">
      <el-col :span="6" style="text-align: right;padding-right: 20px;">排序:</el-col>
      <el-col :span="18">
        <el-input-number v-model="dict.sorts" size="small" :min="0" :step="1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="dict-row" v-if="!isgroup">
      <el-col :span="6" style="text-align: right;padding-right: 20px;">备注:</el-col>
      <el-col :span="18">
        <el-input :rows="4" type="textarea" v-model="dict.note" placeholder="请输入描述信息"></el-input>
      </el-col>
    </el-row>

    <el-row style="text-align: center;">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dict: {
          dictcode: '',
          dictname: '',
          dictvalue: '',
          sorts: 0,
          note: '',
          parentId: '0'
        },
        title: ''
      }
    },
    //计算属性
    computed: {
      isgroup: function() {
        return this.title == '添加分组';
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      init(title, pid) {
        this.title = title;
        this.dict = {
          dictcode: '',
          dictname: '',
          dictvalue: '',
          sorts: 0,
          note: '',
          parentId: pid
        };
      },
      async save() {
        if (this.dict.dictname == "") {
          this.$message.warning("字典名称不能为空！");
          return;
        }
        const res = await this.$business.savedict(this.dict);
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.close();
          this.$emit("refreshData");
        }
      },
      close() {
        this.$emit("update:visible", false);
      }
    }
  }
</script>

<style scoped="scoped">
  .dict-row {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
</style>
