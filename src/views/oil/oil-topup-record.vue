<template>
  <div>
    <!--第一行增加一个返回按钮-->
    <el-row class="back">
      <a href="../">返回</a>
      <!-- <el-button type="primary" size="small" ">返回</el-button> -->
    </el-row>
    <el-row class="record_head">
      {{oil.oil_name}}的充值记录
    </el-row>
    <el-row style="text-align: left;margin-top: 10px;margin-bottom: 10px;">
      <el-button type="primary" size="small" @click="save()">充值</el-button>
    </el-row>

    <el-table stripe border style="width: 100%" :data="oilrecord">
      <el-table-column type="index" label="序号" align="center" header-align="center" width="80">
      </el-table-column>
      <el-table-column prop="money" align="center" header-align="center" label="充值金额" width="200">
      </el-table-column>
      <el-table-column prop="topupdate" label="充值日期" align="center" header-align="center" width="180">
      </el-table-column>
      <el-table-column prop="note" align="center" header-align="center" label="备注">
      </el-table-column>
    </el-table>

    <!--分页   item in items -->
    <el-row class="fenye">
      共{{total}}条
      <span class="myxs">每页显示</span>
      <el-select size="small" class="sel" v-model="pageSize" v-on:change="chg">
        <el-option v-for="(p,index) in pageoptions" v-bind:value="p" :key="index">{{p}}</el-option>
      </el-select><span style="margin-left: 5px; margin-right: 20px;">条</span>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="goto">
      </el-pagination>
    </el-row>


    <oil-record-save-or-update @refreshData="queryData" ref="recordSave" :visible.sync="showRecord"></oil-record-save-or-update>
  </div>
  </div>
</template>

<script>
  const OilRecordSaveOrUpdate = () => import('@/views/oil/oil-record-save-or-update.vue')

  export default {
    data() {
      return {
        oil: {},
        page: 1, //默认第一页数据
        pageSize: 10, //默认一页显示10条记录
        total: 0, //总记录数
        pageTotal: 1, //总页数
        oilrecord: [],
        pageoptions: [5, 10, 15, 20, 50, 100],
        showRecord:false
      }
    },
    components: {
      OilRecordSaveOrUpdate
    },
    methods: {

      //分页
      // 更改每页显示的记录数
      chg: function() {
        this.page = 1; //当每页记录数变化 时   查询 第一页记录
        this.queryData();
      },
      //页面跳转
      goto(page){
        //更改当前页数
        this.page=page;
        this.queryData();
      },

      async queryData() {
        
         let params = {
            "page": this.page,
            "pageSize": this.pageSize,
            "oid": this.oil.id
          };
          console.log("params:",params)
          const response = await this.$business.listrecord(params);
          if (response.code == 200) {
            this.oilrecord = response.data; //获取列表数据
            //当前页数
            this.page = response.page;
            //每页记录数
            this.pageSize = parseInt(response.pageSize);
            //总记录数
            this.total = parseInt(response.total);

            var tmp = parseInt(this.total / this.pageSize);
            //总页数
            this.pageTotal = this.total % this.pageSize == 0 ? tmp : (tmp + 1);
          }
      },
      save() {
        this.showRecord = true;
        this.$nextTick(() => {
          this.$refs.recordSave.init(this.oil.id);
        })
      }
    },
    created() {
      this.oil = this.$route.params;
      this.queryData();
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .back {
    text-align: left;
  }

  .record_head {
    font-size: 30px;
    color: #666;
    border-style: none;
    border-bottom: #f1f1f1 solid 1px;
    padding-bottom: 10px;
  }

  .fenye {
    text-align: right;
    margin-top: 20px;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .myxs {
    margin-left: 20px;
    margin-right: 5px;
  }
</style>
