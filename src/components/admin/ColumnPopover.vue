<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { Search, RotateCcw } from 'lucide-vue-next'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
  import { Separator } from '@/components/ui/separator'
  import PopoverItem from './PopoverItem.vue'

  export interface ColumnItem {
    /** Unique column identifier */
    id: string
    /** Display label */
    label: string
  }

  const props = defineProps<{
    /** Available columns in display order */
    columns: ColumnItem[]
    /** IDs of currently visible columns */
    visibleIds: string[]
    /** Column order (array of IDs). Falls back to columns prop order when not provided. */
    order?: string[]
  }>()

  const emit = defineEmits<{
    'update:visibleIds': [ids: string[]]
    'update:order': [ids: string[]]
    restoreDefault: []
  }>()

  const open = ref(false)
  const query = ref('')

  // Internal ordered list — synced from props when popover opens
  const internalOrder = ref<string[]>([])

  watch(open, isOpen => {
    if (isOpen) {
      internalOrder.value = props.order?.length ? [...props.order] : props.columns.map(c => c.id)
      query.value = ''
    }
  })

  const columnMap = computed(() => {
    const map = new Map<string, ColumnItem>()
    for (const col of props.columns) {
      map.set(col.id, col)
    }
    return map
  })

  const orderedColumns = computed(() =>
    internalOrder.value.map(id => columnMap.value.get(id)).filter((c): c is ColumnItem => !!c)
  )

  const filteredColumns = computed(() => {
    if (!query.value) return orderedColumns.value
    const q = query.value.toLowerCase()
    return orderedColumns.value.filter(c => c.label.toLowerCase().includes(q))
  })

  function isVisible(id: string) {
    return props.visibleIds.includes(id)
  }

  function toggleColumn(id: string) {
    const next = isVisible(id) ? props.visibleIds.filter(v => v !== id) : [...props.visibleIds, id]
    emit('update:visibleIds', next)
  }

  // --- Drag-and-drop reordering ---
  const dragIndex = ref<number | null>(null)
  const dragOverIndex = ref<number | null>(null)

  function onDragStart(e: DragEvent, index: number) {
    dragIndex.value = index
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', String(index))
    }
  }

  function onDragOver(e: DragEvent, index: number) {
    e.preventDefault()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
    dragOverIndex.value = index
  }

  function onDragEnd() {
    dragIndex.value = null
    dragOverIndex.value = null
  }

  function onDrop(e: DragEvent, toIndex: number) {
    e.preventDefault()
    const fromIndex = dragIndex.value
    if (fromIndex == null || fromIndex === toIndex) {
      onDragEnd()
      return
    }

    // Map filtered indices back to the full order array
    const fromId = filteredColumns.value[fromIndex]?.id
    const toId = filteredColumns.value[toIndex]?.id
    if (!fromId || !toId) {
      onDragEnd()
      return
    }

    const newOrder = [...internalOrder.value]
    const fromOrderIdx = newOrder.indexOf(fromId)
    const toOrderIdx = newOrder.indexOf(toId)
    newOrder.splice(fromOrderIdx, 1)
    newOrder.splice(toOrderIdx, 0, fromId)

    internalOrder.value = newOrder
    emit('update:order', newOrder)
    onDragEnd()
  }
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>

    <PopoverContent
      align="end"
      :side-offset="4"
      :collision-padding="8"
      class="flex w-56 flex-col rounded-lg border border-border bg-card p-0 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <!-- Search -->
      <div class="p-1">
        <div class="flex h-9 items-center gap-2 rounded-md px-3">
          <Search class="size-3.5 shrink-0 text-foreground-tertiary" />
          <input
            v-model="query"
            type="text"
            placeholder="Search"
            class="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-content-placeholder focus:outline-none"
          />
        </div>
      </div>

      <Separator class="bg-border" />

      <!-- Column list (scrollable) -->
      <div class="max-h-72 overflow-y-auto px-1 py-1">
        <div
          v-for="(col, idx) in filteredColumns"
          :key="col.id"
          :draggable="!query"
          :class="[
            'rounded-md transition-colors',
            dragIndex === idx && 'opacity-50',
            dragOverIndex === idx && dragIndex !== idx && 'bg-secondary'
          ]"
          @dragstart="onDragStart($event, idx)"
          @dragover="onDragOver($event, idx)"
          @dragleave="dragOverIndex = null"
          @dragend="onDragEnd"
          @drop="onDrop($event, idx)"
        >
          <PopoverItem
            :label="col.label"
            :draggable="!query"
            :checked="isVisible(col.id)"
            @update:checked="toggleColumn(col.id)"
            @click="toggleColumn(col.id)"
          />
        </div>
      </div>

      <!-- Fixed footer -->
      <Separator class="bg-border" />

      <div class="px-1 py-1">
        <PopoverItem label="Restore default" :icon="RotateCcw" @click="emit('restoreDefault')" />
      </div>
    </PopoverContent>
  </Popover>
</template>
