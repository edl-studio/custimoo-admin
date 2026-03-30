import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DataTable from './DataTable.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableToolbar from './DataTableToolbar.vue'

interface Order {
  id: string
  customer: string
  status: string
  total: string
  date: string
}

const data: Order[] = [
  {
    id: '#1001',
    customer: 'Alice Johnson',
    status: 'Fulfilled',
    total: '$120.00',
    date: '2026-03-28'
  },
  { id: '#1002', customer: 'Bob Smith', status: 'Pending', total: '$85.50', date: '2026-03-28' },
  {
    id: '#1003',
    customer: 'Carol White',
    status: 'Cancelled',
    total: '$200.00',
    date: '2026-03-27'
  },
  { id: '#1004', customer: 'Dave Brown', status: 'Fulfilled', total: '$55.00', date: '2026-03-27' },
  { id: '#1005', customer: 'Eve Davis', status: 'Pending', total: '$340.25', date: '2026-03-26' },
  {
    id: '#1006',
    customer: 'Frank Miller',
    status: 'Fulfilled',
    total: '$92.00',
    date: '2026-03-26'
  },
  { id: '#1007', customer: 'Grace Lee', status: 'Fulfilled', total: '$178.50', date: '2026-03-25' },
  { id: '#1008', customer: 'Hank Wilson', status: 'Pending', total: '$64.00', date: '2026-03-25' },
  { id: '#1009', customer: 'Ivy Chen', status: 'Fulfilled', total: '$420.00', date: '2026-03-24' },
  {
    id: '#1010',
    customer: 'Jack Taylor',
    status: 'Cancelled',
    total: '$35.00',
    date: '2026-03-24'
  },
  {
    id: '#1011',
    customer: 'Karen Adams',
    status: 'Fulfilled',
    total: '$150.75',
    date: '2026-03-23'
  },
  { id: '#1012', customer: 'Leo Martinez', status: 'Pending', total: '$88.00', date: '2026-03-23' }
]

// DataTableColumnHeader is generic, so we cast to avoid type inference issues with Storybook
const columns: ColumnDef<Order, unknown>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Order' }),
    size: 100
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Customer' })
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const colors: Record<string, string> = {
        Fulfilled: 'text-emerald-700 bg-emerald-50',
        Pending: 'text-amber-700 bg-amber-50',
        Cancelled: 'text-red-700 bg-red-50'
      }
      return h(
        'span',
        {
          class: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] ?? ''}`
        },
        status
      )
    }
  },
  {
    accessorKey: 'total',
    header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Total' }),
    size: 120
  },
  {
    accessorKey: 'date',
    header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Date' }),
    size: 120
  }
]

// DataTable is a generic component — use `as any` to sidestep Storybook meta inference
const meta = {
  title: 'Admin/Table/DataTable',
  component: DataTable as any,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  decorators: [
    () => ({
      template: '<div class="w-[900px]"><story /></div>'
    })
  ]
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: columns as any,
    data
  }
}

export const WithToolbar: Story = {
  args: {
    columns: columns as any,
    data
  },
  render: (_args: any) => ({
    components: { DataTable, DataTableToolbar },
    setup: () => ({ columns, data }),
    template: `
      <DataTable :columns="columns" :data="data">
        <template #toolbar="{ table }">
          <DataTableToolbar :table="table" filter-placeholder="Search orders..." />
        </template>
      </DataTable>
    `
  })
}

export const NoPagination: Story = {
  args: {
    columns: columns as any,
    data: data.slice(0, 5),
    showPagination: false
  }
}

export const Empty: Story = {
  args: {
    columns: columns as any,
    data: []
  }
}
