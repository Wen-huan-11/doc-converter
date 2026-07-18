<script setup lang="ts">
import { ref } from 'vue'
import { useFileStore } from '@/stores/file-store'
import { useTaskStore } from '@/stores/task-store'
import { uploadFiles, pollTask, type TaskInfo } from '@/api'

const props = defineProps<{
  convertType: string
  outputFormat: string
  pageRanges?: string
}>()

const emit = defineEmits<{
  progress: [info: TaskInfo]
  complete: [info: TaskInfo]
  error: [error: string]
}>()

const fileStore = useFileStore()
const taskStore = useTaskStore()
const isRunning = ref(false)

async function startConvert() {
  const files = fileStore.files
  if (files.length === 0) return

  // Extract raw File objects
  const rawFiles: File[] = files
    .map(f => (f as any).file as File | undefined)
    .filter(Boolean) as File[]

  if (rawFiles.length === 0) {
    emit('error', '没有可上传的文件')
    return
  }

  isRunning.value = true
  taskStore.setConverting(true)

  try {
    const taskIds = await uploadFiles(rawFiles, props.convertType, props.outputFormat, props.pageRanges)

    // Track all tasks
    const polls = taskIds.map(tid => {
      taskStore.addTask({
        taskId: tid,
        fileName: '',
        percent: 0,
        status: 'pending',
      })
      return pollTask(tid, (info) => {
        taskStore.updateTask(tid, {
          fileName: info.file_name,
          percent: info.percent,
          status: info.status === 'done' ? 'done' : info.status === 'error' ? 'error' : 'processing',
          message: info.message ?? undefined,
        })
        emit('progress', info)
      })
    })

    const results = await Promise.allSettled(polls)
    for (const r of results) {
      if (r.status === 'fulfilled') {
        emit('complete', r.value)
      } else {
        emit('error', r.reason?.message || '转换失败')
      }
    }
  } catch (e: any) {
    emit('error', e.message || '转换失败')
  } finally {
    isRunning.value = false
    taskStore.setConverting(false)
  }
}
</script>

<template>
  <button
    class="convert-btn"
    :class="{ running: isRunning }"
    :disabled="isRunning || fileStore.files.length === 0"
    @click="startConvert"
  >
    <span v-if="isRunning" class="spinner"></span>
    {{ isRunning ? '转换中...' : '开始转换' }}
  </button>
</template>

<style scoped>
.convert-btn {
  padding: 12px 40px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
}
.convert-btn:hover:not(:disabled) {
  background: var(--primary-light);
  box-shadow: 0 4px 16px rgba(74, 108, 247, 0.3);
}
.convert-btn:disabled {
  background: #c0c0d0;
  cursor: not-allowed;
}
.running {
  background: var(--primary-dark);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
