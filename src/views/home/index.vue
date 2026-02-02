<script setup>
import { ref } from 'vue'
import vueDanmaku from 'vue-danmaku'
const danmus = ref([
    { name: 'a', text: 'aaa' },
    { name: 'b', text: 'bbb' },
])
</script>

<template>
    <div class="main">
        <vue-danmaku v-model:danmus="danmus" style="height:500px;" loop>
            <template #danmu="{ index, danmu }" loop>
                <span>{{ index }}{{ danmu.name }}：{{ danmu.text }}</span>
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
</style>
