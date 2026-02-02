<template>
    <div class="container">
        <h2 class="title">弹幕发送</h2> <!-- 新增标题 -->
        <div class="input-area">
            <textarea id="danmaku-input" placeholder="输入弹幕内容" v-model.trim="input"></textarea>
            <button class="send-btn" @click="sendBtn">发送</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const API_BASE = import.meta.env.VITE_API_BASE
const loading = ref(false)

const input = ref('')
async function createDanmaku() {

    try {
        if (loading.value) {
            return
        }
        loading.value = true
        const response = await fetch(`${API_BASE}/api/danmu/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text_input: input.value })
        });
        loading.value = false
        if (!response.code === 0) {
            throw new Error(`HTTP error status`);
        }
    } catch (error) {
        loading.value = false
        alert('发送失败，请稍后再试！');
    }
}
// 发送弹幕
const sendBtn = async () => {
    const text = input.value.trim();
    if (text.length > 100) {
        alert('弹幕内容不能超过100个字符！');
        return;
    }
    if (text) {
        await createDanmaku();
        input.value = ''; // 清空输入框
    }
};




</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 垂直居中 */
    align-items: center;
    /* 水平居中 */
    position: relative;
    overflow: hidden;
    background-color: #fff;
}

.title {
    font-size: 20px;
    color: #333;
    /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
    /* 文字阴影增强可读性 */
    margin-bottom: 50px;
}

.input-area {
    display: flex;
    flex-direction: column;
    /* 垂直排列 */
    align-items: center;
    /* 水平居中 */
    padding: 10px;
    background-color: #fff;
    width: 100%;
    position: relative;
}

#danmaku-input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    resize: vertical;
    /* 允许垂直拖拽调整高度 */
    min-height: 140px;
    /* 设置最小高度 */
    margin-bottom: 10px;
    /* 与按钮间距 */
    white-space: pre-wrap;
    /* 保留换行符和空格 */
    overflow-y: auto;
    /* 超出时显示滚动条 */
}

.send-btn {
    padding: 12px 40px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 40px;
}

#send-btn:active {
    background-color: #0056b3;
}
</style>