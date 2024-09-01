<template>
    <div class="seg">
        <el-upload class="upload-demo" drag action="http://127.0.0.1:5000/segment" name="image"
            :on-success="successhandler">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖动文件到此<em>&nbsp;上传</em>
            </div>
        </el-upload>
        <div class="imgg">
            <img :src="imageUrl" alt="">
        </div>
    </div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios';
import { ref } from 'vue';
let imageUrl = ref("/src/assets/images/a1.jpg") //http://localhost:5173/assets/cwnet.png

const fetchImage = () => {
    axios.get('http://127.0.0.1:5000/getimgage', { responseType: 'arraybuffer' })  //指定了响应的数据类型应该是arraybuffer，这是一个二进制数据格式，适用于处理图像等二进制文件
        .then(response => {
            const blob = new Blob([response.data], { type: 'image/jpeg' });//Blob 对象在Web开发中用于表示一个原始数据的二进制对象。它通常用于处理二进制文件，比如图片、视频、音频文件等。
            imageUrl.value = URL.createObjectURL(blob);
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
}

const successhandler = (res: any) => {
    // console.log('成功', res);
    fetchImage()

}
</script>
<style scoped>
.seg {
    width: 80%;
    margin: 0 auto;
}

img {
    width: 400px;
    height: 400px;
    background-repeat: cover;
}

.imgg {
    display: flex;
    justify-content: center
}
</style>
