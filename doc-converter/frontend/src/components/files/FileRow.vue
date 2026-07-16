<script setup lang="ts">
import { useFileStore, type FileItem } from '@/stores/file-store'

const props = defineProps<{ file: FileItem }>()
const store = useFileStore()

const formatIcons: Record<string, string> = {
  pdf: '#e04040',
  doc: '#4a6cf7',
  docx: '#4a6cf7',
  xls: '#22b07d',
  xlsx: '#22b07d',
  ppt: '#f07f46',
  pptx: '#f07f46',
  dwg: '#e04040',
  dxf: '#e04040',
  caj: '#f0a040',
}

function getColor(ext: string): string {
  return formatIcons[ext] || '#888'
}

function remove() {
  store.removeFile(props.file.id)
}
</script>

<template>
  <tr class="file-row">
    <td class="col-check">
      <input
        type="checkbox"
        :checked="store.selectedIds.has(file.id)"
        @change="store.toggleSelect(file.id)"
      />
    </td>
    <td class="col-name">
      <span class="file-icon" :style="{ backgroundColor: getColor(file.ext) }">
        {{ file.ext.toUpperCase() }}
      </span>
      <div class="file-info">
        <span class="file-name">{{ file.name }}</span>
        <span class="file-meta">{{ file.sizeStr }}</span>
      </div>
    </td>
    <td class="col-range">
      <span class="range-text">全部页面</span>
    </td>
    <td class="col-mode">
      <span class="mode-text">AI 自动选择</span>
    </td>
    <td class="col-action">
      <button class="action-btn" title="删除" @click="remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
      </button>
    </td>
  </tr>
</template>

<style scoped>
.file-row {
  border-bottom: 1px solid var(--border-light);
  transition: background 0.1s;
}
.file-row:hover {
  background: #f8f8fc;
}
.file-row td {
  padding: 10px 12px;
  vertical-align: middle;
}

.col-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}

.file-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.file-name {
  font-size: 13px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  font-size: 11px;
  color: var(--text-muted);
}

.range-text,
.mode-text {
  font-size: 12px;
  color: var(--text-secondary);
  background: #f0f0f5;
  padding: 2px 8px;
  border-radius: 3px;
  white-space: nowrap;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  border-radius: 3px;
  transition: all 0.15s;
}
.action-btn:hover {
  color: #e04040;
  background: #fef0f0;
}
</style>
