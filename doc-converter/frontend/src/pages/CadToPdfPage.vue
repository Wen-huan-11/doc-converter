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
    <h2 class="page-title">CAD 转 PDF</h2>
    <p class="page-desc">将 DWG/DXF 工程图文件转换为 PDF 格式，方便查看和分享</p>

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

    <div class="section-gap">
      <ConvertSettings ref="settingsRef" />
    </div>

    <div class="action-row">
      <ConvertButton
        convert-type="cad-to-pdf"
        output-format="pdf"
        @progress="onProgress"
        @complete="onComplete"
        @error="onError"
      />
    </div>

    <div v-if="completedTasks.length > 0" class="completed-section">
      <h4>转换完成</h4>
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
