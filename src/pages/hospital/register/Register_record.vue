<template>
    <div class="container">
        <h3>确认挂号信息</h3>
        <!-- 展示就诊人信息的 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人：</span>
                    <el-button :icon="User" type="primary" size='default' @click="goAddUser">添加就诊人</el-button>
                </div>
            </template>
            <!-- 展示就诊人详细信息 -->
            <div class="users">
                <UserInfo v-for="(user, index) in userArr" :key="user.id" class="user" :user="user" :index="index"
                    :curIndex="currentIndex" @click="changeIndex(index)" />
            </div>
        </el-card>
        <!-- 展示就诊医生信息的 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 展示就诊人详细信息 -->
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊日期：
                        </div>
                    </template>
                    {{ doctorInfo.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊医院:
                        </div>
                    </template>
                    {{ doctorInfo.param?.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            就诊科室：
                        </div>
                    </template>
                    {{ doctorInfo.param?.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生姓名：
                        </div>
                    </template>
                    {{ doctorInfo.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生职称：
                        </div>
                    </template>
                    {{ doctorInfo.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生专长：
                        </div>
                    </template>
                    {{ doctorInfo.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            医生服务费用：
                        </div>
                    </template>
                    <span style="color: red;">{{ doctorInfo.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确认挂号 -->
        <div class="button">
            <el-button type="primary" size="large" :disabled="currentIndex == -1" @click="toOrder()">确认挂号</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { User } from "@element-plus/icons-vue"
// 就诊人组件
import UserInfo from "@/pages/hospital/register/UserInfo.vue"
import { reqGetUser, reqGetDoctor } from "@/api/hospital"
import { onMounted, ref } from "vue";
import type { UserResponse, UserArr, DoctorInfoResponse, Doctor } from "@/api/hospital/type"
import { useRoute, useRouter } from "vue-router";
import { reqSubmitOrder } from "@/api/user";
import type { SubmitOrder } from "@/api/user/type"
import { ElMessage } from "element-plus";

let $router = useRouter()
let $route = useRoute()
//存储就诊人信息
let userArr = ref<UserArr>([])
//存储所挂号医生信息
let doctorInfo = ref<any>({})
//用户点击确定的就诊人的索引值
let currentIndex = ref<number>(-1)  //刚开  谁也不选

onMounted(() => {
    //组件挂载完毕，根据用户获取相应的就诊人
    fetchUserData()
    // 获取所挂号医生信息
    fetchDoctorData()

})
//跳转到添加就诊人页面
const goAddUser = () => {
    //路由跳转
    $router.push({ path: '/user/patient', query: { type: 'add' } })
}
//获取就诊人信息
const fetchUserData = async () => {
    let res: UserResponse = await reqGetUser()
    if (res.code == 200) {
        userArr.value = res.data
    }
}
//获取所挂医生信息
const fetchDoctorData = async () => {
    let res: DoctorInfoResponse = await reqGetDoctor($route.query.docId as string)
    if (res.code == 200) {
        doctorInfo.value = res.data
    }
}
//点击确定就诊人
const changeIndex = (index: number) => {
    //存储用户选中的就诊人
    currentIndex.value = index
}

//确认挂号挂号
const toOrder = async () => {
    let hoscode = doctorInfo.value.hoscode //医院的编号
    let scheduleId = doctorInfo.value.id  //医生的id
    let patientId = userArr.value[currentIndex.value].id  //所选就诊人id
    let res: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId) //返回一个订单号
    if (res.code == 200) {
        let id: any = res.data
        $router.push({ path: '/user/order', query: { orderId: id } })
    } else {
        ElMessage({
            type: 'error',
            message: res.message
        })
    }
}

</script>
<style scoped>
.button {
    display: flex;
    justify-content: center;
    margin: 20px 0px;
}

.users {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

}

.user {
    width: 30%;
    margin: 10px 0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container {
    margin-left: 30px;
    margin-top: 20px;
}

.box-card {
    margin: 20px auto;
    width: 90%;
}
</style>
