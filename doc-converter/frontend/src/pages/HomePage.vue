<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const quickActions = [
  { icon: 'doc',  label: 'PDF 转 Word',  route: '/pdf-to-word',  color: '#4a6cf7' },
  { icon: 'xls',  label: 'PDF 转 Excel', route: '/pdf-to-excel', color: '#22b07d' },
  { icon: 'ppt',  label: 'PDF 转 PPT',   route: '/pdf-to-ppt',   color: '#f07f46' },
  { icon: 'cad',  label: 'PDF 转 CAD',   route: '/pdf-to-cad',   color: '#e04040' },
  { icon: 'merge', label: 'PDF 合并',    route: '/pdf-merge',    color: '#22b07d' },
  { icon: 'split', label: 'PDF 拆分',    route: '/pdf-split',    color: '#5b8def' }
]
</script>

<template>
  <div class="home-page">
    <h2 class="page-title">文档转换工具</h2>
    <p class="page-subtitle">高效、精准的文档格式转换，支持多种格式互转</p>

    <div class="quick-grid">
      <div
        v-for="action in quickActions"
        :key="action.route"
        class="quick-card"
        @click="router.push(action.route)"
      >
        <div class="quick-icon" :style="{ backgroundColor: action.color }">
          <span class="icon-dot"></span>
        </div>
        <span class="quick-label">{{ action.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 40px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.quick-card {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 16px rgba(74, 108, 247, 0.12);
  transform: translateY(-2px);
}

.quick-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}
</style>
