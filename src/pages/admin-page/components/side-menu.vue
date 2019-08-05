<template>
  <el-aside
    style="width:200px;background:#ccc;height:100%;"
  >
    <el-menu
      :default-active="String(menuIndex)"
      active-text-color="#fff"
    >
      <el-menu-item
        v-for="(item,index) in menus"
        :key="index"
        :index="String(index+1)"
        @click="selectMenu(index)"
      >
        <i :class="menuIcons[index]" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
    data() {
        return{
            menus:[
                {name:"用户"},
                {name:"角色"},
                {name:"权限"},
                {name:"任务"},
            ],
            menuIcons:[
                'el-icon-user',
                'el-icon-bangzhu',
                'el-icon-data-line',
                'el-icon-odometer',
            ],
            menuIndex:1,
        }
    },
    activated() {
    },
    created() {
        this.menuIndex = sessionStorage.getItem("menuIndex") || 1
    },
    mounted() {
         
    },
    methods: {
        selectMenu(index) {
            this.menuIndex = index + 1
            sessionStorage.setItem("menuIndex",this.menuIndex)
            switch(index + 1) {
                case 1:
                    this.router.push({
                        path:"/watch-feature/main"
                    })
                    break;
                case 2:
                    this.router.push({
                        path:"/feature-project/index"
                    })
                    break;
                case 3:
                    this.router.push({
                        path:"/model-build/index"
                    })
                    break;
                case 4:
                    this.router.push({
                        path:"/model-comment/index"
                    })
                    break;
            }
        },
    },
}
</script>

<style scoped lang="less">
</style>
<style lang="less">
.el-menu-item{
  background-color: #ccc;
}
.el-menu-item.is-active {
   background-color:#337BF7 !important;
}
.el-menu-item:hover {
   background-color:#337BF7 ;
   color:#fff;
}
</style>

