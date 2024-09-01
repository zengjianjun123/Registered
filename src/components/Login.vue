<template>
    <div class="">
        <el-dialog v-model="userStore.visiable" title=" 登录界面" @close="closeDialog">
            <div class="content">
                <div class="left">
                    <!-- 左边二选一 -->
                    <div v-show="scene === 0">
                        <div class="left-inner">
                            <el-form :model="loginParm" :rules="rule" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" :prefix-icon="User"
                                        v-model="loginParm.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock"
                                        v-model="loginParm.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="info" plain :disabled="!isPhone || flag" @click="getCode">
                                        <span v-if="flag">验证码有效({{ time }}s)</span>
                                        <span v-else>获取验证码</span>
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <div class="left-bottom">
                                <el-button type="primary" style="width: 90%"
                                    :disabled="!isPhone || Code !== loginParm.code" @click="toLogin">用户登录</el-button>
                                <!-- 点击切换左边场景 -->
                                <div class="wx-section" @click="changeScene">
                                    <p class="wx">微信扫码登录</p>
                                    <svg t="1721553977929" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4239" width="30" height="30">
                                        <path
                                            d="M595.77552 510.579651c-14.478759 0-29.04143 14.562671-29.04143 29.016871 0 14.6957 14.560624 29.068036 29.04143 29.068036 21.951965 0 36.3243-14.372336 36.3243-29.068036C632.09982 525.143345 617.727485 510.579651 595.77552 510.579651z"
                                            fill="#0DD116" p-id="4240"></path>
                                        <path
                                            d="M755.467569 510.579651c-14.369266 0-28.851095 14.562671-28.851095 29.016871 0 14.6957 14.481829 29.068036 28.851095 29.068036 21.76163 0 36.322254-14.372336 36.322254-29.068036C791.789823 525.143345 777.229199 510.579651 755.467569 510.579651z"
                                            fill="#0DD116" p-id="4241"></path>
                                        <path
                                            d="M298.153052 300.001655c-21.734 0-43.714617 14.344706-43.714617 36.214806 0 21.762653 21.980617 36.322254 43.714617 36.322254 21.760606 0 36.213783-14.559601 36.213783-36.322254C334.366835 314.346361 319.912635 300.001655 298.153052 300.001655z"
                                            fill="#0DD116" p-id="4242"></path>
                                        <path
                                            d="M501.367337 372.539738c21.844517 0 36.325323-14.560624 36.325323-36.322254 0-21.8701-14.480806-36.213783-36.325323-36.213783-21.760606 0-43.630706 14.343683-43.630706 36.213783C457.736631 357.979114 479.606731 372.539738 501.367337 372.539738z"
                                            fill="#0DD116" p-id="4243"></path>
                                        <path
                                            d="M512.330016 1.7519c-280.878109 0-508.827751 227.839125-508.827751 508.827751 0 280.987602 227.949642 508.827751 508.827751 508.827751 280.908808 0 508.74691-227.840148 508.74691-508.827751C1021.076926 229.591025 793.237801 1.7519 512.330016 1.7519zM392.479371 670.464081c-36.241412 0-65.36573-7.392364-101.69003-14.560624l-101.498672 50.91153 29.015847-87.372953C145.658939 568.666604 102.13568 503.164774 102.13568 423.454338c0-138.149407 130.73146-246.928902 290.342668-246.928902 142.730749 0 267.790022 86.880743 292.931632 203.870224-9.217942-1.037632-18.543332-1.691525-27.948539-1.691525-137.932466 0-246.819408 102.916974-246.819408 229.77829 0 21.078061 3.27151 41.421388 8.943696 60.8376C410.61338 670.028153 401.586796 670.464081 392.479371 670.464081zM820.726875 772.153088l21.869077 72.591295-79.627549-43.630706c-29.0445 7.2798-58.221006 14.560624-87.12736 14.560624-138.148383 0-246.927879-94.40716-246.927879-210.683397 0-116.089995 108.779496-210.689536 246.927879-210.689536 130.405025 0 246.600421 94.598518 246.600421 210.689536C922.441465 670.464081 879.028723 728.4661 820.726875 772.153088z"
                                            fill="#0DD116" p-id="4244"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 第二个微信扫码结构 -->
                    <div v-show="scene === 1" class="wechat">
                        <!-- 将来这这个容器中展示二维码界面 -->
                        <div class="login_container">

                        </div>
                        <!-- 点击跳转回手机号登录 -->
                        <div class="to-phone" @click="toPhone">
                            <p>手机短信验证登录</p>
                            <svg t="1721641665763" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6414" width="30" height="30">
                                <path
                                    d="M736 64H288a71.76 71.76 0 0 0-71.68 71.68v752.64A71.76 71.76 0 0 0 288 960h448a71.76 71.76 0 0 0 71.68-71.68V135.68A71.76 71.76 0 0 0 736 64zM512 879.36a35.84 35.84 0 1 1 35.84-35.84A35.84 35.84 0 0 1 512 879.36z m233-116.48H279V189.44h466z"
                                    fill="#d4237a" p-id="6415"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="right-top">
                        <div class="ma-l">
                            <img src="../assets/images/code_login_wechat.png" alt="">
                            <svg t="1721554515661" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="7880" width="20" height="20">
                                <path
                                    d="M656 257q-67 0-122.5 30t-88 82Q413 421 413 483q0 31 9 60-14 1-27 1-20 0-42-3-14-2-41-8l-17-3-100 50 28-86q-55-39-84-86-30-50-30-108 0-66 39-123 38-55 103.5-87.5T395 57q69 0 131 26.5t103.5 72Q671 201 683 258q-12-1-27-1z m-154-78q-17 0-30 10t-13 25.5q0 15.5 13 25.5t29.5 10q16.5 0 26.5-9.5t10-25.5q0-16-10-26t-26-10z m-200 71q16 0 26-9.5t10-25.5q0-16-10-26t-26.5-10q-16.5 0-29.5 10t-13 25.5q0 15.5 13 25.5t30 10z m615 229q0 46-29 91-25 40-71 74l21 71-78-43-6 2q-27 6-40 9-23 4-40 4-67 0-122.5-28t-88-75.5Q431 536 431 479.5t32.5-104q32.5-47.5 88-75.5T674 272q63 0 119 28t89 75q35 49 35 104z m-322-36q16 0 26-8.5t10-19.5q0-11-10-20t-26-9q-11 0-19.5 9t-8.5 20q0 11 8.5 19.5T595 443z m157 0q16 0 26-8.5t10-19.5q0-11-10-20t-26-9q-10 0-19 9t-9 20q0 11 9 19.5t19 8.5z"
                                    fill="#666666" p-id="7881"></path>
                            </svg>
                            <p>微信扫一扫关注</p>
                            <p>"快速预约挂号"</p>
                        </div>
                        <div class="ma-r">
                            <img src="../assets/images/code_app.png" alt="">
                            <svg t="1721554649136" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="8929" width="20" height="20">
                                <path
                                    d="M736.653061 929.959184H287.346939c-45.97551 0-83.591837-37.616327-83.591837-83.591837V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h449.306122c45.97551 0 83.591837 37.616327 83.591837 83.591837v668.734694c0 45.97551-37.616327 83.591837-83.591837 83.591837zM287.346939 135.836735c-22.987755 0-41.795918 18.808163-41.795919 41.795918v668.734694c0 22.987755 18.808163 41.795918 41.795919 41.795918h449.306122c22.987755 0 41.795918-18.808163 41.795919-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795919-41.795918H287.346939z"
                                    fill="#333333" p-id="8930"></path>
                                <path
                                    d="M616.489796 815.020408H407.510204c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h208.979592c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959z"
                                    fill="#333333" p-id="8931"></path>
                            </svg>
                            <p>扫一扫下载</p>
                            <p>"预约挂号"APP</p>
                        </div>
                    </div>

                    <p class="ttt"> 快速挂号 安全放心</p>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="closeDialog2">
                        取消
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user';
import { ref, reactive, computed, watch } from 'vue';
import { reqIphoneCode } from '@/api/hospital'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { reqWxLogin } from '@/api/hospital'
import type { WXLoginResponse } from '@/api/hospital/type'
import { useRoute, useRouter } from 'vue-router';

