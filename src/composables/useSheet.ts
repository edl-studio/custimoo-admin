import { computed, ref } from 'vue'

export interface SheetState {
  id: string
  type: string
  data: unknown
}

const sheets = ref<SheetState[]>([])
const manuallyMinimizedIds = ref<Set<string>>(new Set())
const autoMinimizedIds = ref<string[]>([])
const maxVisible = ref(4)

function isAnyMinimized(id: string) {
  return manuallyMinimizedIds.value.has(id) || autoMinimizedIds.value.includes(id)
}

function autoMinimizeExcess() {
  const visible = sheets.value.filter(s => !isAnyMinimized(s.id))
  const excess = visible.length - maxVisible.value
  if (excess > 0) {
    // Auto-minimize the oldest visible sheets (from front of visible list)
    for (let i = 0; i < excess; i++) {
      autoMinimizedIds.value = [...autoMinimizedIds.value, visible[i]!.id]
    }
  }
}

function autoRestoreSlots() {
  const visible = sheets.value.filter(s => !isAnyMinimized(s.id))
  const slotsAvailable = maxVisible.value - visible.length
  if (slotsAvailable > 0 && autoMinimizedIds.value.length > 0) {
    const toRestore = autoMinimizedIds.value.slice(0, slotsAvailable)
    autoMinimizedIds.value = autoMinimizedIds.value.slice(slotsAvailable)
    // Move restored sheets to end of array so they appear as newest visible
    for (const id of toRestore) {
      const idx = sheets.value.findIndex(s => s.id === id)
      if (idx !== -1) {
        const [sheet] = sheets.value.splice(idx, 1) as [SheetState]
        sheets.value.push(sheet)
      }
    }
  }
}

export function useSheet() {
  const openIds = computed(() => sheets.value.map(s => s.id))

  const visibleSheets = computed(() =>
    [...sheets.value.filter(s => !isAnyMinimized(s.id))].reverse()
  )

  const minimizedSheets = computed(() => sheets.value.filter(s => isAnyMinimized(s.id)))

  function setMaxVisible(n: number) {
    const prev = maxVisible.value
    maxVisible.value = n
    if (n < prev) {
      autoMinimizeExcess()
    } else if (n > prev) {
      autoRestoreSlots()
    }
  }

  function open(id: string, type: string, data: unknown) {
    const existingIndex = sheets.value.findIndex(s => s.id === id)

    if (existingIndex !== -1) {
      if (isAnyMinimized(id)) {
        restore(id)
        return
      }

      // If visible, toggle it closed
      close(id)
      return
    }

    sheets.value.push({ id, type, data })
    autoMinimizeExcess()
  }

  function close(id: string) {
    sheets.value = sheets.value.filter(s => s.id !== id)
    manuallyMinimizedIds.value.delete(id)
    autoMinimizedIds.value = autoMinimizedIds.value.filter(i => i !== id)
    autoRestoreSlots()
  }

  function closeAll() {
    sheets.value = []
    manuallyMinimizedIds.value.clear()
    autoMinimizedIds.value = []
  }

  function minimize(id: string) {
    // Remove from auto if present — user is explicitly minimizing
    autoMinimizedIds.value = autoMinimizedIds.value.filter(i => i !== id)
    manuallyMinimizedIds.value = new Set([...manuallyMinimizedIds.value, id])
    autoRestoreSlots()
  }

  function restore(id: string) {
    manuallyMinimizedIds.value.delete(id)
    manuallyMinimizedIds.value = new Set(manuallyMinimizedIds.value)
    autoMinimizedIds.value = autoMinimizedIds.value.filter(i => i !== id)
    // Move restored sheet to the end so it's visible
    const idx = sheets.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      const [sheet] = sheets.value.splice(idx, 1) as [SheetState]
      sheets.value.push(sheet)
    }
    autoMinimizeExcess()
  }

  function reorderSheet(fromId: string, toId: string) {
    if (fromId === toId) return
    const fromIdx = sheets.value.findIndex(s => s.id === fromId)
    const toIdx = sheets.value.findIndex(s => s.id === toId)
    if (fromIdx === -1 || toIdx === -1) return
    const [moved] = sheets.value.splice(fromIdx, 1) as [SheetState]
    sheets.value.splice(toIdx, 0, moved)
  }

  const canReorder = computed(() => visibleSheets.value.length >= 2)

  function isOpen(id: string) {
    return sheets.value.some(s => s.id === id)
  }

  function isMinimized(id: string) {
    return isAnyMinimized(id)
  }

  return {
    sheets,
    visibleSheets,
    minimizedSheets,
    canReorder,
    maxVisible,
    openIds,
    open,
    close,
    closeAll,
    minimize,
    restore,
    reorderSheet,
    isOpen,
    isMinimized,
    setMaxVisible
  }
}
