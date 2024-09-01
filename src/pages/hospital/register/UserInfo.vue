<!-- 就诊人组件 -->
<template>
    <div class="container">
        <div class="top_11">
            <div class="text">
                <div class="yibao">{{ user.isInsure == 1 ? '医保' : '自费' }}</div>
                <span class="name">{{ user.name }}</span>
            </div>

            <div class="btn" v-if="$route.path == '/user/patient'">
                <el-button :icon="Edit" type="primary" @click="toEdit"></el-button>

                <el-popconfirm :title="`确定要删除用户:${user.name}`" width="200px" @confirm=removeUser>
                    <template #reference>
                        <el-button :icon="Delete" type="danger"></el-button>
                    </template>
                </el-popconfirm>
            </div>
            <div class="btn1" v-else>
                <el-button :icon="Edit" type="primary" @click="toEdit"></el-button>
            </div>
        </div>
        <div class="bottom">
            <p>证件类型:{{ user.param.certificatesTypeString }}</p>
            <p>证件号码:{{ user.certificatesNo }}</p>
            <p>用户性别:{{ user.sex == 0 ? "女生" : "男生" }}</p>
            <p>出生日期:{{ user.birthdate }}</p>
            <p>手机号码:{{ user.phone }}</p>
            <p>婚姻状况:{{ user.isMarry == 1 ? "已婚" : "未婚" }}</p>
            <p>当前住址:{{ user.param.cityString }}</p>
            <p>详细住址:{{ user.param.fullAddress }}</p>
            <!-- 已选择 背景 -->
            <Transition name="fade">
                <div v-if="index === curIndex" class="choose">
                    已选择
                </div>
            </Transition>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue"
import { Transition } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { reqRemoveUser } from "@/api/user";
let $route = useRoute()
let $router = useRouter()

let $props = defineProps(['user', 'index', 'curIndex'])
let $emit = defineEmits(['changeScene', 'removeUser'])
//编辑按钮回调
const toEdit = () => {
    //要么是就诊人跳转
    if ($route.path == '/user/patient') {
        $emit('changeScene', $props.user)
    } else {    //要么是预约挂号跳转
        //路由跳转 携带参数
        $router.push({ path: '/user/patient', query: { type: 'edit', id: $props.user.id } })

    }
}
//删除按钮确定回调
const removeUser = async () => {
    let res: any = await reqRemoveUser($props.user.id)
    //@ts-ignore
    ElMessage({
        type: 'success',
        message: '删除成功'
    })
    $emit('removeUser')
}
</script>
<style scoped>
.bottom {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 30px;
    margin: 30px 0;
    position: relative;
}

.top_11 {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 15px;
    height: 60px;
    background-color: #e5e5e5;
}

.yibao {
    background-color: white;
    padding: 2px 5px;
    font-size: 14px;
    border-radius: 8px;
    margin-right: 10px;
}

.name {
    color: #7f7f7f;
    font-size: 16px;
}

:deep(.el-button) {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.text {
    display: flex;
}

.btn {
    width: 80px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: start;
    align-items: center;
}

.btn1 {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: start;
    align-items: center;
}

.container {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
}

.choose {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    color: rgba(255, 0, 0, 0.473);
    font-size: 22px;
    font-weight: 700;
    border: 1px dashed red;
    text-align: center;
    line-height: 200px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(35deg);
    opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;

}
</style>
