<template>
  <div class="container">
    <div class="outer">
      <!-- 轮播图 -->
      <el-carousel :interval="3000" arrow="hover" height="425px">
        <el-carousel-item v-for="item in 6" :key="item">
          <div class="imge">
            <img :src="`src/assets/images/carousel/carousel${item}.jpg`" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>

    </div>

    <!-- 自动补全 -->
    <div class="source">
      <el-autocomplete clearable class="inline-input w-50" placeholder="请输入医院关键字" v-model="hosname"
        :fetch-suggestions="fetchData" :trigger-on-focus="false" @select="goDetail" />
      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
    <!-- 医院信息 -->
    <div class="hopital-info">
      <div class="left">
        <div class="left-top">
          <!-- 医院信息 -->
          <Level @getLF="getLeveFlage" @getRF="getRegionFlage"></Level>
        </div>
        <div class="left-bottom" v-if="hasHospitalArr.length > 0">
          <Card v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item">{{ item }}
          </Card>
        </div>
        <el-empty v-else description="没有符合的医院信息" />
        <!-- 分页器 -->
        <div class="page">
          <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 8, 4]"
            :background="false" layout="sizes, prev, pager, next, jumper,total" :total="total"
            @current-change="CurrentChange" @size-change="SizeChange" />
        </div>
      </div>
      <!-- 右侧提示 -->
      <div class="right">
        <Tip></Tip>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import Level from './Level.vue'
import Card from './Card.vue'
import Tip from './Tip.vue'
import { ref, onMounted } from 'vue'
import { reqHospital, reqHospitalInfo } from '@/api/home'
import type { Content, HospitalResponseData, HospitalInfo } from '@/api/home/type'
import { useRouter } from 'vue-router'
let $router = useRouter()
let hosname = ref<string>('')
//用户输入完或者聚焦是触发函数
const fetchData = async (keyword: string, cb: any) => {
  //keyword为用户输入，  cb函数更新数据
  let res: HospitalInfo = await reqHospitalInfo(keyword) //或者hosname
  //整理数据 变成组局需要的格式
  let showData = res.data.map(item => {
    return {
      value: item.hosname,  //医院名字
      hoscode: item.hoscode  // 医院id
    }
  })
  cb(showData)
}
//点击某个推荐选项触发
const goDetail = (item: any) => {
  // console.log(item); //把所选项注入进来
  $router.push({ path: '/hospital/register', query: { hoscode: item.hoscode } })
}


let pageNo = ref<number>(1)
//一页几条数据
let pageSize = ref<number>(10)
//存储已有的医院数据
let hasHospitalArr = ref<Content>([])
//存储医院总个数
let total = ref<number>(0)
//从子组件中获得存储医院等级和地区
let hostype = ref<string>('')
let districtCode = ref<string>('')
// 自定义事件
const getLeveFlage = (value: string) => {
  hostype.value = value
  getHospitalInfo()
}
const getRegionFlage = (value: string) => {
  districtCode.value = value
  getHospitalInfo()
}
//获取医院信息
const getHospitalInfo = async () => {
  let res: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
  // console.log('xxxx', res);
  if (res.code === 200) {
    hasHospitalArr.value = res.data.content
    // console.log('开始~~~', hasHospitalArr.value);
    if (hostype.value || districtCode.value) {
      total.value = res.data.contentLen
    } else {
      total.value = res.data.totalElements
    }

  }
}
onMounted(() => {
  getHospitalInfo()
})
//分页器页码发生变化
const CurrentChange = () => {
  getHospitalInfo()
}

//分页器下拉菜单发生变化
const SizeChange = () => {
  pageNo.value = 1
  getHospitalInfo()
}
</script>
<style scoped>
.hopital-info {
  height: 1000px;
  width: 100%;
  margin: 30px 0px;
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
}

.left {
  width: 75%;
  height: 80%;
  /* background-color: red; */
}

.page {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.left-top {
  width: 100%;
  /* height: 20%; */
  /* background-color: #2C7B7D; */
}

.left-bottom {
  /* padding-top: 20px; */
  /* height: 65%; */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 30px;
  align-content: start;
  /* background-color: pink; */
}

.left-bottom div {
  height: 100px;
  /* border: 1px solid rgb(163, 99, 99); */
}

.right {
  width: 22%;
  height: 80%;
  /* background-color: green; */
  /* border: 1px solid green; */
}

.container {
  width: 75%;
  margin: 0 auto;
  /* background-color: red; */
}

.source {
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  gap: 5px;
  align-items: center;
}

.outer {
  width: 100%;
  /* height: 425px; */
  margin: 0 auto;
}

.el-carousel--horizontal {
  height: 100% !important;
  border-radius: 20px;
}

:deep(.el-input__wrapper) {
  height: 50px;
  font-size: 18px;
  text-align: center;
}

:deep(.el-input__inner) {
  text-align: center
}

:deep(.el-button) {
  height: 50px;
  font-size: 16px;
}

.el-carousel__item {}

.el-carousel__item--card,
.el-carousel__item.is-animating {
  /* transition: none; */
  transition: transform 0.8s ease-in-out;
}

/* .el-carousel__item:nth-child(2n) { */

/* background-color: #99a9bf; */

/* }/* 

.el-carousel__item:nth-child(2n + 1) {
  /* background-color: #d3dce6; */
/* } */

img {
  width: 100%;
  height: 100%;
}

.imge {
  position: relative;
  width: 100%;
  height: 100%;
  /* border-radius: 45px; */
  /* background-color: blue; */
}

.imge::before {
  position: absolute;
  background: linear-gradient(90deg, #2C7B7D, #50AEB11A);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  content: '';
  border-radius: 20px;

}
</style>
