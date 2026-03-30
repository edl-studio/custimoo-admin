import { computed, ref } from 'vue'

export interface SheetState {
  id: string
  type: string
  data: unknown
}

const MAX_SHEETS = 4

const sheets = ref<SheetState[]>([])

export function useSheet() {
  const openIds = computed(() => sheets.value.map(s => s.id))

  function open(id: string, type: string, data: unknown) {
    const existing = sheets.value.findIndex(s => s.id === id)
    if (existing !== -1) {
      close(id)
      return
    }
    if (sheets.value.length >= MAX_SHEETS) {
      sheets.value.shift()
    }
    sheets.value.push({ id, type, data })
  }

  function close(id: string) {
    sheets.value = sheets.value.filter(s => s.id !== id)
  }

  function closeAll() {
    sheets.value = []
  }

  function isOpen(id: string) {
    return sheets.value.some(s => s.id === id)
  }

  return {
    sheets,
    openIds,
    open,
    close,
    closeAll,
    isOpen
  }
}
