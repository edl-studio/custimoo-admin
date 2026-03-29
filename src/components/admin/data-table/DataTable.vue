<script setup lang="ts" generic="TData, TValue">
  import type { ColumnDef, SortingState, ColumnFiltersState } from '@tanstack/vue-table'
  import type { HTMLAttributes } from 'vue'
  import { ref } from 'vue'
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

  const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    showPagination?: boolean
    class?: HTMLAttributes['class']
  }>()

  const sorting = ref<SortingState>([])
  const columnFilters = ref<ColumnFiltersState>([])
  const globalFilter = ref('')

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
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const emit = defineEmits<{
    rowClick: [data: TData]
  }>()

  defineExpose({ table })
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot name="toolbar" :table="table" />

    <div class="overflow-hidden rounded-lg border border-[#ECE5DA] bg-white">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="border-[#ECE5DA] hover:bg-transparent"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :style="{ width: header.getSize() !== 150 ? `${header.getSize()}px` : undefined }"
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
              class="border-[#ECE5DA] hover:bg-[#F6F3EE]"
              :class="{ 'cursor-pointer': $attrs.onRowClick }"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              @click="emit('rowClick', row.original)"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow class="hover:bg-transparent">
              <TableCell :colspan="columns.length" class="h-24 text-center text-[#726159]">
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
