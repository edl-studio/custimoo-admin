import { computed, ref } from 'vue'

export interface SheetState {
  id: string
  type: string
  data: unknown
}

const MAX_SHEETS = 4

const sheets = ref<SheetState[]>([])
const minimizedIds = ref<Set<string>>(new Set())
const maxVisible = ref(MAX_SHEETS)

export function useSheet() {
  const openIds = computed(() => sheets.value.map(s => s.id))

  const nonMinimizedSheets = computed(() => sheets.value.filter(s => !minimizedIds.value.has(s.id)))

  const visibleSheets = computed(() => nonMinimizedSheets.value.slice(-maxVisible.value))

  const hiddenCount = computed(() =>
    Math.max(0, nonMinimizedSheets.value.length - maxVisible.value)
  )

  const minimizedSheets = computed(() => sheets.value.filter(s => minimizedIds.value.has(s.id)))

  function setMaxVisible(n: number) {
    maxVisible.value = n
  }

  function open(id: string, type: string, data: unknown) {
    const existingIndex = sheets.value.findIndex(s => s.id === id)

    if (existingIndex !== -1) {
      // If minimized, restore it
      if (minimizedIds.value.has(id)) {
        restore(id)
        return
      }

      const visibleIds = new Set(visibleSheets.value.map(s => s.id))

      if (visibleIds.has(id)) {
        close(id)
      } else {
        // Move hidden-but-not-minimized sheet to the end so it becomes visible
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
    minimizedIds.value.delete(id)
    minimizedIds.value = new Set(minimizedIds.value)
    // Move restored sheet to the end so it's visible
    const idx = sheets.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      const [sheet] = sheets.value.splice(idx, 1) as [SheetState]
      sheets.value.push(sheet)
    }
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
    hiddenCount,
    maxVisible,
    openIds,
    open,
    close,
    closeAll,
    minimize,
    restore,
    isOpen,
    isMinimized,
    setMaxVisible
  }
}
