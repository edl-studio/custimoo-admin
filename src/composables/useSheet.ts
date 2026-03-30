import { computed, ref } from 'vue'

export interface SheetState {
  id: string
  type: string
  data: unknown
}

const MAX_SHEETS = 4

const sheets = ref<SheetState[]>([])
const maxVisible = ref(MAX_SHEETS)

export function useSheet() {
  const openIds = computed(() => sheets.value.map(s => s.id))

  const visibleSheets = computed(() => sheets.value.slice(-maxVisible.value))

  const hiddenCount = computed(() => Math.max(0, sheets.value.length - maxVisible.value))

  function setMaxVisible(n: number) {
    maxVisible.value = n
  }

  function open(id: string, type: string, data: unknown) {
    const existingIndex = sheets.value.findIndex(s => s.id === id)

    if (existingIndex !== -1) {
      const visibleIds = new Set(visibleSheets.value.map(s => s.id))

      if (visibleIds.has(id)) {
        close(id)
      } else {
        const [sheet] = sheets.value.splice(existingIndex, 1) as [SheetState]
        sheets.value.push(sheet)
      }
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
    visibleSheets,
    hiddenCount,
    maxVisible,
    openIds,
    open,
    close,
    closeAll,
    isOpen,
    setMaxVisible
  }
}