let $router = useRouter()
let $route = useRoute()

//引入仓库数据  来控制登录显示与隐藏
const userStore = useUserStore()

//控制左边进行切换  0表示手机号码   1表示微信扫码登录
let scene = ref<number>(0);
const changeScene = async () => {
    scene.value = 1
    //项尚硅谷服务器 获取微信扫码需要的参数
    let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin') //重定向地址
    let res: WXLoginResponse = await reqWxLogin(redirect_URL)
    //生成微信扫码的二维码界面
    //@ts-ignore
    new WxLogin({   //向微信服务器发送请求，返回一个二维码界面
        self_redirect: true,
        id: "login_container",
        appid: res.data.appid,
        scope: "snsapi_login",
        redirect_uri: res.data.redirectUri,//重定向到wxlogin.idnex.vue组件(在iframe里面)
        state: res.data.state,
        style: "black",
        href: ""
    });
    // new WxLogin({   //向微信服务器发送请求，返回一个二维码界面
    //     self_redirect: true,
    //     id: "login_container",
    //     appid: "wx14659ebc7aa061f6",
    //     scope: "snsapi_login",
    //     redirect_uri: 'http%3A%2F%2Flocalhost%3A5173%2Fwxlogin',//重定向到wxlogin.idnex.vue组件(在iframe里面)
    //     state: "syt-null",
    //     style: "black",
    //     href: ""
    // });

    //之后服务器会将用户信息以query的形式重定向到 wxlogin.idnex.vue组件
}

