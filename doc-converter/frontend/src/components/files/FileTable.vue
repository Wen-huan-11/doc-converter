<script setup lang="ts">
import { useFileStore } from '@/stores/file-store'
import FileRow from './FileRow.vue'
import AddFileButton from './AddFileButton.vue'

const store = useFileStore()

function clearSelection() {
  store.clearSelection()
}

function clearAll() {
  store.clearFiles()
}
</script>

<template>
  <div class="file-section">
    <div class="file-table-wrap">
      <table class="file-table" v-if="store.files.length > 0">
        <thead>
          <tr>
            <th class="col-check"><input type="checkbox" @change="store.selectAll()" /></th>
            <th class="col-name">名称</th>
            <th class="col-range">输出范围</th>
            <th class="col-mode">转换模式</th>
            <th class="col-action">操作</th>
          </tr>
        </thead>
        <tbody>
          <FileRow
            v-for="file in store.files"
            :key="file.id"
            :file="file"
          />
        </tbody>
      </table>

      <!-- Empty state -->
      <div v-else class="empty-state">
        <p>点击下方按钮添加要转换的文件</p>
        <p class="hint">支持 PDF、Word、Excel、PPT、CAD、CAJ 等格式</p>
      </div>
    </div>

    <div class="file-actions">
      <AddFileButton />
      <button class="clear-btn" @click="clearSelection" v-if="store.selectedIds.size > 0">清除选中</button>
      <button class="clear-btn" @click="clearAll" v-if="store.files.length > 0">清空列表</button>
    </div>
  </div>
</template>

<style scoped>
.file-section {
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.file-table-wrap {
  min-height: 120px;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.file-table thead {
  background: #fafafc;
  border-bottom: 1px solid var(--border-color);
}

.file-table th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 12px;
  white-space: nowrap;
}

.col-check { width: 40px; }
.col-name { min-width: 200px; }
.col-range { width: 140px; }
.col-mode { width: 140px; }
.col-action { width: 80px; text-align: center; }

.file-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-top: 1px solid var(--border-light);
  background: #fafafc;
}

.clear-btn {
  padding: 6px 14px;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  color: var(--text-secondary);
  transition: all 0.15s;
}
.clear-btn:hover {
  border-color: #e04040;
  color: #e04040;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--text-muted);
}
.empty-state p { margin: 4px 0; }
.hint { font-size: 12px; }
</style>
