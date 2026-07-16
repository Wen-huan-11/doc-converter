<script setup lang="ts">
</script>

<template>
  <div class="convert-page">
    <h2 class="page-title">CAD 转 PDF</h2>
    <p class="page-desc">将 CAD 工程图转换为 PDF 格式</p>
    <div class="placeholder-area"><p>文件列表和转换设置区域 — 后续阶段实现</p></div>
  </div>
</template>

<style scoped>
.convert-page { max-width: 960px; }
.page-title { font-size: 20px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.page-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; }
.placeholder-area { background: #ffffff; border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 60px 20px; text-align: center; color: var(--text-muted); }
</style>
