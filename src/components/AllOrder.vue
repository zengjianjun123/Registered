<template>
    <div class="container">
        <!-- 展示全部订单 -->
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>挂号订单</span>
                </div>
            </template>
            <!-- 用户选择的下拉菜单 -->
            <el-form :inline="true">
                <el-form-item label="就诊人">
                    <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser">
                        <el-option label="请选择所有患者" value="" />
                        <el-option v-for="item in allUser" :key="item.id" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="changeStatues">
                        <el-option label="全部订单" value=""></el-option>
                        <el-option v-for="(item, index) in allOrderState" :key="index" :label="item.comment"
                            :value="item.status"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-table border style="margin: 10px 0px" :data="allOrderArr">
                <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
                <el-table-column label="医院" prop="hosname"></el-table-column>
                <el-table-column label="科室" prop="depname"></el-table-column>
                <el-table-column label="医生" prop="title"></el-table-column>
                <el-table-column label="服务费" prop="amount"></el-table-column>
                <el-table-column label="就诊人" prop="patientName"></el-table-column>
                <el-table-column label="订单状态" prop="param.orderStatusString"></el-table-column>
                <el-table-column label="操作">
                    <template #="row">
                        <el-button type="success" round @click="goDetail(row)">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total"
                @current-change="getOrderInfo" @size-change="changeSize" />

        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqUserOrderInfo, reqAllUser, reqOrderState } from "@/api/user"
import type { UserOrderInfoResponseData, Records, AllUser, AllUserResponseData, AllOrderState, AllOrderStateResponseData } from "@/api/user/type"
import { useRouter } from 'vue-router';

let $router = useRouter()
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
//就诊人id
let patientId = ref<string>('')
//订单状态
let orderStatus = ref<string>('')
//存储全部订单
let allOrderArr = ref<Records>([])
//订单个数
let total = ref<number>(0)
//存储所有的就诊人
let allUser = ref<AllUser>([])
//存储所有的订单状态
let allOrderState = ref<AllOrderState>([])
//点击详情 跳转到订单详情页
const goDetail = (item: any) => {
    // console.log(item.row);
    $router.push({ path: '/user/order', query: { orderId: item.row.id } })

}
onMounted(() => {
    getOrderInfo()
    getUserAndState()
})
//获取订单方法
const getOrderInfo = async () => {
    let res: UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value, pageSize.value, patientId.value, orderStatus.value)
    if (res.code == 200) {
        allOrderArr.value = res.data.records
        total.value = res.data.total
    }
}
//获取所有的就诊人信息 以及  所有订单的状态
const getUserAndState = async () => {
    //获取就诊人信息
    let res1: AllUserResponseData = await reqAllUser()
    //获取订单状态信息
    let res2: AllOrderStateResponseData = await reqOrderState()
    allUser.value = res1.data
    allOrderState.value = res2.data
}

//分页size发生变化
const changeSize = () => {
    getOrderInfo()
}

// 更改就诊人
const changeUser = () => {
    getOrderInfo()
}
//更改状态
const changeStatues = () => {
    getOrderInfo()
}
</script>
<style scoped>
.container {
    width: 90%;
    margin: 0 auto;
}

:deep(.el-select__selection) {
    width: 200px;
}
</style>
