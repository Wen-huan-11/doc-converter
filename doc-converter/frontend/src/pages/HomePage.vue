<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const actionGroups = [
  {
    title: 'PDF 转换',
    items: [
      { icon: 'doc',  label: 'PDF 转 Word',  desc: '转为可编辑文档',  route: '/pdf-to-word',  color: '#4a6cf7' },
      { icon: 'xls',  label: 'PDF 转 Excel', desc: '提取表格数据',    route: '/pdf-to-excel', color: '#22b07d' },
      { icon: 'ppt',  label: 'PDF 转 PPT',   desc: '生成演示文稿',    route: '/pdf-to-ppt',   color: '#f07f46' },
      { icon: 'cad',  label: 'PDF 转 CAD',   desc: '还原工程图纸',    route: '/pdf-to-cad',   color: '#e04040' },
      { icon: 'search', label: '转可搜索 PDF', desc: 'OCR 文字识别',   route: '/pdf-to-searchable', color: '#5b8def' },
      { icon: 'scan', label: '转扫描型 PDF',  desc: '扫描件 OCR',     route: '/pdf-scan-to-searchable', color: '#8b5cf6' },
    ]
  },
  {
    title: '转为 PDF',
    items: [
      { icon: 'cad-pdf', label: 'CAD 转 PDF', desc: '工程图转 PDF',   route: '/cad-to-pdf', color: '#e04040' },
      { icon: 'caj', label: 'CAJ 转 PDF', desc: '知网文献转换',       route: '/caj-to-pdf', color: '#f0a040' },
    ]
  },
  {
    title: '拆分合并',
    items: [
      { icon: 'split', label: 'PDF 拆分',  desc: '按页拆分文档',     route: '/pdf-split',  color: '#5b8def' },
      { icon: 'merge', label: 'PDF 合并',  desc: '多文件合并',       route: '/pdf-merge',  color: '#22b07d' },
    ]
  }
]
</script>

<template>
  <div class="home-page">
    <h2 class="page-title">文档转换工具</h2>
    <p class="page-subtitle">高效、精准的文档格式转换，支持多种格式互转</p>

    <div v-for="group in actionGroups" :key="group.title" class="group-section">
      <h3 class="group-title">{{ group.title }}</h3>
      <div class="quick-grid">
        <div
          v-for="action in group.items"
          :key="action.route"
          class="quick-card"
          @click="router.push(action.route)"
        >
          <div class="quick-icon" :style="{ backgroundColor: action.color }">
            <span class="icon-dot"></span>
          </div>
          <div class="quick-info">
            <span class="quick-label">{{ action.label }}</span>
            <span class="quick-desc">{{ action.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 900px;
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
  margin-bottom: 36px;
}

.group-section {
  margin-bottom: 28px;
}

.group-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  padding-left: 2px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.quick-card {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 16px rgba(74, 108, 247, 0.12);
  transform: translateY(-2px);
}

.quick-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.quick-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.quick-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.quick-desc {
  font-size: 11px;
  color: var(--text-muted);
}
</style>
