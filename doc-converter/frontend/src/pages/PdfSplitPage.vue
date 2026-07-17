<script setup lang="ts">
import { ref } from 'vue'
import FileTable from '@/components/files/FileTable.vue'
import ConvertSettings from '@/components/settings/ConvertSettings.vue'
import ConvertButton from '@/components/common/ConvertButton.vue'
import type { TaskInfo } from '@/api'
import { getDownloadUrl } from '@/api'
import { useTaskStore } from '@/stores/task-store'

const settingsRef = ref<InstanceType<typeof ConvertSettings>>()
const errorMessage = ref('')
const showError = ref(false)
const completedTasks = ref<TaskInfo[]>([])
const taskStore = useTaskStore()
const pageRanges = ref('')

function onProgress(_info: TaskInfo) {}

function onComplete(info: TaskInfo) {
  completedTasks.value.push(info)
}

function onError(msg: string) {
  errorMessage.value = msg
  showError.value = true
}

function downloadFile(taskId: string) {
  window.open(getDownloadUrl(taskId), '_blank')
}

function dismissError() {
  showError.value = false
}
</script>

<template>
  <div class="convert-page">
    <h2 class="page-title">PDF 拆分</h2>
    <p class="page-desc">将 PDF 按页码范围拆分为多个独立文件</p>

    <div v-if="showError" class="error-alert">
      <span>转换失败：{{ errorMessage }}</span>
      <button class="error-close" @click="dismissError">✕</button>
    </div>

    <FileTable />

    <div v-if="taskStore.isConverting" class="progress-bar-wrap">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: Math.max(...Array.from(taskStore.tasks.values()).map(t => t.percent), 0) + '%' }"></div>
      </div>
      <span class="progress-text">转换中...</span>
    </div>

    <!-- Page range input -->
    <div class="page-range-section">
      <label class="range-label">页码范围（可选）</label>
      <input
        v-model="pageRanges"
        type="text"
        class="range-input"
        placeholder="例如: 1-3, 5, 7-10（留空则每页拆分为独立文件）"
      />
      <span class="range-hint">支持逗号分隔的页码或范围，如 "1-5, 8, 10-15"</span>
    </div>

    <div class="section-gap">
      <ConvertSettings ref="settingsRef" />
    </div>

    <div class="action-row">
      <ConvertButton
        convert-type="pdf-split"
        output-format="zip"
        :page-ranges="pageRanges || undefined"
        @progress="onProgress"
        @complete="onComplete"
        @error="onError"
      />
    </div>

    <div v-if="completedTasks.length > 0" class="completed-section">
      <h4>拆分完成</h4>
      <div v-for="task in completedTasks" :key="task.task_id" class="completed-item">
        <span class="completed-name">{{ task.file_name }}</span>
        <span class="completed-status">已完成</span>
        <button class="download-link" @click="downloadFile(task.task_id)">下载</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.convert-page { max-width: 960px; }
.page-title { font-size: 20px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.page-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 20px; }
.error-alert { background: #fef0f0; color: #e04040; border: 1px solid #f5c0c0; border-radius: var(--radius-sm); padding: 10px 16px; margin-bottom: 16px; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
.error-close { background: none; border: none; cursor: pointer; color: #e04040; font-size: 16px; }
.progress-bar-wrap { margin-top: 12px; display: flex; align-items: center; gap: 10px; }
.progress-bar { flex: 1; height: 6px; background: #e8e8ee; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--primary); border-radius: 3px; transition: width 0.3s; min-width: 2%; }
.progress-text { font-size: 12px; color: var(--text-secondary); white-space: nowrap; }

.page-range-section {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.range-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}
.range-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text-primary);
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
}
.range-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.1);
}
.range-input::placeholder {
  color: var(--text-muted);
}
.range-hint {
  font-size: 12px;
  color: var(--text-muted);
}

.section-gap { margin-top: 16px; }
.action-row { margin-top: 20px; display: flex; justify-content: flex-end; }
.completed-section { margin-top: 24px; padding: 16px; background: #f0faf0; border: 1px solid #c0e8c0; border-radius: var(--radius-md); }
.completed-section h4 { font-size: 14px; margin-bottom: 10px; color: #2a8a2a; }
.completed-item { display: flex; align-items: center; gap: 12px; padding: 6px 0; font-size: 13px; }
.completed-name { flex: 1; }
.completed-status { color: #2a8a2a; font-size: 12px; font-weight: 500; }
.download-link { background: var(--primary); color: #fff; border: none; padding: 6px 16px; border-radius: var(--radius-sm); cursor: pointer; font-size: 12px; }
.download-link:hover { background: var(--primary-light); }
</style>
