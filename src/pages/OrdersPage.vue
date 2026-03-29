<script setup lang="ts">
  import { computed, h, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import type { ColumnDef } from '@tanstack/vue-table'
  import type { Component } from 'vue'
  import {
    Building2,
    Calendar,
    CalendarClock,
    CircleDot,
    Columns3,
    Download,
    Flag,
    Layers,
    LayoutGrid,
    MessageSquare,
    PenLine,
    Plus,
    FileText,
    Search,
    ShieldCheck,
    Tag,
    User
  } from 'lucide-vue-next'
  import {
    PageHeader,
    DataTable,
    DataTableColumnHeader,
    TabViewItem,
    ViewPopover,
    FilterSelectionInput
  } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Checkbox } from '@/components/ui/checkbox'
  import { Avatar, AvatarFallback } from '@/components/ui/avatar'
  import { useOrders } from '@/composables/useOrders'
  import type { Order, OrderStage, OrderFlag } from '@/data/mock-orders'
  import { cn } from '@/lib/utils'

  const router = useRouter()
  const { orders } = useOrders()

  const activeTab = ref<'all' | 'invoice' | 'factory'>('all')
  const searchQuery = ref('')

  const filteredOrders = computed(() => {
    if (!searchQuery.value) return orders.value
    const q = searchQuery.value.toLowerCase()
    return orders.value.filter(
      o =>
        o.orderId.toLowerCase().includes(q) ||
        o.merchant.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.reference.toLowerCase().includes(q)
    )
  })

  interface FilterDef {
    key: string
    label: string
    icon: Component
  }

  const filters: FilterDef[] = [
    { key: 'group', label: 'Group', icon: LayoutGrid },
    { key: 'status', label: 'Status', icon: CircleDot },
    { key: 'stage', label: 'Stage', icon: Layers },
    { key: 'invoiceStatus', label: 'Invoice status', icon: FileText },
    { key: 'orderCreation', label: 'Order creation', icon: Calendar },
    { key: 'dueDate', label: 'Due date', icon: CalendarClock },
    { key: 'role', label: 'Role', icon: ShieldCheck },
    { key: 'customer', label: 'Customer', icon: User },
    { key: 'merchant', label: 'Merchant', icon: Building2 },
    { key: 'orderType', label: 'Order type', icon: Tag },
    { key: 'flag', label: 'Flag', icon: Flag }
  ]

  const activeFilters = ref<Record<string, string | null>>({})

  function handleFilterClick(key: string) {
    // Toggle filter selection (placeholder — real implementation would open a popover)
    if (activeFilters.value[key]) return
    activeFilters.value[key] = null
  }

  function handleFilterClear(key: string) {
    delete activeFilters.value[key]
  }

  function isFilterSelected(key: string): boolean {
    return key in activeFilters.value
  }

  function getFilterValue(key: string): string | undefined {
    return activeFilters.value[key] ?? undefined
  }

  function getStageBadgeClass(stage: OrderStage): string {
    switch (stage) {
      case 'Order approval':
        return 'bg-teal-50 text-teal-700 border-teal-200'
      case 'Sample file':
        return 'bg-teal-50 text-teal-700 border-teal-200'
      case 'Sample production':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'Production files':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'In production':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'Quality control':
        return 'bg-teal-50 text-teal-700 border-teal-200'
      case 'Shipping':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return ''
    }
  }

  function getFlagColor(flag: OrderFlag): string {
    switch (flag) {
      case 'M':
        return 'bg-purple-100 text-purple-700'
      case 'R':
        return 'bg-rose-100 text-rose-700'
      case 'S':
        return 'bg-sky-100 text-sky-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit'
    }).format(date)
  }

  function isToday(dateStr: string): boolean {
    const date = new Date(dateStr)
    const today = new Date()
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    )
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const columns: ColumnDef<Order>[] = [
    {
      id: 'select',
      header: ({ table }) =>
        h(Checkbox, {
          modelValue:
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate'),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
            table.toggleAllPageRowsSelected(!!value),
          ariaLabel: 'Select all'
        }),
      cell: ({ row }) =>
        h(Checkbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
          ariaLabel: 'Select row'
        }),
      enableSorting: false,
      enableHiding: false,
      size: 40
    },
    {
      accessorKey: 'orderId',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Order ID' }),
      cell: ({ row }) => {
        const order = row.original
        const children = [h('span', { class: 'font-medium text-[#1D1816]' }, order.orderId)]
        if (order.flags?.length) {
          order.flags.forEach(flag => {
            children.push(
              h(
                'span',
                {
                  class: cn(
                    'ml-1 inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold',
                    getFlagColor(flag)
                  )
                },
                flag
              )
            )
          })
        }
        return h('div', { class: 'flex items-center gap-0.5' }, children)
      },
      size: 140
    },
    {
      accessorKey: 'merchant',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Merchant' }),
      cell: ({ row }) => h('span', { class: 'text-[#564943]' }, row.getValue('merchant') as string)
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Customer' }),
      cell: ({ row }) => h('span', { class: 'text-[#564943]' }, row.getValue('customer') as string)
    },
    {
      accessorKey: 'qty',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'QTY' }),
      cell: ({ row }) => h('span', { class: 'text-[#564943]' }, String(row.getValue('qty'))),
      size: 70
    },
    {
      accessorKey: 'stage',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Stage' }),
      cell: ({ row }) => {
        const stage = row.getValue('stage') as OrderStage
        return h(
          'span',
          {
            class: cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
              getStageBadgeClass(stage)
            )
          },
          stage
        )
      },
      size: 160
    },
    {
      accessorKey: 'currentStep',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Current Step' }),
      cell: ({ row }) =>
        h('span', { class: 'text-[#564943] text-xs' }, row.getValue('currentStep') as string)
    },
    {
      accessorKey: 'sinceAction',
      header: 'Since Action',
      cell: ({ row }) =>
        h('span', { class: 'text-[#726159] text-xs' }, row.getValue('sinceAction') as string),
      size: 100
    },
    {
      accessorKey: 'factory',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Factory' }),
      cell: ({ row }) =>
        h('span', { class: 'text-[#564943] text-xs' }, row.getValue('factory') as string)
    },
    {
      accessorKey: 'orderDate',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Order Date' }),
      cell: ({ row }) =>
        h(
          'span',
          { class: 'text-[#726159] text-xs whitespace-nowrap' },
          formatDate(row.getValue('orderDate') as string)
        ),
      size: 100
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Due Date' }),
      cell: ({ row }) => {
        const dateStr = row.getValue('dueDate') as string
        if (isToday(dateStr)) {
          return h('span', { class: 'text-red-600 text-xs font-medium' }, 'Today')
        }
        return h('span', { class: 'text-[#726159] text-xs whitespace-nowrap' }, formatDate(dateStr))
      },
      size: 100
    },
    {
      accessorKey: 'estShipping',
      header: 'Est. Shipping',
      cell: ({ row }) =>
        h(
          'span',
          { class: 'text-[#726159] text-xs whitespace-nowrap' },
          formatDate(row.getValue('estShipping') as string)
        ),
      size: 110
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) =>
        h(
          'span',
          { class: 'text-[#564943] text-xs font-mono' },
          row.getValue('reference') as string
        ),
      size: 130
    },
    {
      accessorKey: 'invoiceStatus',
      header: 'Invoice Status',
      cell: ({ row }) => {
        const status = row.getValue('invoiceStatus') as string
        return h('span', { class: 'text-[#564943] text-xs' }, status)
      },
      size: 110
    },
    {
      accessorKey: 'administrator',
      header: 'Administrator',
      cell: ({ row }) => {
        const admin = row.original.administrator
        return h('div', { class: 'flex items-center gap-1.5' }, [
          h(
            Avatar,
            { class: 'size-6' },
            {
              default: () =>
                h(AvatarFallback, { class: 'text-[10px]' }, () => getInitials(admin.name))
            }
          ),
          h('span', { class: 'text-[#564943] text-xs whitespace-nowrap' }, admin.name)
        ])
      },
      size: 160
    },
    {
      accessorKey: 'comments',
      header: 'Comments',
      cell: ({ row }) => {
        const count = row.getValue('comments') as number
        if (count === 0) return h('span', { class: 'text-[#726159] text-xs' }, '-')
        return h('div', { class: 'flex items-center gap-1 text-[#564943]' }, [
          h(MessageSquare, { class: 'size-3.5' }),
          h('span', { class: 'text-xs' }, String(count))
        ])
      },
      size: 90
    }
  ]

  function handleRowClick(order: Order) {
    router.push(`/orders/${order.id}`)
  }
