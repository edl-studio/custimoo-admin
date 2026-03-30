import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Table } from '@tanstack/vue-table'
import { ref } from 'vue'
import DataTablePagination from './DataTablePagination.vue'

function createMockTable(
  overrides: {
    pageIndex?: number
    pageSize?: number
    pageCount?: number
    rowCount?: number
  } = {}
): Table<unknown> {
  const pageIndex = ref(overrides.pageIndex ?? 0)
  const pageSize = ref(overrides.pageSize ?? 10)
  const pageCount = overrides.pageCount ?? 5

  return {
    getState: () => ({
      pagination: {
        pageIndex: pageIndex.value,
        pageSize: pageSize.value
      }
    }),
    getPageCount: () => pageCount,
    getCanPreviousPage: () => pageIndex.value > 0,
    getCanNextPage: () => pageIndex.value < pageCount - 1,
    previousPage: () => {
      if (pageIndex.value > 0) pageIndex.value--
    },
    nextPage: () => {
      if (pageIndex.value < pageCount - 1) pageIndex.value++
    },
    setPageSize: (size: number) => {
      pageSize.value = size
    }
  } as unknown as Table<unknown>
}

const meta = {
  title: 'Admin/Table/DataTablePagination',
  component: DataTablePagination as any,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[600px]"><story /></div>'
    })
  ]
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { DataTablePagination },
    setup: () => ({ table: createMockTable() }),
    template: '<DataTablePagination :table="table" />'
  })
}

export const MiddlePage: Story = {
  render: () => ({
    components: { DataTablePagination },
    setup: () => ({ table: createMockTable({ pageIndex: 2, pageCount: 5 }) }),
    template: '<DataTablePagination :table="table" />'
  })
}

export const LastPage: Story = {
  render: () => ({
    components: { DataTablePagination },
    setup: () => ({ table: createMockTable({ pageIndex: 4, pageCount: 5 }) }),
    template: '<DataTablePagination :table="table" />'
  })
}

export const CustomPageSizes: Story = {
  render: () => ({
    components: { DataTablePagination },
    setup: () => ({ table: createMockTable() }),
    template: '<DataTablePagination :table="table" :page-size-options="[5, 15, 25, 100]" />'
  })
}

export const SinglePage: Story = {
  render: () => ({
    components: { DataTablePagination },
    setup: () => ({ table: createMockTable({ pageCount: 1 }) }),
    template: '<DataTablePagination :table="table" />'
  })
}
