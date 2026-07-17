<script setup lang="ts">
import FileTable from '@/components/files/FileTable.vue'
</script>

<template>
  <div class="convert-page">
    <h2 class="page-title">转可搜索 PDF</h2>
    <p class="page-desc">将不含文本层的 PDF 通过 OCR 识别转换为可搜索的 PDF</p>

    <!-- OCR not available notice -->
    <div class="ocr-notice">
      <div class="ocr-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div class="ocr-text">
        <h4>需要安装 Tesseract OCR 引擎</h4>
        <p>OCR 文字识别功能依赖 Tesseract OCR 引擎，请先安装后再使用此功能。</p>
        <p class="ocr-cmd">
          Windows: 下载安装
          <a href="https://github.com/UB-Mannheim/tesseract/wiki" target="_blank">Tesseract for Windows</a>
        </p>
      </div>
    </div>

    <FileTable />
  </div>
</template>

<style scoped>
.convert-page { max-width: 960px; }
.page-title { font-size: 20px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.page-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 24px; }

.ocr-notice {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  background: #fff8e6;
  border: 1px solid #f0d080;
  border-radius: var(--radius-md);
  margin-bottom: 24px;
}
.ocr-icon {
  color: #e6a000;
  flex-shrink: 0;
  margin-top: 2px;
}
.ocr-text h4 {
  font-size: 14px;
  font-weight: 600;
  color: #8a6a00;
  margin-bottom: 6px;
}
.ocr-text p {
  font-size: 13px;
  color: #8a6a00;
  margin-bottom: 4px;
}
.ocr-cmd {
  font-family: monospace;
  font-size: 12px !important;
}
.ocr-cmd a {
  color: #4a6cf7;
}
</style>
