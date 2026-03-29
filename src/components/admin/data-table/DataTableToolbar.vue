<script setup lang="ts">
  import type { Table } from '@tanstack/vue-table'
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { Search } from 'lucide-vue-next'
  import { Input } from '@/components/ui/input'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    table: Table<unknown>
    filterColumn?: string
    filterPlaceholder?: string
    class?: HTMLAttributes['class']
  }>()

  const columnId = computed(() => props.filterColumn ?? '')

  const filterValue = computed({
    get() {
      if (!columnId.value) return (props.table.getState().globalFilter as string) ?? ''
      return (props.table.getColumn(columnId.value)?.getFilterValue() as string) ?? ''
    },
    set(value: string) {
      if (!columnId.value) {
        props.table.setGlobalFilter(value)
      } else {
        props.table.getColumn(columnId.value)?.setFilterValue(value)
      }
    },
  })
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center gap-2 py-3',
        props.class
      )
    "
  >
    <div class="relative max-w-sm flex-1">
      <Search class="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[#726159]" />
      <Input
        v-model="filterValue"
        :placeholder="filterPlaceholder ?? 'Search...'"
        class="h-9 pl-9"
      />
    </div>
    <slot />
  </div>
</template>
