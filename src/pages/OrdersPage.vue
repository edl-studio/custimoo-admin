<script setup lang="ts">
  import { computed, h, ref } from 'vue'
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
    ResponsiveButton,
    DataTable,
    DataTableColumnHeader,
    TabViewItem,
    ViewPopover,
    FilterSelectionInput,
    TextInput,
    CellText,
    CellTextIcon,
    CellAssignee,
    CellComments,
    CellDate,
    OrderTypeBadge,
    StageBadge
  } from '@/components/admin'
  import type { ColumnItem } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Checkbox } from '@/components/ui/checkbox'
  import { useOrders } from '@/composables/useOrders'
  import { useSheet } from '@/composables/useSheet'
  import type { Order, OrderStage } from '@/data/mock-orders'

  const { orders } = useOrders()
  const { open: openSheet, isOpen: isSheetOpen } = useSheet()

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
    { id: 'sinceAction', label: 'Since action' },
    { id: 'factory', label: 'Factory' },
    { id: 'orderDate', label: 'Order date' },
    { id: 'dueDate', label: 'Due date' },
    { id: 'estShipping', label: 'Est. shipping' },
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
      size: 44,
      meta: { cellWidth: 44 }
    },
    {
      accessorKey: 'orderId',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Order ID' }),
      cell: ({ row }) => {
        const order = row.original
        const badges = []
        if (order.orderType) {
          badges.push(h(OrderTypeBadge, { type: order.orderType }))
        }
        return h('div', { class: 'flex items-center justify-between gap-1' }, [
          h(CellText, { color: 'primary', weight: 'medium' }, () => order.orderId),
          badges.length > 0 ? h('div', { class: 'flex items-center gap-1' }, badges) : null
        ])
      },
      size: 140,
      meta: { opensSheet: true }
    },
    {
      accessorKey: 'merchant',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Merchant' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary' }, () => row.getValue('merchant') as string),
      meta: { interactive: true }
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Customer' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary' }, () => row.getValue('customer') as string),
      meta: { interactive: true }
    },
    {
      accessorKey: 'qty',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Qty' }),
      cell: ({ row }) => h(CellText, { color: 'secondary' }, () => String(row.getValue('qty'))),
      size: 44
    },
    {
      accessorKey: 'stage',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Stage' }),
      cell: ({ row }) => h(StageBadge, { stage: row.getValue('stage') as OrderStage }),
      size: 160,
      meta: { interactive: true }
    },
    {
      accessorKey: 'sinceAction',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Since action' }),
      cell: ({ row }) =>
        h(CellText, { color: 'tertiary' }, () => row.getValue('sinceAction') as string),
      size: 100
    },
    {
      accessorKey: 'factory',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Factory' }),
      cell: ({ row }) =>
        h(
          CellTextIcon,
          { color: 'secondary' },
          {
            icon: () => h(Building2, { class: 'size-4 shrink-0' }),
            default: () => row.getValue('factory') as string
          }
        ),
      meta: { interactive: true }
    },
    {
      accessorKey: 'orderDate',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Order date' }),
      cell: ({ row }) => h(CellDate, { date: row.getValue('orderDate') as string }),
      size: 100
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Due date' }),
      cell: ({ row }) =>
        h(CellDate, { date: row.getValue('dueDate') as string, highlightToday: true }),
      size: 100,
      meta: { interactive: true }
    },
    {
      accessorKey: 'estShipping',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Est. shipping' }),
      cell: ({ row }) => h(CellDate, { date: row.getValue('estShipping') as string }),
      size: 110,
      meta: { interactive: true }
    },
    {
      accessorKey: 'reference',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Reference' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary', mono: true }, () => row.getValue('reference') as string),
      size: 130
    },
    {
      accessorKey: 'invoiceStatus',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Invoice status' }),
      cell: ({ row }) =>
        h(CellText, { color: 'secondary' }, () => row.getValue('invoiceStatus') as string),
      size: 110,
      meta: { interactive: true }
    },
    {
      accessorKey: 'administrator',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Administrator' }),
      cell: ({ row }) => h(CellAssignee, { name: row.original.administrator.name }),
      size: 160,
      meta: { interactive: true }
    },
    {
      accessorKey: 'comments',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Comments' }),
      cell: ({ row }) => h(CellComments, { count: row.getValue('comments') as number }),
      size: 90,
      meta: { opensSheet: true }
    }
  ]

  function handleRowClick(order: Order) {
    openSheet(order.id, 'order', order)
  }

  function getRowClass(order: Order) {
    return isSheetOpen(order.id) ? 'bg-muted/50' : undefined
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
        <ResponsiveButton variant="outline" label="Export">
          <Download class="size-4" />
        </ResponsiveButton>
        <ResponsiveButton variant="primary" label="Create order">
          <Plus class="size-4" />
        </ResponsiveButton>
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
      <DataTable
        :columns="columns as any"
        :data="filteredOrders"
        :pinned-columns="['select', 'orderId']"
        :row-class="getRowClass"
        @row-click="handleRowClick"
      />
    </div>
  </div>
</template>
