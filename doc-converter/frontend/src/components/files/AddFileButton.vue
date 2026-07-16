<script setup lang="ts">
import { ref } from 'vue'
import { useFileStore, type FileItem } from '@/stores/file-store'

const store = useFileStore()
const inputRef = ref<HTMLInputElement>()

let idCounter = 0

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function handleFiles(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  const newFiles: FileItem[] = []
  for (const f of target.files) {
    newFiles.push({
      id: `file_${++idCounter}_${Date.now()}`,
      name: f.name,
      path: '', // browser mode: no local path
      size: f.size,
      sizeStr: formatSize(f.size),
      ext: f.name.split('.').pop()?.toLowerCase() || '',
      isScanned: false,
      file: f, // keep the File object for upload
    })
  }
  store.addFiles(newFiles)
  // reset input to allow re-selecting same file
  target.value = ''
}

function trigger() {
  inputRef.value?.click()
}
</script>

<template>
  <button class="add-file-btn" @click="trigger">
    <span class="plus">+</span> 添加文件
  </button>
  <input
    ref="inputRef"
    type="file"
    multiple
    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.dwg,.dxf,.caj,.png,.jpg,.jpeg,.bmp,.tiff"
    class="hidden-input"
    @change="handleFiles"
  />
</template>

<style scoped>
.add-file-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 13px;
  color: var(--text-primary);
  transition: all 0.15s;
}
.add-file-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.plus {
  font-size: 16px;
  font-weight: 600;
}
.hidden-input {
  display: none;
}
</style>
