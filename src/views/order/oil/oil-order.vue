<template>
<div>
    <!--订单分类-->
     <el-tabs v-model="currentOrder" type="card">
        <template v-for="ot in ordertypes">
          <el-tab-pane :label="ot.label" :name="ot.value"></el-tab-pane>
        </template>
      </el-tabs>

        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            label="订单号"
            align="center"
            header-align="center">
          </el-table-column>

          <el-table-column
            label="下单日期"
            align="center"
            header-align="center"
            width="180">
          </el-table-column>

          <el-table-column
            label="下单金额"
            align="center"
            header-align="center"
            width="180">
          </el-table-column>

          <el-table-column
            label="下单人"
            align="center"
            header-align="center"
            width="180">
          </el-table-column>

          <el-table-column
            label="车牌号"
            align="center"
            header-align="center"
            width="180">
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            width="180">
          </el-table-column>

        </el-table>
</div>
</template>

<script>
    export default{
      data(){
        return{
          currentOrder:1,
          ordertypes:[{
            label:"待付款",
            value:1
          },{
            label:"待加油",
            value:2
          },{
            label:"已完成",
            value:3
          },{
            label:"已取消",
            value:4
          }]
        }
      }
    }
</script>

<style>
</style>
