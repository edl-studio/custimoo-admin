<script setup lang="ts" generic="TData">
  import type { Column } from '@tanstack/vue-table'
  import type { HTMLAttributes } from 'vue'
  import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
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
  <div
    v-if="!column.getCanSort()"
    :class="cn('text-[#726159]', props.class)"
  >
    {{ title }}
  </div>
  <Button
    v-else
    variant="ghost"
    size="sm"
    :class="cn('-ml-3 h-8 text-[#726159] hover:text-[#1D1816]', props.class)"
    @click="toggleSort"
  >
    {{ title }}
    <ArrowUp
      v-if="column.getIsSorted() === 'asc'"
      class="ml-1 size-3.5"
    />
    <ArrowDown
      v-else-if="column.getIsSorted() === 'desc'"
      class="ml-1 size-3.5"
    />
    <ArrowUpDown
      v-else
      class="ml-1 size-3.5"
    />
  </Button>
</template>
