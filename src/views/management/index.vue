<template>
  <div class="management">
    <h2>弹幕列表</h2>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <table v-else class="comment-table">
      <thead>
        <tr>
          <th>弹幕内容</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.text_input }}</td>
          <td>{{ formatDate(item.date_create) }}</td>
          <td>
            <button type="button" class="btn-delete" :disabled="deletingId === item.id" @click="handleDelete(item.id)">
              {{ deletingId === item.id ? '删除中...' : '删除' }}
            </button>
          </td>
        </tr>
        <tr v-if="list.length === 0">
          <td colspan="3" class="empty">暂无评论</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

const API_BASE = import.meta.env.VITE_API_BASE

const list = ref([])
const loading = ref(true)
const error = ref('')
const deletingId = ref(null)

async function fetchList() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/api/danmu`)
    const json = await res.json()
    if (json.code === 0 && json.data?.list) {
      list.value = json.data.list
    } else {
      error.value = json.message || '获取列表失败'
    }
  } catch (e) {
    error.value = e.message || '请求失败'
  } finally {
    loading.value = false
  }
}

function formatDate(isoStr) {
  if (!isoStr) return '-'
  return dayjs(isoStr).format('YYYY-MM-DD HH:mm:ss')
}

async function handleDelete(id) {
  if (deletingId.value) return
  deletingId.value = id
  try {
    const res = await fetch(`${API_BASE}/api/danmu/${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (json.code === 0) {
      list.value = list.value.filter((item) => item.id !== id)
    } else {
      alert(json.message || '删除失败')
    }
  } catch (e) {
    alert(e.message || '删除请求失败')
  } finally {
    deletingId.value = null
  }
}

onMounted(() => {
  fetchList()
})
</script>

<style scoped>
.management {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

h2 {
  margin: 0 0 16px;
  font-size: 18px;
}

.loading,
.error {
  padding: 16px;
  color: #666;
}

.error {
  color: #c00;
}

.comment-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.comment-table th,
td {
  padding: 10px 12px;
  text-align: left;
  border: 1px solid #e8e8e8;
}

.comment-table th {
  background: #fafafa;
  font-weight: 600;
}

.comment-table tbody tr:hover {
  background: #f9f9f9;
}

.comment-table .empty {
  text-align: center;
  color: #999;
}

.comment-table .btn-delete {
  padding: 4px 12px;
  font-size: 13px;
  color: #fff;
  background: #f5222d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-table .btn-delete:hover:not(:disabled) {
  background: #cf1322;
}

.comment-table .btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
