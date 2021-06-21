export default{
   state:{
    // 侧边栏, 折叠状态
    sidebarFold: false,
    //二级导航内容
    twomenus:[]
   },
   mutations:{
     updateSidebarFold(state, fold) {
     	state.sidebarFold = fold
     },
     updateTwomenus(state,menus){
       state.twomenus=menus;
     }
   }
}
