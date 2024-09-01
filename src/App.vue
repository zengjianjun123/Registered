<template>
  <div class="container">
    <Navigate />

    <div class="content">
      <!-- 展示路由组件区域 -->
      <!-- <div class="aitalk"></div> -->
      <router-view></router-view>
    </div>
    <div class="aitalk">
      <img src="https://kimi.moonshot.cn/kimi-chat/assets/avatar/kimi_avatar_keep_light.png" alt="GPT助手" @click="toAI">
    </div>
    <Footer />
    <!-- 登录组件 -->
    <Login />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter()
const toAI = () => {
  $router.push({ path: '/ai' })
}
// import request from './utils/request';
// import axios from 'axios';
// import { onMounted } from 'vue';
// onMounted(() => {
//   axios.get('/my/home').then((res) => {
//     console.log('aaaa');

//     console.log(res);

//   })
// })
</script>
<style scoped>
body,
html {
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

}

.aitalk {
  height: 200px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  top: 40vh;
  right: 5%;
  transform: translate(40%, -50%);

}

.content {
  width: 100%;
  min-height: 1000px;
  /* background-color: blueviolet; */
  margin-top: 110px;
  position: relative;
}
</style>
