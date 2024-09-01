<template>
    <div class="chat-container">
        <div class="fath">
            <div class="messages" v-for="(msg, index) in messages" :key="index">
                <div v-if="msg.role == 'user'" class="question">Q: &nbsp;{{ msg.content }}</div>
                <div v-else class="answer">A: &nbsp;{{ msg.content }}</div>
            </div>
        </div>
        <div class="out">
            <div class="footer">
                <input type="text" v-model="inputText" @keyup.enter="sendMessage" placeholder="Type a message..."
                    class="inp" />
                <el-button type="primary" @click="sendMessage">Send</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OpenAI from 'openai';

let inputText = ref<string>('');
let messages = ref<any>([]);
let question = ref('')

const client = new OpenAI({
    apiKey: "sk-1QFoeAxQmRm1PvYjkqTrwHFZauBTIpHVY8Beog2YUvd4sAw1", // 替换为您的 API Key
    baseURL: "https://api.moonshot.cn/v1",
    dangerouslyAllowBrowser: true
});

// 系统消息和聊天逻辑将在这里实现
// ...

async function sendMessage() {
    if (!inputText.value.trim()) return; // 忽略空消息
    // 发送用户消息到服务器
    makeMessages(inputText.value)
    // 清空输入框
    inputText.value = '';
}
async function makeMessages(input: string) {
    messages.value.push({
        role: "user",
        content: input,
    });
    question.value = input
    await chat(input)
}
async function chat(input: any) {
    // 这里应该是调用 Kimi API 的逻辑
    // 以下为示例，您需要根据实际 API 调整
    const completion = await client.chat.completions.create({
        model: "moonshot-v1-8k",
        messages: messages.value,
        temperature: 0.3,
    });

    const assistantMessage = completion.choices[0].message;

    // 为了让 Kimi 大模型拥有完整的记忆，我们必须将 Kimi 大模型返回给我们的消息也添加到 messages 中
    messages.value.push(assistantMessage);

    return assistantMessage.content;
}



</script>

<style lang="css" scoped>
.chat-container {
    position: relative;
    margin-bottom: 100px;
}

.out {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 100px;
}

.inp {
    width: 80%;
    height: 70%;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 20px;
    font-size: 20px;
}

.footer {
    width: 80%;
    height: 60px;
    position: absolute;
    top: 40%;
    text-align: center;
    margin: 0 auto;
}

.messages {
    /* border: 1px solid green; */
    margin: 0 auto;
    width: 70%;

}

.question {
    background-color: #2d65f7;
    color: white;
    margin: 20px 0;
    width: 50%;
    border-radius: 10px;
    padding: 10px 10px;
    /* position: absolute;
    left: 0; */
    float: left
}

.answer {
    background-color: #fafafa;
    color: black;
    border-radius: 10px;
    padding: 10px 10px;
    width: 50%;
    float: right;
    margin-right: 30px;
    margin-bottom: 20px;
}
</style>
