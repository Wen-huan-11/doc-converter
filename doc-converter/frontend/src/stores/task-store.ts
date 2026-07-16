import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TaskProgress {
  taskId: string
  fileName: string
  percent: number
  status: 'pending' | 'processing' | 'done' | 'error'
  message?: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Map<string, TaskProgress>>(new Map())
  const isConverting = ref(false)

  function addTask(task: TaskProgress) {
    tasks.value.set(task.taskId, task)
  }

  function updateTask(taskId: string, update: Partial<TaskProgress>) {
    const task = tasks.value.get(taskId)
    if (task) {
      Object.assign(task, update)
    }
  }

  function setConverting(val: boolean) {
    isConverting.value = val
  }

  return { tasks, isConverting, addTask, updateTask, setConverting }
})
