<template>
  <div id="app">
    <div :class="{ 'main-contianer': isShowSide}">
      <SideMenu v-if="isShowSide" />
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          class="right-container"
        />
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        class="right-container"
      />
    </div>
  </div>
</template>

<script>  
let list = ['/a/login'];
import SideMenu from './components/side-menu'
export default {
    components:{
        SideMenu
    },
    data() {
        return{
            isShowSide:false,
        }
    },
    watch:{
        $route(to) {
            let toPath = to.path;
            for(let i = 0;i < list.length;i++) {
                if(toPath.includes(list[i])) {
                    this.isShowSide = false;
                    break;
                } 
                if(i === list.length - 1) {
                    this.isShowSide = true;
                }
            }
        } 
    },
    created() {
        console.log("aa-",this.isLogin)
    }
};
</script>

<style scoped lang="less">
 .main-contianer{
  display:flex;
  position: relative;
  height:100%;
} 
.right-container{
  width:calc(100% - 200px);
  padding: 0 10px;
  overflow:hidden;
}
</style>

<style lang="less">
#app{
  font-size:14px;
  font-family:MicrosoftYaHei;
  height:96vh;
}
</style>
