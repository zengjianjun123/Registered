<template>
    <div class="upload_container">
        <input type="file" @change="filechange" class="input">
        <div class="btn">
            <el-button type="primary" @click="uploadBtn">点击上传</el-button>
            <!-- <el-button type="danger">停止上传</el-button> -->
        </div>
        <div class="progress">
            <el-progress :text-inside="true" :stroke-width="40" :percentage="percentage"
                :status="percentage < 100 ? '' : 'success'" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import SparkMD5 from 'spark-md5'
import request2 from '@/utils/request2';

let fileList = <any>ref([])   //保存分片文件
let file = <any>ref([])  //保存完整文件
let percentage = ref(0)
const fileMD5 = <any>ref('')

//控制并发的函数
function paralleTask(tasks: any, paraCount: number = 2) {
    return new Promise((resolve, reject) => {
        if (tasks.length == 0) {
            //@ts-ignore
            resolve()
            return
        }
        let curIndex = 0   //记录当前待执行任务的下标
        let finishTask = 0 //  完成任务个数
        function run() {
            //运行下一个任务
            let task = tasks[curIndex]
            curIndex++
            task().then(() => {    //运行任务
                finishTask++  //完成任务加1
                if (curIndex < tasks.length) {   //证明还有任务没执行   
                    run()
                } else if (finishTask == tasks.length) {  //所有任务完成
                    //@ts-ignore
                    resolve()
                }
            })
        }
        for (let i = 0; i < paraCount && i < tasks.length; i++) {  // 首次开启 多个请求
            run()
        }
    })
}
// paralleTask().then(() => {
//     console.log('所有任务完成');

// })
//确定本地文件之后开始分片
const filechange = (e: any) => {
    // console.log(e.target.files[0]);//获取上传文件对象
    file.value = e.target.files[0]
    percentage.value = 0
    // 开始按照 1M大小 进行分片    file.value.size获得文件大小
    for (let i = 0; i < file.value.size; i += 1024 * 1024) {
        fileList.value.push(file.value.slice(i, i + 1024 * 1024))   //文件被划分成 1M大小的块了
    }
}
//上传文件
const uploadBtn = () => {
    // 对每个文件生成对应的文件hash值   用spark-md5 库生成
    const hash = new SparkMD5.ArrayBuffer()  //Spark-md5包含很多数据结构 ArrayBuffer、Blob 等。这块采用ArrayBuffer这种数据类型
    const fileReader: any = new FileReader()  //创建一个对象，用于读取文件内容。
    // console.log('开始读取文件');
    fileReader.readAsArrayBuffer(file.value)  //读取file，并将其内容作为 ArrayBuffer 读取
    //一旦文件被读取完，就触发onload函数
    fileReader.onload = () => {
        hash.append(fileReader.result)   //将这个 ArrayBuffer 数据添加到哈希对象中，准备进行 MD5 哈希计算
        fileMD5.value = hash.end()  // 完成哈希计算过程
        // console.log('xxxx', fileReader.result);
        // console.log('xxxx', hash.end());
        // console.log('xxxx', hash);
        upload(0)
    }
}



//大文件上传一般是两个请求，一个分片上传请求 ， 一个上传完成分片合并请求
//1.分片上传
let upload = async (index: any) => {
    if (index == fileList.value.length) {  //当分片最后一个上传完毕，开始合并
        mergeUpload()
        return
    }
    const formData = new FormData()   //构建一种像表单数据的(键值对 key/value)对象，可通过网络发送
    formData.append('chunk', fileList.value[index])  //文件
    formData.append('index', index)
    formData.append('name', fileMD5.value + '@' + index) // 临时的二进制文件分片
    formData.append('filename', fileMD5.value)
    let res: any = await request2.post('/file/upload_chunk', formData)
    if (res.code == 300) {
        //已存在部分文件
        percentage.value = +((res.index / fileList.value.length) * 100).toFixed(2)
        upload(res.index + 1)
    } else if (res.code == 200) {
        percentage.value = +(((index + 1) / fileList.value.length) * 100).toFixed(2)
        // console.log(percentage.value);
        upload(index + 1) // 上传成功 
    } else {
        upload(index)
    }
}

// 2. 合并分片
const mergeUpload = async () => {
    //合并请求
    let res: any = await request2.post('/file/merge_chunk', {
        filename: fileMD5.value, //最后合并的文件名
        extname: file.value.type.split('/').pop() //文件后缀
    })
    console.log('结果是', res);

    if ((res.code = 200)) {
        file.value = null
        fileList.value = []
        fileMD5.value = ''
        //@ts-ignore
        ElMessage({
            type: 'success',
            message: '上传成功'
        })
        let inp: any = document.querySelector('.input')
        // inp.value = ''
        percentage.value = 100
    }
}
</script>
<style scoped>
.upload_container {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
}

.btn {
    margin-top: 30px;
}

.progress {
    margin-top: 40px;
}
</style>