</script>

<template>
  <div class="space-y-0">
    <!-- Page header -->
    <PageHeader title="Orders">
      <template #actions>
        <div class="relative">
          <Search class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#726159]" />
          <Input placeholder="Search..." class="w-56 pl-9" />
        </div>
        <Button variant="outline">
          <Download class="size-4" />
          Export order data
        </Button>
        <Button variant="primary">
          <Plus class="size-4" />
          Create order
        </Button>
      </template>
    </PageHeader>

    <!-- Tab bar -->
    <div class="flex h-12 items-center border-b border-border px-2">
      <!-- Tab group -->
      <div class="flex items-center gap-1">
        <TabViewItem :active="activeTab === 'all'" @click="activeTab = 'all'">
          All orders
          <span class="ml-1 text-xs text-foreground-tertiary">{{ orders.length }}</span>
        </TabViewItem>
        <TabViewItem
          :active="activeTab === 'invoice'"
          editable
          indicator-color="#6366f1"
          @click="activeTab = 'invoice'"
        >
          Invoice dashboard
          <template #edit>
            <ViewPopover view-name="Invoice dashboard" color="#6366f1">
              <button type="button" class="cursor-pointer">
                <PenLine class="size-3.5 text-foreground-tertiary hover:text-foreground" />
              </button>
            </ViewPopover>
          </template>
        </TabViewItem>
        <TabViewItem
          :active="activeTab === 'factory'"
          editable
          indicator-color="#ef4444"
          @click="activeTab = 'factory'"
        >
          Mark to factory
          <template #edit>
            <ViewPopover view-name="Mark to factory" color="#ef4444">
              <button type="button" class="cursor-pointer">
                <PenLine class="size-3.5 text-foreground-tertiary hover:text-foreground" />
              </button>
            </ViewPopover>
          </template>
        </TabViewItem>
      </div>

      <!-- Divider -->
      <div class="mx-2 h-8 w-px bg-border" />

      <!-- Save view -->
      <ViewPopover>
        <Button variant="ghost">Save view</Button>
      </ViewPopover>
    </div>

    <!-- Filter bar -->
    <div class="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
      <div class="flex flex-wrap items-center gap-2">
        <FilterSelectionInput
          v-for="filter in filters"
          :key="filter.key"
          :label="filter.label"
          :icon="filter.icon"
          :selected="isFilterSelected(filter.key)"
          :value="getFilterValue(filter.key)"
          :type="isFilterSelected(filter.key) ? 'chip' : 'dropdown'"
          @click="handleFilterClick(filter.key)"
          @clear="handleFilterClear(filter.key)"
        />
      </div>
      <div class="flex shrink-0 items-center gap-3">
        <span class="text-sm text-foreground-tertiary">{{ filteredOrders.length }} orders</span>
        <FilterSelectionInput label="Columns" :icon="Columns3" />
      </div>
    </div>

    <!-- Orders table -->
    <DataTable :columns="columns as any" :data="filteredOrders" @row-click="handleRowClick" />
  </div>
</template>
