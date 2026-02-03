<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import vueDanmaku from 'vue-danmaku'
const API_BASE = import.meta.env.VITE_API_BASE
const router = useRouter()

const danmus = ref([])
const timer = ref(null)
onMounted(() => {
    timer.value = setInterval(() => {
        getAllData()
    }, 2000)
})
onBeforeUnmount(() => {
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
const handleDelete = () => {
    const routeUrl = router.resolve({
        path: '/management'
    })
    window.open(routeUrl.href, '_blank')
}
</script>

<template>
    <div class="main">
        <vue-danmaku v-model:danmus="danmus" style="height:100vh;" loop :speeds="150" :loopOnly="true"
            :randomChannel="true">
            <template #danmu="{ index, danmu }">
                <div class="custom-danmaku">
                    <span :style="{
                        color: '#ff0d0d',
                    }" class="custom-danmaku-text">{{ danmu.text_input }}</span>
                </div>
            </template>
        </vue-danmaku>
        <div class="delete" @click="handleDelete">

        </div>
    </div>
</template>

<style scoped>
.main {
    width: 100vw;
    height: 100vh;
    background: url('../../assets/image/bg.jpg');
    background-size: cover;
    position: relative;
}

/* .custom-danmaku {
    background-color: rgba(0, 0, 0, 0.1);
} */

.custom-danmaku-text {
    color: #fff;
    font-weight: bold;
}

.delete {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50% 50%;
    cursor: pointer;
    background: url('../../assets/image/setting.png');
    background-size: cover;
}
</style>
