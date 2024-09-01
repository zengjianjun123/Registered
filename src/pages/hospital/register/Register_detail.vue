<template>
    <div class="container">
        <div class="info">
            <span>{{ workData.baseMap?.hosname || '人民医院' }}</span>
            <span>》</span>
            <span>{{ workData.baseMap?.bigname || '专科' }}</span>
            <span>》</span>
            <span>{{ workData.baseMap?.depname || '多发性硬化专科门诊' }}</span>
        </div>
        <div class="center">
            <h4>{{ workData.baseMap?.workDateString || '2024年7月' }}</h4>
            <div class="cards">
                <div class="card"
                    :class="{ active: item.status == -1 || item.availableNumber == -1, cur: item.workDate == workTime.workDate }"
                    v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="card_top"><span>{{ item.workDate || '123' }}-{{ item.dayOfWeek || '周一' }}</span></div>
                    <div class="card_bottom">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-if="item.status == 0">
                            {{
                                item.availableNumber == -1
                                    ? `约满了`
                                    : `有号(${item.availableNumber})`
                            }}
                        </div>
                        <div v-if="item.status == 1">即将放号</div>
                    </div>
                </div>
                <!-- <div class="card active">
                    <div class="card_top"><span>{{ '123' }}-{{ '周一' }}</span></div>
                    <div class="card_bottom">
                        <div>停止挂号</div>
                    </div>
                </div> -->
            </div>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" layout="prev, pager, next" :total="workData.total"
                @current-change="fetchWorkData" />
        </div>
        <!-- 展示医生结构 -->
        <div class="bottom">
            <!-- 即将放号 -->
            <div class="will" v-if="workTime.status == 1">
                <span>即将在&nbsp;&nbsp; <{{ workTime.workDate }}>&nbsp;&nbsp;放号</span>
            </div>
            <!-- 展示医生结构 -->
            <div class="doctor" v-else>
                <!-- 上午号源 -->
                <div class="morning-top">
                    <svg t="1721786841492" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6428" width="30" height="30">
                        <path
                            d="M512 320c164.949333 0 298.666667 133.717333 298.666667 298.666667 0 63.466667-19.797333 122.282667-53.546667 170.666666H853.333333a42.666667 42.666667 0 1 1 0 85.333334H170.666667a42.666667 42.666667 0 1 1 0-85.333334h96.192l-4.48-6.634666A297.28 297.28 0 0 1 213.333333 618.666667c0-164.949333 133.717333-298.666667 298.666667-298.666667z m0 85.333333c-117.824 0-213.333333 95.509333-213.333333 213.333334a213.013333 213.013333 0 0 0 85.333333 170.666666h256a213.013333 213.013333 0 0 0 85.333333-170.666666c0-117.824-95.509333-213.333333-213.333333-213.333334z m448 170.666667a42.666667 42.666667 0 1 1 0 85.333333h-85.333333a42.666667 42.666667 0 1 1 0-85.333333h85.333333zM149.333333 576a42.666667 42.666667 0 1 1 0 85.333333H64a42.666667 42.666667 0 1 1 0-85.333333h85.333333z m709.610667-304.277333a42.666667 42.666667 0 0 1 0 60.330666l-60.330667 60.330667a42.666667 42.666667 0 1 1-60.330666-60.330667l60.330666-60.330666a42.666667 42.666667 0 0 1 60.330667 0z m-633.557333 0l60.330666 60.330666a42.666667 42.666667 0 1 1-60.330666 60.330667l-60.330667-60.330667a42.666667 42.666667 0 0 1 60.330667-60.330666zM512 128a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333334 0V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                            fill="#409eff" p-id="6429"></path>
                    </svg>
                    <span class="t">上午号源</span>
                </div>
                <div class="morning" v-if="morningDoctor.length > 0" v-for="doc in morningDoctor" :key="doc.id">
                    <!-- 挂号信息 -->
                    <div class="morning-bottom">
                        <div class="morning-left">
                            <div class="job">
                                <span>{{ doc.title }}</span>
                                <span>|</span>
                                <span>{{ doc.docname }}</span>
                            </div>
                            <div>
                                <span>{{ doc.skill }}</span>
                            </div>
                        </div>
                        <div class="morning-right">
                            <div class="money">{{ doc.amount }}</div>
                            <el-button type="primary" @click="goRecord(doc)">剩余{{ doc.availableNumber }}个号</el-button>
                        </div>
                    </div>
                </div>
                <div class="no" v-else>
                    暂无号源
                </div>
                <!-- 下午的 -->
                <div class="afternoon-top">
                    <svg t="1721787070528" class="icon" viewBox="0 0 1025 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8696" width="30" height="30">
                        <path
                            d="M986.453333 186.026667H39.253333c-22.186667 0-39.253333 17.92-39.253333 39.253333C0 247.466667 17.92 264.533333 39.253333 264.533333h141.653334c8.533333 175.786667 154.453333 315.733333 331.946666 315.733334s323.413333-139.946667 331.946667-315.733334h141.653333c22.186667 0 39.253333-17.92 39.253334-39.253333s-17.92-39.253333-39.253334-39.253333zM512.853333 502.613333c-133.973333 0-244.053333-104.96-253.44-237.226666h506.026667c-8.533333 132.266667-118.613333 237.226667-252.586667 237.226666z m-5.12 122.026667c-22.186667 0-39.253333 17.92-39.253333 39.253333v135.68c0 22.186667 17.92 39.253333 39.253333 39.253334 22.186667 0 39.253333-17.92 39.253334-39.253334V664.746667c0.853333-22.186667-17.066667-40.106667-39.253334-40.106667z m348.16-110.08c-15.36-15.36-40.106667-15.36-55.466666 0s-15.36 40.106667 0 55.466667L896 665.6c7.68 7.68 17.92 11.946667 28.16 11.946667 10.24 0 20.48-4.266667 28.16-11.946667 15.36-15.36 15.36-40.106667 0-55.466667l-96.426667-95.573333z m-686.08 0L74.24 610.133333c-15.36 15.36-15.36 40.106667 0 55.466667 7.68 7.68 17.92 11.946667 28.16 11.946667s20.48-4.266667 28.16-11.946667l95.573333-95.573333c15.36-15.36 15.36-40.106667 0-55.466667-15.36-15.36-40.96-15.36-56.32 0z"
                            p-id="8697" fill="#409eff"></path>
                    </svg>
                    <span class="t">下午号源</span>
                </div>
                <div class="afternoon" v-if="afternoonDoctor.length > 0" v-for="doc in afternoonDoctor" :key="doc.id">
                    <div class="morning-bottom">
                        <div class="morning-left">
                            <div class="job">
                                <span>{{ doc.title }}</span>
                                <span>|</span>
                                <span>{{ doc.docname }}</span>
                            </div>
                            <div>
                                <span>{{ doc.skill }}</span>
                            </div>
                        </div>
                        <div class="morning-right">
                            <div class="money">{{ doc.amount }}</div>
                            <el-button type="primary" @click="goRecord(doc)">剩余{{ doc.availableNumber }}个号</el-button>
                        </div>
                    </div>
                </div>
                <div class="no" v-else>
                    暂无号源
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { reqHospitalWork, reqHospitalDoctor } from '@/api/hospital'
import { useRoute, useRouter } from 'vue-router';
import type { HospitalWorkDataResponse, DoctorResponse, DocArr, Doctor } from "@/api/hospital/type"

