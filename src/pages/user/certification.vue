<!-- 实名认证 -->
<template>
    <!-- 实名认证结构 -->
    <el-card class="box-card">
        <!-- 卡片的头部 -->
        <template #header>
            <div class="card-header">
                <h1>实名信息</h1>
            </div>
        </template>
        <!-- 实名认证结构的提示部分 -->
        <div class="tip" style="color: #7f7f7f">
            <p>
                <el-icon>
                    <InfoFilled />
                </el-icon>
                完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
            </p>
        </div>
        <!-- 卡片身体的底部：认证成功的结构、认证未成功的结构 -->
        <el-descriptions v-if="userInfo.authStatus == 1" class="margin-top" :column="1" border style="margin: 20px auto"
            size="small">
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">用户姓名</div>
                </template>
                {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">证件类型</div>
                </template>
                {{ userInfo.certificatesType == "10" ? "身份证" : "户口本" }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" :width="20">
                <template #label>
                    <div class="cell-item">证件号码</div>
                </template>
                {{ userInfo.certificatesNo }}
            </el-descriptions-item>
        </el-descriptions>
        <!-- 用户未认证的结构 -->
        <!-- :model="params"  收集表单校验的数据 -->
        <!-- props="name"  校验的字段 -->
        <!--  :rule="rules" 表单校验规则 -->
        <el-form v-else style="width: 60%; margin: 20px auto" label-width="80" :model="params" :rules="rules"
            ref="form">
            <el-form-item label="用户姓名" prop="name">
                <el-input placeholder="请输入用户的姓名" v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
                <el-select placeholder="请选择证件类型" style="width: 100%" v-model="params.certificatesType">
                    <el-option :label="item.name" :value="item.value" v-for="(item, index) in arrType"
                        :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="certificatesNo">
                <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
            </el-form-item>
            <el-form-item label="上传证件" prop="certificatesUrl">
                <!-- action:upload组件像服务器提交图片路径
                    limit：照片墙约束的图片个数
                    on-exceed:超出约束的钩子
                    on-success：图片上传成功的钩子
                    -->
                <el-upload ref="upload" list-type="picture-card" action="/api/oss/file/fileUpload?fileHost=userAuah"
                    :limit="1" :on-exceed="exceedhandler" :on-success="successhandler"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <img src="../../assets/images/auth_example.png" alt="" style="width: 100%; height: 80%" />
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full v-if="params.certificatesUrl" :src="params.certificatesUrl" alt="Preview Image"
                        style="width: 100%; height: 100%" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit"> 提交</el-button>
                <el-button @click="reset"> 重写</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
import type {
    UseringoResponseData,
    CertationArr,
    CertationTypeResponseData,
    UserParams,
} from "@/api/user/type";

// 获取用户信息
import { reqgetUserInfo, reqCertainType, reqUserCertation } from "@/api/user";
import { ElMessage } from "element-plus";

// 获取form组件
let form = ref();
let upload = ref();

// 存储用户信息
let userInfo: any = ref<any>({});
let arrType = ref<CertationArr>([]);

// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);

// 收集用户表单认证的数据
let params = reactive<UserParams>({
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
});
// 组件挂载完毕
onMounted(() => {
    // 获取用户信息的方法
    getUserInfo();

    // 获取证件类型的方法
    gettype();

    // 用户认证
});


// 获取用户信息的方法
const getUserInfo = async () => {
    let result: UseringoResponseData = await reqgetUserInfo();
    // console.log(result);
    if (result.code == 200) {
        userInfo.value = result.data;
    }
};

// 获取证件类型的方法
const gettype = async () => {
    let result: CertationTypeResponseData = await reqCertainType();
    // console.log(result);
    if (result.code == 200) {
        arrType.value = result.data;
    }
};

// 超出图片上传数量的钩子
const exceedhandler = () => {
    ElMessage({
        type: "error",
        message: "图片只能上传一张",
    });
};

// 图片上传成功
const successhandler = (response: any) => {
    // 如果图片上传成功，校验结果清除
    form.value.clearValidate("certificatesUrl");
    // 收集上传成功图片的地址
    // response:上传图片请求服务器返回的数据
    // console.log(uploadFile);
    // uploadFile：上传文件对象

    params.certificatesUrl = response.data;
};

// 点击照片放大钩子
const handlePictureCardPreview = () => {
    // 触发预览钩子的时候，对话框显示
    dialogVisible.value = true;
};

// 照片墙删除图片的钩子
const handleRemove = () => {
    params.certificatesUrl = "";
};

// 重写按钮的回调:清空表单
const reset = () => {
    // console.log(upload.value);
    // 清除已上传文件列表
    upload.value.clearFiles();

    // 清空数据，但不包括已上传的数据
    Object.assign(params, {
        certificatesNo: "",
        certificatesType: "",
        certificatesUrl: "",
        name: "",
    });
};

// 提交按钮的回调
const submit = async () => {
    //全部的表单校验通过返回一个成功的promise
    //如果有一个表单校验失败返回的是一个失败的promise对象,后面的语句就不在执行了

    // 所以表单通过校验才会执行try。。。。
    let res = await form.value.validate();  //会执行所有的校验规则
    console.log(res, '????xxx');

    try {
        // 认证成功
        await reqUserCertation(params);
        // 提示消息
        ElMessage({
            type: "success",
            message: "认证成功",
        });
        // 认真成功后再次获取用户信息
        getUserInfo();
    } catch (error) {
        ElMessage({
            type: "error",
            message: "认证失败",
        });
    }
};

// 自定义校验姓名规则
const validatorName = (rule: any, value: any, callBack: any) => {
    // rule即为当前校验字段的校验规则对象   value即为当前校验字段的校验数据data
    // console.log(rule);
    // console.log(value);
    const reg =
        /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确的中国人的名字"));
    }
};

// 证件类型校验方法
const validatorType = (rule: any, value: any, callBack: any) => {
    // console.log(value);
    if (value == "10" || value == "20") {
        callBack();
    } else {
        callBack(new Error("请选择证件类型"));
    }
};

// 身份证号码
const validatorNo = (rule: any, value: any, callBack: any) => {
    // console.log(111);

    const reg =
        /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const hkb = /^\d{9}$/;
    if (reg.test(value) || hkb.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确的身份证号码或者户口本号码"));
    }
};

// 证件照图片
const validatorUrl = (rule: any, value: any, callBack: any) => {
    if (value.length) {
        callBack();
    } else {
        callBack(new Error("请上传证件照"));
    }
};
// 表单校验规则
const rules = {
    // 用户名字校验规则
    //  required: true,代表当前字段务必进行校验
    name: [
        {
            required: true,
            validator: validatorName,
        },
    ],
    certificatesType: [
        {
            required: true,
            validator: validatorType,
        },
    ],
    certificatesNo: [
        {
            required: true,
            validator: validatorNo,
        },
    ],
    certificatesUrl: [
        {
            required: true,
            validator: validatorUrl,
        },
    ],
};
</script>

<style scoped lang="scss">
.box-card {
    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
