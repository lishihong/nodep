<template>
  <div class="login">
    <div style="height:34vh;" />
    <div class="title">
      权限管理模块设计
    </div>
    <div>
      <label>用户名</label>
      <input
        v-model="username"
        placeholder="请输入用户名"
      >
    </div>
    <div style="margin-top:20px;">
      <label>密&nbsp;&nbsp;&nbsp;码</label>
      <input
        v-model="password"
        type="password"
        placeholder="请输入密码"
      >
    </div>
    <el-button
      type="primary"
      style="margin-top:30px;"
      @click="login"
    >
      登&nbsp;&nbsp;&nbsp;录
    </el-button>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest.js';
import {setUser} from '../services/user'
export default {
    data() {
        return {
            cn:"",
            screenW:"",
            username:"",
            password:"",
        }
    },
    created() {
        this.screenW = document.documentElement.clientWidth;
    },
    mounted() {
        const config = {
            color: '225,228,232',
            count: parseInt(12 + this.screenW * 0.3),
            opacity: 0.7,
            zIndex: -2,
        };
        let el = document.querySelector(".login");
        this.cn = new CanvasNest(el, config);
        window.onresize = () => {
            return (() => {
                this.cn = new CanvasNest(el, config);
            })
        };
    }, 
    destroyed() {
        this.cn.destroy();
    },
    methods: {
        login() {
            this.requestUtil.post(this.urls.aLogin.url,{username:this.username,password:this.password}).then((res)=>{
                if(res.code == 200) {
                    setUser(res.data);
                    this.router.push({
                        path:"/a/home"
                    })
                }else{
                    console.log(res.msg)
                }
            })
        }
    },
}
</script>
<style>
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    outline:none;
}
</style>

<style scoped lang="less">
.login{ 
  text-align: center;
  height:100%;
  input{
    height:30px;
    width:240px;
    margin-left:10px;
    line-height: 30px;
    border:solid 1px rgb(59, 57, 57);
  }
  label{
    font-size:16px;
  }
  .title{
    margin-bottom: 6vh;
    font-size:24px;
    color:#111;
  }
  i{
    font-size:24px;
  }
}
</style>
