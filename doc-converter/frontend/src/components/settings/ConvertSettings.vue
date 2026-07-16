<script setup lang="ts">
import { ref } from 'vue'

const outputFormat = ref('docx')
const engine = ref('auto')
const imageSetting = ref('default')
const outputDir = ref('')

const formatOptions = [
  { label: 'DOCX', value: 'docx' },
  { label: 'DOC', value: 'doc' },
  { label: 'RTF', value: 'rtf' },
]

const engineOptions = [
  { label: 'AI 自动选择', value: 'auto' },
  { label: 'LibreOffice', value: 'libreoffice' },
  { label: 'Python 引擎', value: 'python' },
]

defineExpose({ outputFormat, engine, imageSetting, outputDir })
</script>

<template>
  <div class="settings-section">
    <div class="setting-item">
      <label>图片设置</label>
      <el-select v-model="imageSetting" size="small" style="width: 160px">
        <el-option label="默认" value="default" />
        <el-option label="保留原图" value="keep" />
        <el-option label="压缩图片" value="compress" />
      </el-select>
    </div>
    <div class="setting-item">
      <label>转换引擎</label>
      <el-select v-model="engine" size="small" style="width: 160px">
        <el-option
          v-for="opt in engineOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
    </div>
    <div class="setting-item">
      <label>输出目录</label>
      <span class="dir-hint">与源文件相同</span>
    </div>
    <div class="setting-item">
      <label>输出格式</label>
      <el-select v-model="outputFormat" size="small" style="width: 160px">
        <el-option
          v-for="opt in formatOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
    </div>
  </div>
</template>

<style scoped>
.settings-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.setting-item {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-right: 1px solid var(--border-light);
}
.setting-item:last-child {
  border-right: none;
}

.setting-item label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.dir-hint {
  font-size: 13px;
  color: var(--text-muted);
}
</style>
