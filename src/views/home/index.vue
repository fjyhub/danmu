<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import vueDanmaku from 'vue-danmaku'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const danmus = ref([])
const timer = ref(null)
const colors = ref([
    { id: 0, color: '#ff5722', size: 20 },
    { id: 1, color: '#ff5722', size: 20 },
    { id: 2, color: '#2196f3', size: 18 },
    { id: 3, color: '#4caf50', size: 16 },
    { id: 4, color: '#ffc107', size: 18 },
    { id: 5, color: '#9c27b0', size: 18 },
    { id: 6, color: '#e91e63', size: 16 },
    { id: 7, color: '#3f51b5', size: 20 },
    { id: 8, color: '#795548', size: 16 },
    { id: 9, color: '#607d8b', size: 18 },
])
onMounted(() => {
    timer.value = setInterval(() => {
        getAllData()
    }, 2000)

})
onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer)
        timer.value = null
    }
})
const getAllData = async () => {
    try {
        const res = await fetch(`${API_BASE}/api/danmu`, { method: 'GET' })
        const json = await res.json()
        if (json.code === 0 && json.data?.list) {
            danmus.value = json.data.list || []
        } else {
            console.log('--失败--', json)
        }
    } catch (error) {
        console.log('----error---', error)
    }
}
</script>

<template>
    <div class="main">
        <vue-danmaku v-model:danmus="danmus" style="height:100vh;" loop>
            <template #danmu="{ index, danmu }" loop>
                <div class="custom-danmaku">
                    <span :style="{
                        color: colors[index % 10].color || '#ffffff',
                        fontSize: `${colors[index % 10].size || 16}px`,
                    }" class="custom-danmaku-text">{{ danmu.text_input }}</span>
                </div>
            </template>
        </vue-danmaku>
    </div>
</template>

<style scoped>
.main {
    width: 100vw;
    height: 100vh;
    background: url('../../assets/image/bg.jpg');
    background-size: cover;
}

.custom-danmaku {
    background-color: rgba(0, 0, 0, 0.1);
}

.custom-danmaku-text {
    color: #fff;
    font-weight: bold;
    padding: 4px 6px;
    border-radius: 8px;
    margin: 4px 8px;
    /* display: inline-block; */
    /* background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3)); */
}
</style>