//手机验证码
let Code = ref<string>('')
let loginParm = reactive({
    phone: '',
    code: ''
})
//计算属性来计算当前手机号码是否为正规的
let isPhone = computed(() => {
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
    return reg.test(loginParm.phone)
})

//获得手机验证码
const getCode = async () => {
    //开启倒计时
    flag.value = true
    let res: any = await reqIphoneCode(loginParm.phone)
    if (res.code === 200) {
        // let res = {
        //     data: '6699'
        // }
        let appcode = '481342585e81415ba880bd45483305bd'
        axios.post('https://cdcxdxjk.market.alicloudapi.com/chuangxin/dxjk', {}, {
            headers: {
                'Authorization': "APPCODE " + appcode
            },
            params: {
                'content': "【创信】您的验证码是：" + res.data,
                'mobile': loginParm.phone
            }
        }).then(res => {
            console.log('验证码是~~~', res.config.params.content.slice(11));
            Code.value = res.config.params.content.slice(11);

        })
    }
}

//控制按钮内容与倒计时切换  flag为真  开启倒计时    flag为false 获取验证码
let flag = ref<boolean>(false)
//倒计时
let time = ref<number>(5)
//监听flag按钮发生变化就开启一个计时器
watch(flag, (newValue, oldValue) => {
    if (newValue === true) {
        let timer = setInterval(() => {
            time.value--;
            if (time.value == 0) {
                clearInterval(timer)
                flag.value = false
                time.value = 5
            }
        }, 1000)
    }
})

//登录
const toLogin = () => {
    //返回一个登录是否成功的promise
    userStore.userLogin(loginParm).then(res => {
        //登陆成功，关闭登录框
        userStore.visiable = false;
        //获取url上的query参数
        let redirect = $route.query.redirect
        if (redirect) {
            $router.push(redirect as string)
        } else {
            $router.push('/home')
        }
    }, error => {
        ElMessage({
            type: 'error',
            message: error.message
        })
    })
}

//表单校验规则
//自定义判断规则
const validatePhone = (rule: any, value: any, cb: any) => {
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
    if (reg.test(value)) {
        cb()
    } else {
        cb(new Error('请输入正确格式手机号'))
    }
}
const validateCode = (rule: any, value: any, cb: any) => {
    const reg = /^\d{6}$/
    if (reg.test(value)) {
        cb()
    } else {
        cb(new Error('请输入正确的验证码'))
    }
}
const rule = {
    //  这种一般不用，只是简单判断位数
    // phone: [{ required: true, message: '手机号码格式不正确', trigger: 'change', min: 11 }],
    // code: [{ required: true, message: '验证码务必4位', trigger: 'change', min: 4 }]
    phone: [{ validator: validatePhone, trigger: 'change' }],
    code: [{ validator: validateCode, trigger: 'change' }]
}

//获取表单组件
let form = ref<any>()
// console.log('fffform', form);

//关闭登录界面 x号
const closeDialog = () => {
    //清空表单数据
    loginParm.phone = ''
    loginParm.code = ''
    //校验规则清空
    form.value.resetFields()
    $router.push('/home')

}
const closeDialog2 = () => {
    //关闭界面
    userStore.visiable = false
    //清空表单数据
    closeDialog()
}

//回到短信验证界面
const toPhone = () => {
    scene.value = 0
}

//场景监听，针对微信扫码登录后重定向query数据持久化存储后 存到仓库里面
watch(scene, (newValue) => {
    if (newValue === 1) {  //说明是微信扫码
        userStore.queryState()
    }
})
</script>
<script lang="ts">
export default {
    name: 'Login'
}
</script>
<style scoped>
.wechat {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.to-phone {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wx-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.ttt {
    font-size: 20px;
    text-align: center;
    color: black;
    font-weight: 700;
}

.right-top {
    display: flex;
    margin: 30px 0;
    justify-content: space-around;
}

.ma-l {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ma-r {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    width: 120px;
    height: 120px;
}

.content {
    display: flex;
    margin: 0 30px;
    gap: 20px;
}

.left {
    flex: 1;
}

.left-inner {
    border: 1px solid #ccc;
    margin: 30px 0;
    padding: 20px
}

.left-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px
}

.wx {
    margin-bottom: -10px;
}

.right {
    flex: 1;
}

:deep(.el-dialog__header) {
    text-align: center;
}

:deep(.el-dialog) {
    padding: 16px 0;
    width: 800px;
}

:deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc
}

:deep(.dialog-footer) {
    padding-right: 30px;
}
</style>
