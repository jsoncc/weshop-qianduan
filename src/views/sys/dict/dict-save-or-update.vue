<template>
  <el-dialog :title="title" :visible="visible" :append-to-body="true" @close="close">
    <el-form :model="dict" :rules="rules" ref="dictForm" :inline="true">

      <el-row class="dict-row">
        <el-form-item prop="dictcode" :label="isgroup?'分组编码:':'字典编码:'">
          <el-input :placeholder="[isgroup?'请输入分组编码(唯一)':'请输入字典编码(唯一)']" v-model="dict.dictcode" size="small" :disabled="title=='修改数据'"
            @blur="check">
          </el-input>
        </el-form-item>
      </el-row>

      <el-row class="dict-row">
        <el-form-item prop="dictname" :label="isgroup?'请输入分组名称':'请输入字典名称'">
          <el-input :placeholder="[isgroup?'请输入分组名称':'请输入字典名称']" v-model="dict.dictname" size="small"></el-input>
        </el-form-item>
      </el-row>

      <!--     <el-row class="dict-row">
        <el-col :span="6" style="text-align: right;padding-right: 20px;">
          {{isgroup?'分组名称':'字典名称'}}
          :</el-col>
        <el-col prop="dictname" :label="isgroup?'请输入分组名称':'请输入字典名称'">
          <el-input :placeholder="[isgroup?'请输入分组名称':'请输入字典名称']" v-model="dict.dictname" size="small"></el-input>
        </el-col>
      </el-row> -->

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

    </el-form>
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
        title: '',
        iscodeenable: true,
        rules: {
          dictcode: [{
              required: true,
              message: '编码为空或重复',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          dictname: [{
            required: true,
            message: '请输入至少6个字符',
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{6,}$/, //匹配中文、英文、字母和数字及_
            trigger: 'blur'
          }, ]
        }
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
      async check() {
        const res = await this.$business.checkcode({
          "pid": this.dict.parentId,
          "dictcode": this.dict.dictcode
        });
        if (res == 200) {
          if (rs.message == "no") {
            this.$business.warning("该编码已存在，请重新填写");
            this.iscodeenable = true;
          } else if (rs.message == "yes") {
            this.$business.info("该编码符合要求，可以输入");
            this.iscodeenable = false;
          }
        }
      },
      init(title, pid, data) {
        this.title = title;
        if (data) {
          this.dict = data;
        } else {
          this.dict = {
            dictcode: '',
            dictname: '',
            dictvalue: '',
            sorts: 0,
            note: '',
            parentId: pid
          };
        }
      },
      //添加/这里也用作修改
      save() {
        this.$refs.dictForm.validate(valid => {
          if (!this.iscodeenable) {
            this.$message.warning("该编码已存在，请重新填写");
            return;
          }
          //验证唯一性不通过，
          if (!valid)
            return;
            
          let promise = null;
          //如果有id，传过来就是修改，没有id，就是添加保存
          if (this.dict.id) {
            promise = this.$business.updatedict(this.dict)
          } else {
            promise = this.$business.savedict(this.dict);
          }
          
          promise.then(res => {
            if (res.code == 200) {
              this.$message.success("保存成功");
              this.close();
              if (this.isgroup) {
                this.$emit("refreshData");
              } else {
                this.$emit("refreshDictData");
              }
            }
          })
        })
        // if (!this.iscodeenable) {
        //   this.$message.warning("该编码已存在，请重新填写");
        //   return;
        // }
        // if (this.dict.dictname == "") {
        //   this.$message.warning("字典名称不能为空！");
        //   return;
        // }

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
