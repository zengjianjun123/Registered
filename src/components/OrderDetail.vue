<template>
    <div class="outer">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>挂号详情</span>
                </div>
            </template>
            <!-- 上面 -->
            <div class="top">
                <el-tag :type="orderInfo.orderStatus == -1 ? 'warning' : 'success'">
                    <svg v-if="orderInfo.orderStatus == -1" t="1721894985125" class="icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8142" width="20" height="20">
                        <path
                            d="M464 576a48 48 0 0 0 96 0V256a48 48 0 0 0-96 0v320zM512 682.688a64 64 0 1 0 0 128h0.384a64 64 0 1 0 0-128H512z"
                            fill="#ffffff" p-id="8143"></path>
                    </svg>
                    <svg v-else t="1721882677778" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="7153" width="20" height="20">
                        <path
                            d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                            fill="#fff" p-id="7154"></path>
                    </svg>
                    <span>{{ orderInfo.param?.orderStatusString }}</span>
                </el-tag>
                <!-- 二维码图片 -->
                <div class="top-right">
                    <img src="../assets/images/code_app.png" alt="">
                    <div class="text">
                        <span>微信 关注公众号 "JuJuBao"</span>
                        <span>"快速预约挂号"</span>
                    </div>
                </div>
            </div>
            <!-- 下面 -->
            <div class="bottom">
                <div class="bot-left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊人信息
                                </div>
                            </template>
                            {{ orderInfo.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊日期
                                </div>
                            </template>
                            {{ orderInfo.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊医院
                                </div>
                            </template>
                            {{ orderInfo.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊科室
                                </div>
                            </template>
                            {{ orderInfo.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    医生职称
                                </div>
                            </template>
                            {{ orderInfo.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    服务费
                                </div>
                            </template>
                            <span style="color: red;">{{ orderInfo.amount }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    挂号单号
                                </div>
                            </template>
                            {{ orderInfo.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    挂号时间
                                </div>
                            </template>
                            {{ orderInfo.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="bot-right">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>注意事项</span>
                            </div>
                        </template>
                        <div class="attention">
                            <p>
                                1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
                            </p>
                            <p style="color: red">
                                2.【取号】就诊当天需在 <{{ orderInfo.fetchTime }}> 在医院{{ orderInfo.fetchAddress
                                    }}取号，未取号视为爽约，该号不退不换； </p>
                            <p>
                                3.【退号】在 <{{ orderInfo.quitTime }}> 可在线退号
                                    ，逾期将不可办理退号退费；
                            </p>
                            <p>
                                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                            </p>
                            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                        </div>
                    </el-card>
                </div>
            </div>


            <template #footer>
                <!-- 按钮 -->
                <div class="btn" v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1">
                    <el-popconfirm title="确定取消本次预约?" width="300px"" @confirm="cancelOrder">
                        <template #reference>
                            <el-button size="large">取消预约</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button type="primary" size="large" v-if="orderInfo.orderStatus == 0"
                        @click="pay">继续支付</el-button>
                </div>
            </template>
        </el-card>

        <!-- 支付二维码   dialog要通过v-model来显示和隐藏-->
        <el-dialog v-model="dialogVisible" title="微信支付" width="500" @close="close">
            <div class="pay_t">
                <img class="pay_img" :src="imgUrl" alt="">
                <p class="p_t">请使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <template #footer>
                <el-button type="primary" @click="closePay">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { reqOrderInfo, reqCancelOreder, reqGetQrcode, reqPayResult } from "@/api/user"
import type { OrderResponse, QrCode, PayReslt } from "@/api/user/type"
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
//引入qrcode插件  生成二维码地址
//@ts-ignore
import QRCode from 'qrcode'

let $route = useRoute()
//存储订单信息
let orderInfo = ref<any>({})
//微信支付码的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 存储QRcode转换的二维码图片
let imgUrl = ref<string>('')
//存储一个定时器的引用 
let timer = ref<any>()

//获得订单详情信息
const getOrderInfo = async () => {
    let res: OrderResponse = await reqOrderInfo($route.query.orderId as string)
    if (res.code == 200) {
        orderInfo.value = res.data
    }
}
// 取消订单
const cancelOrder = async () => {
    let res: any = await reqCancelOreder($route.query.orderId as string)  //取消订单为-1  未支付为0  支付成功为1
    if (res.code == 200) {
        //如果订单删除成功   在获取一次订单详情
        getOrderInfo()
    } else {
        ElMessage({
            type: 'error',
            message: '取消预约失败'
        })
    }
}
onMounted(() => {
    getOrderInfo()
})

//点击继续支付
const pay = async () => {
    dialogVisible.value = true
    //得到支付二维码信息
    let res: QrCode = await reqGetQrcode($route.query.orderId as string)  //
    //需要下载 qrcode包 将res.data的地址数据转换成二维码
    let imgUrlRes = await QRCode.toDataURL(res.data.codeUrl)
    imgUrl.value = imgUrlRes
    // 开启长轮询  询问服务器，是否支付成功
    timer.value = setInterval(async () => {
        let res: PayReslt = await reqPayResult($route.query.orderId as string)
        if (res.data) {  //代表支付成功
            //关闭对话框
            dialogVisible.value = false
            ElMessage({
                type: 'success',
                message: '支付成功'
            })
            //清楚定时器
            clearInterval(timer.value)
            //再次获取订单详情  更新
            getOrderInfo()
        }
    }, 2000)
}
// 关闭支付页面
const closePay = () => {
    dialogVisible.value = false
    //清除定时器
    clearInterval(timer.value)
}
// 支付框   x号的回调
const close = () => {
    clearInterval(timer.value)
}
</script>
<style scoped>
.p_t {
    margin-bottom: 5px;
}

.pay_t {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    margin: 10px 0;
}

.pay_img {
    width: 250px;
    height: 250px;
}

.attention {
    font-size: 18px;
    padding: 20px 40px;
}

.attention>p {
    line-height: 40px;
}

.btn {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.cell-item {
    font-size: 18px;
    text-align: center;
    font-weight: 600;
}

.bottom {
    display: flex;
    padding: 0 30px;
    gap: 50px;
    margin-bottom: 20px;
    align-items: center;
}

.bot-left {
    flex: 3;
}

.bot-right {
    flex: 6.5;
}

.text {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.top-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

img {
    width: 50px;
    height: 50px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    margin-bottom: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e4e7ed;
    padding-bottom: 20px;
}

.outer {
    width: 85%;
    margin: 0 auto;
}

.card-header {
    font-size: 20px;
    font-weight: 600;
}

:deep(.el-tag) {
    /* background-color: rgb(40, 170, 40); */
    padding: 15px 15px;
    margin-left: 10px;

}

:deep(.el-tag--success) {
    background-color: rgba(40, 170, 40, 0.753);
}

:deep(.el-tag--warning) {
    background-color: #e6a23c;
}

:deep(.el-tag__content) {
    display: flex;
    align-items: center;
    color: white;
    font-size: 16px;
    gap: 10px;
}

:deep(.el-card__body) {
    padding: 0;
}

:deep(.el-dialog__body) {
    border-top: 1px solid #7f7f7f65;
    border-bottom: 1px solid #7f7f7f65;
}

:deep(.el-dialog) {
    padding-left: 0px;
    padding-right: 0px;
}

:deep(.el-dialog__title) {
    padding-left: 16px;
}

:deep(.el-dialog__footer) {
    padding-right: 16px;
}
</style>
