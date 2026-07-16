import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FileItem {
  id: string
  name: string
  path: string
  size: number
  sizeStr: string
  ext: string
  isScanned: boolean
  file?: File  // browser File object for upload
}

export const useFileStore = defineStore('files', () => {
  const files = ref<FileItem[]>([])
  const selectedIds = ref<Set<string>>(new Set())

  function addFiles(newFiles: FileItem[]) {
    const existing = new Set(files.value.map(f => f.name))
    files.value.push(...newFiles.filter(f => !existing.has(f.name)))
  }

  function removeFile(id: string) {
    files.value = files.value.filter(f => f.id !== id)
    selectedIds.value.delete(id)
  }

  function clearFiles() {
    files.value = []
    selectedIds.value.clear()
  }

  function toggleSelect(id: string) {
    if (selectedIds.value.has(id)) {
      selectedIds.value.delete(id)
    } else {
      selectedIds.value.add(id)
    }
  }

  function selectAll() {
    files.value.forEach(f => selectedIds.value.add(f.id))
  }

  function clearSelection() {
    selectedIds.value.clear()
  }

  return { files, selectedIds, addFiles, removeFile, clearFiles, toggleSelect, selectAll, clearSelection }
})
