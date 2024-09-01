<!-- 此组件加载，说明用户微信扫码授权成功 -->
<template>
    <div class="">

    </div>
</template>
<script setup lang="ts">

import { useRoute } from 'vue-router';
let $route = useRoute()
//获取服务器发过来的用户信息(以query形式携带在重定向的后面)
// console.log($route.query);
//持久化存储用户信息
localStorage.setItem("USERINFO", JSON.stringify($route.query))
// 消除二维码中的frame的小bug
let html: any = document.querySelector('html');
html.style.display = 'none'
</script>
<style scoped></style>
