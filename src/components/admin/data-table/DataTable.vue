<script setup lang="ts" generic="TData, TValue">
  import type {
    ColumnDef,
    ColumnPinningState,
    SortingState,
    ColumnFiltersState
  } from '@tanstack/vue-table'
  import type { HTMLAttributes } from 'vue'
  import { ref, computed } from 'vue'
  import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable
  } from '@tanstack/vue-table'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '@/components/ui/table'
  import { cn } from '@/lib/utils'
  import DataTablePagination from './DataTablePagination.vue'

  const props = withDefaults(
    defineProps<{
      columns: ColumnDef<TData, TValue>[]
      data: TData[]
      showPagination?: boolean
      pinnedColumns?: string[]
      rowClass?: (row: TData) => string | undefined
      class?: HTMLAttributes['class']
    }>(),
    {
      pinnedColumns: () => []
    }
  )

  const sorting = ref<SortingState>([])
  const columnFilters = ref<ColumnFiltersState>([])
  const globalFilter = ref('')
  const columnPinning = ref<ColumnPinningState>({
    left: [],
    right: []
  })

  const initialColumnPinning = computed<ColumnPinningState>(() => ({
    left: props.pinnedColumns,
    right: []
  }))

  const table = useVueTable({
    get data() {
      return props.data
    },
    get columns() {
      return props.columns
    },
    state: {
      get sorting() {
        return sorting.value
      },
      get columnFilters() {
        return columnFilters.value
      },
      get globalFilter() {
        return globalFilter.value
      },
      get columnPinning() {
        return columnPinning.value.left?.length ? columnPinning.value : initialColumnPinning.value
      }
    },
    onSortingChange: updaterOrValue => {
      sorting.value =
        typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
    },
    onColumnFiltersChange: updaterOrValue => {
      columnFilters.value =
        typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue
    },
    onGlobalFilterChange: updaterOrValue => {
      globalFilter.value =
        typeof updaterOrValue === 'function' ? updaterOrValue(globalFilter.value) : updaterOrValue
    },
    onColumnPinningChange: updaterOrValue => {
      columnPinning.value =
        typeof updaterOrValue === 'function' ? updaterOrValue(columnPinning.value) : updaterOrValue
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const emit = defineEmits<{
    rowClick: [data: TData]
  }>()

  defineExpose({ table })

  function getPinningStyles(columnId: string) {
    const column = table.getColumn(columnId)
    if (!column) return {}
    const isPinned = column.getIsPinned()
    if (!isPinned) return {}
    return {
      position: 'sticky' as const,
      left: `${column.getStart('left')}px`,
      zIndex: 1
    }
  }

  function getPinningClasses(columnId: string) {
    const column = table.getColumn(columnId)
    if (!column) return ''
    const isPinned = column.getIsPinned()
    if (!isPinned) return ''

    const allPinned = table.getState().columnPinning.left ?? []
    const isLastPinned = allPinned[allPinned.length - 1] === columnId

    return cn(isLastPinned && 'shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]')
  }
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot name="toolbar" :table="table" />

    <div class="overflow-hidden rounded-lg border border-border bg-container">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="border-border hover:bg-transparent"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :width="header.getSize() !== 150 ? header.getSize() : undefined"
              :style="getPinningStyles(header.column.id)"
              :class="getPinningClasses(header.column.id)"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              class="group/row"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              :data-active="props.rowClass?.(row.original) ? '' : undefined"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :width="(cell.column.columnDef.meta as any)?.cellWidth"
                :style="getPinningStyles(cell.column.id)"
                :class="[
                  getPinningClasses(cell.column.id),
                  (cell.column.columnDef.meta as any)?.opensSheet && 'cursor-pointer'
                ]"
                :data-interactive="
                  (cell.column.columnDef.meta as any)?.interactive ? '' : undefined
                "
                @click="
                  (cell.column.columnDef.meta as any)?.opensSheet && emit('rowClick', row.original)
                "
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow class="hover:bg-transparent">
              <TableCell
                :colspan="columns.length"
                class="h-24 text-center text-foreground-tertiary"
              >
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination v-if="showPagination !== false" :table="table as any" />
  </div>
</template>
