<template>
  <div>

    <el-row style="text-align: left;margin-bottom: 20px;">
      <el-button type="primary" size="small" @click="add('添加分组',0)">添加分组</el-button>
    </el-row>

    <!--tab选项卡-->
    <el-tabs type="card" @tab-click="chg" >
       <template v-for="item in groupitems">
          <el-tab-pane :label="item.dictname" :name="item.id" :key="item.id" ></el-tab-pane>
       </template>
    </el-tabs>

    <el-row style="text-align: right;margin-bottom: 20px;" v-if="groupitems.length>0">
      <el-button type="primary" size="small" @click="add('添加字典',1)">添加字典</el-button>
    </el-row>

    <!--表格数据-->
     <el-table
        border
        stripe
        :data="dicts"
        style="width: 100%">
        <el-table-column
          type="index"
          align="center"
          header-align="center"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="dictcode"
          label="编码"
          align="center"
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dictname"
          label="名称"
          align="center"
          header-align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dictvalue"
          align="center"
          header-align="center"
          width="300"
          label="字典值">
        </el-table-column>
        <el-table-column
          prop="sorts"
          label="排序"
          align="center"
          header-align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          header-align="center">
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          header-align="center"
          width="180">
        </el-table-column>

      </el-table>

      <dict-save-or-update @refreshData="init()" ref="dictsave" :visible.sync="showdict"></dict-save-or-update>
  </div>
</template>

<script>
  const DictSaveOrUpdate =()=>import('@/views/sys/dict/dict-save-or-update.vue')
  export default{
      data(){
        return{
           groupitems:[],
           showdict:false,
           activeitem:{},
           dicts:[]
        }
      },
      components:{
        DictSaveOrUpdate
      },
      created() {
        this.init();
      },
      methods:{
       async init(){
          let parmas={
            "pid":'0'
          };
          const res=await this.$business.querydict(parmas);
          if(res.code==200){
            this.groupitems=res.data;
            // console.log("分组信息",this.groupitems)
            if(this.groupitems.length>0){
               this.activeitem=this.groupitems[0];
               this.querydict();
            }

          }
        },
        //查询字典数据
        async querydict(){
          let parmas={
            "pid":this.activeitem.id
          };
          const res=await this.$business.querydict(parmas);
          if(res.code==200){
            this.dicts=res.data;
          }
        },
        //选项卡切换
        chg(data){
          // console.log("chg>>>>>>>",data.label)
          for(let i in this.groupitems){
            let tmp=this.groupitems[i];
            if(tmp.dictname==data.label){
               this.activeitem=tmp;
               break;
            }
          }
          this.querydict();
        },
        add(title,pid){
           this.showdict=true;
           if(pid==1){
             pid=this.activeitem.id;
           }
           this.$nextTick(()=>{
             this.$refs.dictsave.init(title,pid);
           })
        }
      }
  }
</script>

<style>
</style>
