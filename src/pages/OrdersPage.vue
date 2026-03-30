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
    PenLine,
    Plus,
    FileText,
    Search,
    ShieldCheck,
    Tag,
    User
  } from 'lucide-vue-next'
  import {
    ColumnPopover,
    PageHeader,
    DataTable,
    DataTableColumnHeader,
    TabViewItem,
    ViewPopover,
    FilterSelectionInput,
    TextInput,
    CellText,
    CellAssignee,
    CellComments,
    CellDate,
    CellFlag,
    StageBadge
  } from '@/components/admin'
  import type { ColumnItem } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Checkbox } from '@/components/ui/checkbox'
  import { useOrders } from '@/composables/useOrders'
  import type { Order } from '@/data/mock-orders'
  import type { OrderStage } from '@/data/mock-orders'

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

  // Column visibility / ordering for ColumnPopover
  const columnItems: ColumnItem[] = [
    { id: 'orderId', label: 'Order ID' },
    { id: 'merchant', label: 'Merchant' },
    { id: 'customer', label: 'Customer' },
    { id: 'qty', label: 'Quantity' },
    { id: 'stage', label: 'Stage' },
    { id: 'currentStep', label: 'Current Step' },
    { id: 'sinceAction', label: 'Since action' },
    { id: 'factory', label: 'Factory' },
    { id: 'orderDate', label: 'Order date' },
    { id: 'dueDate', label: 'Due date' },
    { id: 'estShipping', label: 'Est. Shipping' },
    { id: 'reference', label: 'Reference' },
    { id: 'invoiceStatus', label: 'Invoice status' },
    { id: 'administrator', label: 'Administrator' },
    { id: 'comments', label: 'Comments' }
  ]
  const defaultColumnIds = columnItems.map(c => c.id)
  const visibleColumnIds = ref([...defaultColumnIds])
  const columnOrder = ref([...defaultColumnIds])

  function restoreDefaultColumns() {
    visibleColumnIds.value = [...defaultColumnIds]
    columnOrder.value = [...defaultColumnIds]
  }

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
        const children = [h(CellText, { color: 'primary', weight: 'medium' }, () => order.orderId)]
        if (order.flags?.length) {
          order.flags.forEach(flag => {
            children.push(h(CellFlag, { flag, class: 'ml-1' }))
          })
        }
        return h('div', { class: 'flex items-center gap-0.5' }, children)
      },
      size: 140
    },
    {
      accessorKey: 'merchant',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Merchant' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary' }, () => row.getValue('merchant') as string)
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Customer' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary' }, () => row.getValue('customer') as string)
    },
    {
      accessorKey: 'qty',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'QTY' }),
      cell: ({ row }) => h(CellText, { color: 'secondary' }, () => String(row.getValue('qty'))),
      size: 70
    },
    {
      accessorKey: 'stage',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Stage' }),
      cell: ({ row }) => h(StageBadge, { stage: row.getValue('stage') as OrderStage }),
      size: 160
    },
    {
      accessorKey: 'currentStep',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Current Step' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary', size: 'sm' }, () => row.getValue('currentStep') as string)
    },
    {
      accessorKey: 'sinceAction',
      header: 'Since Action',
      cell: ({ row }) =>
        h(CellText, { color: 'tertiary', size: 'sm' }, () => row.getValue('sinceAction') as string),
      size: 100
    },
    {
      accessorKey: 'factory',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Factory' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary', size: 'sm' }, () => row.getValue('factory') as string)
    },
    {
      accessorKey: 'orderDate',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Order Date' }),
      cell: ({ row }) => h(CellDate, { date: row.getValue('orderDate') as string }),
      size: 100
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Due Date' }),
      cell: ({ row }) =>
        h(CellDate, { date: row.getValue('dueDate') as string, highlightToday: true }),
      size: 100
    },
    {
      accessorKey: 'estShipping',
      header: 'Est. Shipping',
      cell: ({ row }) => h(CellDate, { date: row.getValue('estShipping') as string }),
      size: 110
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) =>
        h(
          CellText,
          { color: 'secondary', size: 'sm', mono: true },
          () => row.getValue('reference') as string
        ),
      size: 130
    },
    {
      accessorKey: 'invoiceStatus',
      header: 'Invoice Status',
      cell: ({ row }) =>
        h(
          CellText,
          { color: 'secondary', size: 'sm' },
          () => row.getValue('invoiceStatus') as string
        ),
      size: 110
    },
    {
      accessorKey: 'administrator',
      header: 'Administrator',
      cell: ({ row }) => h(CellAssignee, { name: row.original.administrator.name }),
      size: 160
    },
    {
      accessorKey: 'comments',
      header: 'Comments',
      cell: ({ row }) => h(CellComments, { count: row.getValue('comments') as number }),
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
        <TextInput v-model="searchQuery" placeholder="Search" size="compact" class="w-56">
          <template #icon>
            <Search class="size-4 text-muted-foreground" />
          </template>
        </TextInput>
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
        <ColumnPopover
          :columns="columnItems"
          v-model:visible-ids="visibleColumnIds"
          v-model:order="columnOrder"
          @restore-default="restoreDefaultColumns"
        >
          <FilterSelectionInput label="Columns" :icon="Columns3" />
        </ColumnPopover>
      </div>
    </div>

    <!-- Orders table -->
    <div class="p-6">
      <DataTable :columns="columns as any" :data="filteredOrders" @row-click="handleRowClick" />
    </div>
  </div>
</template>
