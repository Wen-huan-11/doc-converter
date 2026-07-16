<script setup lang="ts">
import { ref } from 'vue'
import FileTable from '@/components/files/FileTable.vue'
import ConvertSettings from '@/components/settings/ConvertSettings.vue'
import ConvertButton from '@/components/common/ConvertButton.vue'
import type { TaskInfo } from '@/api'
import { getDownloadUrl } from '@/api'

const settingsRef = ref<InstanceType<typeof ConvertSettings>>()
const completedTasks = ref<TaskInfo[]>([])
const errorMessage = ref('')
const showError = ref(false)

function onProgress(info: TaskInfo) {
  // nothing extra needed — task store handles it
}

function onComplete(info: TaskInfo) {
  completedTasks.value.push(info)
}

function onError(msg: string) {
  errorMessage.value = msg
  showError.value = true
  setTimeout(() => { showError.value = false }, 5000)
}

function downloadFile(taskId: string) {
  window.open(getDownloadUrl(taskId), '_blank')
}
</script>

<template>
  <div class="convert-page">
    <h2 class="page-title">PDF 转 Word</h2>
    <p class="page-desc">将 PDF 文件转换为可编辑的 Word 文档（.docx）</p>

    <!-- Error alert -->
    <div v-if="showError" class="error-alert">{{ errorMessage }}</div>

    <!-- File table -->
    <FileTable />

    <!-- Settings area -->
    <div class="section-gap">
      <ConvertSettings ref="settingsRef" />
    </div>

    <!-- Convert button -->
    <div class="action-row">
      <ConvertButton
        convert-type="pdf-to-word"
        :output-format="settingsRef?.outputFormat || 'docx'"
        @progress="onProgress"
        @complete="onComplete"
        @error="onError"
      />
    </div>

    <!-- Completed downloads -->
    <div v-if="completedTasks.length > 0" class="completed-section">
      <h4>转换完成</h4>
      <div v-for="task in completedTasks" :key="task.task_id" class="completed-item">
        <span>{{ task.file_name }}</span>
        <button class="download-link" @click="downloadFile(task.task_id)">下载</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.convert-page {
  max-width: 960px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.page-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.error-alert {
  background: #fef0f0;
  color: #e04040;
  border: 1px solid #f5c0c0;
  border-radius: var(--radius-sm);
  padding: 10px 16px;
  margin-bottom: 16px;
  font-size: 13px;
}

.section-gap {
  margin-top: 16px;
}

.action-row {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.completed-section {
  margin-top: 24px;
  padding: 16px;
  background: #f0faf0;
  border: 1px solid #c0e8c0;
  border-radius: var(--radius-md);
}

.completed-section h4 {
  font-size: 14px;
  margin-bottom: 10px;
  color: #2a8a2a;
}

.completed-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
}

.download-link {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 4px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
}
.download-link:hover {
  background: var(--primary-light);
}
</style>
