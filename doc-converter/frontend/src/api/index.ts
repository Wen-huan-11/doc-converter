const BASE = '/api'

export interface TaskInfo {
  task_id: string
  status: string
  file_name: string
  percent: number
  output_file: string | null
  message: string | null
}

export async function uploadFiles(
  files: File[],
  convertType: string,
  outputFormat: string,
  pageRanges?: string
): Promise<string[]> {
  const form = new FormData()
  files.forEach(f => form.append('files', f))
  form.append('convert_type', convertType)
  form.append('output_format', outputFormat)
  if (pageRanges) {
    form.append('page_ranges', pageRanges)
  }

  const res = await fetch(`${BASE}/convert`, { method: 'POST', body: form })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail || 'Upload failed')
  }
  const data = await res.json()
  return data.task_ids as string[]
}

export async function getTask(taskId: string): Promise<TaskInfo> {
  const res = await fetch(`${BASE}/tasks/${taskId}`)
  if (!res.ok) throw new Error('Task not found')
  return res.json()
}

export function getDownloadUrl(taskId: string): string {
  return `${BASE}/download/${taskId}`
}

export async function pollTask(
  taskId: string,
  onProgress: (info: TaskInfo) => void,
  intervalMs = 500
): Promise<TaskInfo> {
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      try {
        const info = await getTask(taskId)
        onProgress(info)
        if (info.status === 'done') {
          clearInterval(timer)
          resolve(info)
        } else if (info.status === 'error') {
          clearInterval(timer)
          reject(new Error(info.message || 'Conversion failed'))
        }
      } catch (e) {
        clearInterval(timer)
        reject(e)
      }
    }, intervalMs)
  })
}
