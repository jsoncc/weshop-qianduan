export default{
   state:{
    // 侧边栏, 折叠状态
    sidebarFold: false,
    //当前导航
    currentMenu:{}
   },
   mutations:{
     updateSidebarFold(state, fold) {
     	state.sidebarFold = fold
     },
     updateCurrentMenu(state,menus){
       state.currentMenu=menus;
     }
   }
}
