import { computed, ref } from 'vue'

export interface SheetState {
  id: string
  type: string
  data: unknown
}

const MAX_SHEETS = 4

const sheets = ref<SheetState[]>([])
const minimizedIds = ref<Set<string>>(new Set())

export function useSheet() {
  const openIds = computed(() => sheets.value.map(s => s.id))

  const visibleSheets = computed(() => sheets.value.filter(s => !minimizedIds.value.has(s.id)))

  const minimizedSheets = computed(() => sheets.value.filter(s => minimizedIds.value.has(s.id)))

  function open(id: string, type: string, data: unknown) {
    const existing = sheets.value.findIndex(s => s.id === id)
    if (existing !== -1) {
      // If minimized, restore it
      if (minimizedIds.value.has(id)) {
        restore(id)
        return
      }
      // If already open and visible, close it (toggle)
      close(id)
      return
    }
    if (visibleSheets.value.length >= MAX_SHEETS) {
      // Minimize the oldest visible sheet instead of removing
      const oldest = visibleSheets.value[0]
      if (oldest) minimize(oldest.id)
    }
    sheets.value.push({ id, type, data })
  }

  function close(id: string) {
    sheets.value = sheets.value.filter(s => s.id !== id)
    minimizedIds.value.delete(id)
  }

  function closeAll() {
    sheets.value = []
    minimizedIds.value.clear()
  }

  function minimize(id: string) {
    minimizedIds.value = new Set([...minimizedIds.value, id])
  }

  function restore(id: string) {
    if (visibleSheets.value.length >= MAX_SHEETS) {
      const oldest = visibleSheets.value[0]
      if (oldest) minimize(oldest.id)
    }
    minimizedIds.value.delete(id)
    minimizedIds.value = new Set(minimizedIds.value)
  }

  function isOpen(id: string) {
    return sheets.value.some(s => s.id === id)
  }

  function isMinimized(id: string) {
    return minimizedIds.value.has(id)
  }

  return {
    sheets,
    visibleSheets,
    minimizedSheets,
    openIds,
    open,
    close,
    closeAll,
    minimize,
    restore,
    isOpen,
    isMinimized
  }
}
