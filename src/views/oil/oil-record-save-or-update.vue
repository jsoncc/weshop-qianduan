<template>
  <el-dialog title="充值" :visible="visible" :append-to-body="true" @close="close">
    <el-row class="record_row">
      <el-col :span="6" style="text-align: right;padding-right: 15px;">充值金额:</el-col>
      <el-col :span="18">
        <el-input-number size="small" :min="1000" :step="1000" v-model="record.money"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="record_row">
      <el-col :span="6" style="text-align: right;padding-right: 15px;">充值日期:</el-col>
      <el-col :span="18">
        <el-date-picker v-model="record.topupdate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
          placeholder="选择日期"></el-date-picker>
      </el-col>
    </el-row>

    <el-row class="record_row">
      <el-col :span="6" style="text-align: right;padding-right: 15px;">备注:</el-col>
      <el-col :span="18">
        <el-input type="textarea" :rows="4" v-model="record.note"></el-input>
      </el-col>
    </el-row>

    <el-row class="record_row" style="text-align: center;">
      <el-button type="primary" size="small" @click="save">保存</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </el-row>

  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        record: {
          money: 0,
          topupdate: '',
          note: '',
          oid: ''
        }
      }

    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      init(id) {
        this.record = {
          money: 0,
          topupdate: '',
          note: '',
          oid: id
        };
      },
      async save() {
        const res = await this.$business.saverecord(this.record);
        if (res.code == 200) {
          this.$message.success("充值成功 ");
          this.close();
          this.$emit("refreshData");
        }
      },
      close() {
        this.$emit("update:visiable", false);
      }
    }
  }
</script>

<style>
  .record_row {
    margin-bottom: 20px;
  }
</style>
