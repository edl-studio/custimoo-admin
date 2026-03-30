import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Column } from '@tanstack/vue-table'
import { ref } from 'vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'

type MockColumn = Column<unknown, unknown>

function createMockColumn(
  overrides: {
    canSort?: boolean
    isSorted?: false | 'asc' | 'desc'
  } = {}
): MockColumn {
  const sortState = ref(overrides.isSorted ?? false)
  return {
    getCanSort: () => overrides.canSort ?? true,
    getIsSorted: () => sortState.value,
    toggleSorting: (desc: boolean) => {
      sortState.value = desc ? 'desc' : 'asc'
    },
    clearSorting: () => {
      sortState.value = false
    }
  } as unknown as MockColumn
}

const meta = {
  title: 'Admin/Table/DataTableColumnHeader',
  component: DataTableColumnHeader as any,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[200px]"><story /></div>'
    })
  ]
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { DataTableColumnHeader },
    setup: () => ({ column: createMockColumn() }),
    template: '<DataTableColumnHeader :column="column" title="Customer" />'
  })
}

export const SortedAsc: Story = {
  render: () => ({
    components: { DataTableColumnHeader },
    setup: () => ({ column: createMockColumn({ isSorted: 'asc' }) }),
    template: '<DataTableColumnHeader :column="column" title="Customer" />'
  })
}

export const SortedDesc: Story = {
  render: () => ({
    components: { DataTableColumnHeader },
    setup: () => ({ column: createMockColumn({ isSorted: 'desc' }) }),
    template: '<DataTableColumnHeader :column="column" title="Customer" />'
  })
}

export const NonSortable: Story = {
  render: () => ({
    components: { DataTableColumnHeader },
    setup: () => ({ column: createMockColumn({ canSort: false }) }),
    template: '<DataTableColumnHeader :column="column" title="Actions" />'
  })
}

export const AllStates: Story = {
  decorators: [
    () => ({
      template: '<div class="w-[400px]"><story /></div>'
    })
  ],
  render: () => ({
    components: { DataTableColumnHeader },
    setup: () => ({
      unsorted: createMockColumn(),
      asc: createMockColumn({ isSorted: 'asc' }),
      desc: createMockColumn({ isSorted: 'desc' }),
      nonSortable: createMockColumn({ canSort: false })
    }),
    template: `
      <div class="flex flex-col gap-4">
        <div class="group/th flex items-center gap-2">
          <span class="w-24 text-xs text-foreground-tertiary">Unsorted</span>
          <DataTableColumnHeader :column="unsorted" title="Customer" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-24 text-xs text-foreground-tertiary">Asc</span>
          <DataTableColumnHeader :column="asc" title="Customer" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-24 text-xs text-foreground-tertiary">Desc</span>
          <DataTableColumnHeader :column="desc" title="Customer" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-24 text-xs text-foreground-tertiary">Non-sortable</span>
          <DataTableColumnHeader :column="nonSortable" title="Actions" />
        </div>
      </div>
    `
  })
}
