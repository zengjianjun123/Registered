<template>
    <div class="top">
        <div class="content">
            <div class="left" @click="toHome">
                <img src="../assets/images/logo.png" alt="">
                <h3>挂号预约中心</h3>
            </div>
            <div class="right">

                <el-dropdown>
                    <span class="el-dropdown-link">
                        其他功能
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu class="drop">
                            <el-dropdown-item @click="goUser('/segmodel')">血管分割</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/fileupload')">视频上传</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <p @click="toLogin" v-if="!userStore.userInfo.name">登录 / 注册</p>

                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        {{ userStore.userInfo.name }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu class="drop">
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
let $router = useRouter()
const toModel = () => {
    $router.push('/segmodel')
}

const toHome = () => {
    $router.push({ path: '/home' })
}
//登录
const toLogin = () => {
    userStore.visiable = true
}
//退出登录
const loginOut = () => {
    //1.仓库清空
    userStore.userInfo = { name: '', token: '' }
    //2.本地清空
    localStorage.removeItem('USERINFO')
    toHome()
}
const goUser = (path: string) => {
    $router.push({ path })
}
</script>
<style scoped>
.dropdown .drop el-dropdown-item:hover {
    color: red;
}

.top {
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 999;
}

.content {
    width: 90%;
    height: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0.5px 0.5px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.left {
    width: 50%;
    height: 80%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 50px;
    padding-left: 20px;
    font-size: 2rem;
}

.right {
    width: 30%;
    height: 60%;
    display: flex;
    justify-content: right;
    gap: 50px;
    align-items: center;
    padding-right: 20px;
    /* font-size: 18px; */
    font-size: 1rem;

}

:deep(.el-dropdown) {
    color: black;
    font-size: 16px;
}

:deep(.el-dropdown-link:focus) {
    outline: none;
}

:deep(.el-dropdown-menu__item:hover) {
    background: #62d4d63d;
    color: black;
}
</style>
