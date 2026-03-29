<script setup lang="ts">
  import type { Table } from '@tanstack/vue-table'
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    table: Table<unknown>
    pageSizeOptions?: number[]
    class?: HTMLAttributes['class']
  }>()

  const sizeOptions = computed(() => props.pageSizeOptions ?? [10, 20, 30, 50])

  const currentPage = computed(() => props.table.getState().pagination.pageIndex + 1)
  const pageCount = computed(() => props.table.getPageCount())
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-between gap-4 px-2 py-3',
        props.class
      )
    "
  >
    <!-- Rows per page -->
    <div class="flex items-center gap-2 text-sm text-[#726159]">
      <span class="whitespace-nowrap">Rows per page</span>
      <Select
        :model-value="String(table.getState().pagination.pageSize)"
        @update:model-value="(value) => table.setPageSize(Number(value))"
      >
        <SelectTrigger class="h-8 w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="size in sizeOptions"
            :key="size"
            :value="String(size)"
          >
            {{ size }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Page info + nav -->
    <div class="flex items-center gap-4">
      <span class="text-sm text-[#726159]">
        Page {{ currentPage }} of {{ pageCount }}
      </span>
      <div class="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          class="size-8"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <ChevronLeft class="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="size-8"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <ChevronRight class="size-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