let $router = useRouter()
let $route = useRoute()
//分页器当前页码
let pageNo = ref<number>(1)
//每页展示几个数据
let limit = ref<number>(6)
//存储挂号数据
let workData = ref<any>({})
// 存储排班日期，当前第一个
let workTime = ref<any>({})
//存储排版医生的数据
let doctorArr = ref<DocArr>([])


//点击卡片改变那一天日期的医生情况
const changeTime = (item: any) => {
    workTime.value = item
    getDoctorWorkData()
}

//获取挂号的数据
const fetchWorkData = async () => {
    //服务器会判断用户有没有登陆
    let res: HospitalWorkDataResponse = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string)
    if (res.code === 200) {
        workData.value = res.data
    }
    //页面一挂载 就拿到数组workData里面第一个数据，展示当天的医生排班情况
    workTime.value = workData.value.bookingScheduleList[0]
}
//获取某天医生排班情况
const getDoctorWorkData = async () => {
    let date: string = workTime.value.workDate

    let res: DoctorResponse = await reqHospitalDoctor($route.query.hoscode as string, $route.query.depcode as string, date)
    if (res.code === 200) {
        doctorArr.value = res.data;
    }
}

onMounted(async () => {
    await fetchWorkData()
    //获取医生数据
    await getDoctorWorkData()
})
let morningDoctor = ref<any>([])
let afternoonDoctor = ref<any>([])
watch(doctorArr, (newValue) => {
    morningDoctor.value = newValue.filter((item) => item.workTime === 0)
    afternoonDoctor.value = newValue.filter((item) => item.workTime === 1)
}, {
    // 深度观察，确保数组内部变化也能触发 watch
    deep: true,
    immediate: true
})

//将医生数据进行上下午过滤
// let morningDoctor = computed(() => {
//     return doctorArr.value.filter((item: Doctor) => {
//         return item.workTime == 0
//     })
// })
// let afternoonDoctor = computed(() => {
//     return doctorArr.value.filter((item: Doctor) => {
//         return item.workTime == 1
//     })
// })

//跳转到就诊信息
const goRecord = (doctor: Doctor) => {
    // console.log(doctor);
    //跳到就诊信息页面并携带所选医生的id
    $router.push({ path: '/hospital/register_record', query: { docId: doctor.id } })

}
</script>

<style scoped>
.no {
    width: 80%;
    margin: 50px auto;
    text-align: center;
    font-size: 26px;
}

.money {
    font-weight: 800;
}

.morning-right {
    width: 250px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 80px;
}

.morning-bottom {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
    border-bottom: 1px solid #7f7f7f65;
    padding-bottom: 5px;
}

.job {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    color: #409eff;
    margin: 15px 0;
    font-size: 20px;
}

.t {
    color: #40a0ffbb;
    font-size: 22px;
}

.morning-top {
    display: flex;
    align-items: center;
    gap: 10px;

}

.afternoon-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.bottom {
    margin-top: 50px;
}

.will {
    text-align: center;
    font-size: 30px;
    font-weight: 800;
}

.active.card {
    border: 1px solid #ccc;
    color: #7f7f7f;
}

.cur.card {
    /* border: 2px solid #5588ca; */
    transform: scale(1.1);
    transition: all 0.5s;
}

.active .card_top {
    background-color: #ccc;
}

.cards {
    width: 80%;
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    gap: 30px;
    justify-content: space-around;

}

.card {
    flex: 1;
    height: 80px;
    border: 1px solid #5588ca;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card_top {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e8f2ff;
}

.card_bottom {
    height: 60%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    margin-left: 30px;
}

.info {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 40px;

}

.center {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
}
</style>
