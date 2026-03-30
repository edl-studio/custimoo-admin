<script setup lang="ts" generic="TData">
  import type { Column } from '@tanstack/vue-table'
  import type { HTMLAttributes } from 'vue'
  import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    column: Column<TData, unknown>
    title: string
    class?: HTMLAttributes['class']
  }>()

  function toggleSort() {
    if (!props.column.getCanSort()) return

    const currentSort = props.column.getIsSorted()
    if (currentSort === false) {
      props.column.toggleSorting(false)
    } else if (currentSort === 'asc') {
      props.column.toggleSorting(true)
    } else {
      props.column.clearSorting()
    }
  }
</script>

<template>
  <div v-if="!column.getCanSort()" :class="cn('whitespace-nowrap', props.class)">
    {{ title }}
  </div>
  <div
    v-else
    :class="
      cn(
        'flex cursor-pointer items-center gap-1 whitespace-nowrap hover:text-foreground',
        props.class
      )
    "
    @click="toggleSort"
  >
    {{ title }}
    <ArrowUp v-if="column.getIsSorted() === 'asc'" class="size-3.5 shrink-0" />
    <ArrowDown v-else-if="column.getIsSorted() === 'desc'" class="size-3.5 shrink-0" />
    <ArrowUpDown
      v-else
      class="size-3.5 shrink-0 opacity-0 transition-opacity group-hover/th:opacity-100"
    />
  </div>
</template>
