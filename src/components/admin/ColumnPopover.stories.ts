import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ColumnPopover from './ColumnPopover.vue'
import type { ColumnItem } from './ColumnPopover.vue'

const sampleColumns: ColumnItem[] = [
  { id: 'priority', label: 'Priority' },
  { id: 'merchant', label: 'Merchant' },
  { id: 'customer', label: 'Customer' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'stage', label: 'Stage' },
  { id: 'step', label: 'Step' },
  { id: 'since_action', label: 'Since action' },
  { id: 'order_date', label: 'Order date' },
  { id: 'due_date', label: 'Due date' }
]

const allIds = sampleColumns.map(c => c.id)

const meta = {
  title: 'Admin/Table/ColumnPopover',
  component: ColumnPopover,
  tags: ['autodocs'],
  args: {
    columns: sampleColumns,
    visibleIds: allIds,
    order: allIds
  }
} satisfies Meta<typeof ColumnPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { ColumnPopover },
    setup() {
      const visibleIds = ref([...args.visibleIds])
      const order = ref([...args.order!])
      return { columns: args.columns, visibleIds, order, allIds }
    },
    template: `
      <ColumnPopover
        :columns="columns"
        v-model:visibleIds="visibleIds"
        v-model:order="order"
        @restore-default="visibleIds = [...allIds]; order = [...allIds]"
      >
        <button class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium shadow-sm hover:bg-secondary">
          Columns
        </button>
      </ColumnPopover>
    `
  })
}

export const PartiallyHidden: Story = {
  args: {
    visibleIds: ['priority', 'merchant', 'customer', 'stage']
  },
  render: args => ({
    components: { ColumnPopover },
    setup() {
      const visibleIds = ref([...args.visibleIds])
      const order = ref([...args.order!])
      return { columns: args.columns, visibleIds, order, allIds, total: sampleColumns.length }
    },
    template: `
      <ColumnPopover
        :columns="columns"
        v-model:visibleIds="visibleIds"
        v-model:order="order"
        @restore-default="visibleIds = [...allIds]; order = [...allIds]"
      >
        <button class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium shadow-sm hover:bg-secondary">
          Columns ({{ visibleIds.length }}/{{ total }})
        </button>
      </ColumnPopover>
    `
  })
}
