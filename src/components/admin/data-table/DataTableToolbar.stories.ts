import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Table } from '@tanstack/vue-table'
import { ref } from 'vue'
import DataTableToolbar from './DataTableToolbar.vue'

function createMockTable(overrides: { globalFilter?: string } = {}): Table<unknown> {
  const globalFilter = ref(overrides.globalFilter ?? '')
  const columnFilter = ref('')

  return {
    getState: () => ({
      globalFilter: globalFilter.value
    }),
    setGlobalFilter: (value: string) => {
      globalFilter.value = value
    },
    getColumn: () => ({
      getFilterValue: () => columnFilter.value,
      setFilterValue: (value: string) => {
        columnFilter.value = value
      }
    })
  } as unknown as Table<unknown>
}

const meta = {
  title: 'Admin/Table/DataTableToolbar',
  component: DataTableToolbar as any,
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
    components: { DataTableToolbar },
    setup: () => ({ table: createMockTable() }),
    template: '<DataTableToolbar :table="table" />'
  })
}

export const WithPlaceholder: Story = {
  render: () => ({
    components: { DataTableToolbar },
    setup: () => ({ table: createMockTable() }),
    template: '<DataTableToolbar :table="table" filter-placeholder="Search orders..." />'
  })
}

export const WithColumnFilter: Story = {
  render: () => ({
    components: { DataTableToolbar },
    setup: () => ({ table: createMockTable() }),
    template:
      '<DataTableToolbar :table="table" filter-column="customer" filter-placeholder="Filter by customer..." />'
  })
}

export const WithSlotContent: Story = {
  render: () => ({
    components: { DataTableToolbar },
    setup: () => ({ table: createMockTable() }),
    template: `
      <DataTableToolbar :table="table" filter-placeholder="Search...">
        <button class="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm">
          Export
        </button>
      </DataTableToolbar>
    `
  })
}
