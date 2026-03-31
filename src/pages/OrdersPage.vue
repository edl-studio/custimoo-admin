<script setup lang="ts">
  import { computed, h, ref } from 'vue'
  import type { ColumnDef } from '@tanstack/vue-table'
  import {
    Building2,
    Calendar,
    CalendarClock,
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
    Clock,
    Tag,
    User
  } from 'lucide-vue-next'
  import {
    ChecklistPopover,
    ColumnPopover,
    DatePresetPopover,
    FilterBar,
    GroupByPopover,
    PageHeader,
    ResponsiveButton,
    DataTable,
    DataTableColumnHeader,
    TabViewItem,
    ViewPopover,
    FilterChip,
    TextInput,
    CellText,
    CellIconText,
    CellAssignee,
    CellComments,
    CellDate,
    OrderTypeBadge,
    StageBadge
  } from '@/components/admin'
  import type {
    ChecklistOption,
    ColumnItem,
    DatePresetOption,
    FilterDef,
    GroupByOption
  } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Checkbox } from '@/components/ui/checkbox'
  import { useOrders } from '@/composables/useOrders'
  import { useSheet } from '@/composables/useSheet'
  import type { Order, OrderStage, OrderType } from '@/data/mock-orders'

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

  const filters: FilterDef[] = [
    { key: 'group', label: 'Group', icon: LayoutGrid },
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
  const groupBy = ref<string | null>(null)
  const selectedStages = ref<string[]>([])
  const selectedInvoiceStatuses = ref<string[]>([])
  const selectedOrderTypes = ref<string[]>([])
  const selectedFlags = ref<string[]>([])
  const orderCreationPreset = ref<string | null>(null)
  const dueDatePreset = ref<string | null>(null)
  const selectedRoles = ref<string[]>([])
  const selectedCustomers = ref<string[]>([])
  const selectedMerchants = ref<string[]>([])

  const groupByOptions: GroupByOption[] = [
    { key: 'status', label: 'Status' },
    { key: 'stage', label: 'Stage' },
    { key: 'orderType', label: 'Order type' },
    { key: 'dueDate', label: 'Due date' }
  ]

  const allStages: OrderStage[] = [
    'Order approval',
    'Sample file',
    'Sample production',
    'Production files',
    'In production',
    'Quality control',
    'Shipping',
    'Completed'
  ]

  const stageDotColor: Record<OrderStage, string> = {
    'Order approval': 'bg-blue-500',
    'Sample file': 'bg-cyan-500',
    'Sample production': 'bg-pink-500',
    'Production files': 'bg-indigo-500',
    'In production': 'bg-fuchsia-500',
    'Quality control': 'bg-orange-500',
    Shipping: 'bg-amber-500',
    Completed: 'bg-teal-500'
  }

  const stageOptions = computed<ChecklistOption[]>(() =>
    allStages.map(stage => ({
      key: stage,
      label: stage,
      count: orders.value.filter(o => o.stage === stage).length
    }))
  )

  const allInvoiceStatuses = ['Draft', 'Pending', 'Invoiced', 'Paid'] as const

  const invoiceStatusDotColor: Record<string, string> = {
    Draft: 'bg-gray-400',
    Pending: 'bg-amber-500',
    Invoiced: 'bg-blue-500',
    Paid: 'bg-teal-500'
  }

  const invoiceStatusOptions = computed<ChecklistOption[]>(() =>
    allInvoiceStatuses.map(status => ({
      key: status,
      label: status,
      count: orders.value.filter(o => o.invoiceStatus === status).length
    }))
  )

  const allOrderTypes: { key: OrderType; label: string }[] = [
    { key: 'split', label: 'Split order' },
    { key: 'reorder', label: 'Reorder' },
    { key: 'sample', label: 'Sample order' },
    { key: 'manual', label: 'Manual order' },
    { key: 'remake', label: 'Remake' }
  ]

  const orderTypeDotColor: Record<OrderType, string> = {
    split: 'bg-[#725E59]',
    reorder: 'bg-[#047857]',
    sample: 'bg-[#C2410C]',
    manual: 'bg-[#4338CA]',
    remake: 'bg-[#B91C1C]'
  }

  const orderTypeOptions = computed<ChecklistOption[]>(() =>
    allOrderTypes.map(({ key, label }) => ({
      key,
      label,
      count: orders.value.filter(o => o.orderType === key).length
    }))
  )

  const flagOptions: ChecklistOption[] = [
    { key: 'flagged', label: 'Flagged' },
    { key: 'unflagged', label: 'Unflagged' }
  ]

  const orderCreationPresets: DatePresetOption[] = [
    { key: 'today', label: 'Today', icon: Calendar, iconClass: 'text-orange-500' },
    { key: 'thisWeek', label: 'This week', icon: Calendar, iconClass: 'text-foreground-tertiary' },
    {
      key: 'thisMonth',
      label: 'This month',
      icon: Calendar,
      iconClass: 'text-foreground-tertiary'
    },
    { key: 'lastMonth', label: 'Last month', icon: Calendar, iconClass: 'text-foreground-tertiary' }
  ]

  const dueDatePresets: DatePresetOption[] = [
    { key: 'overdue', label: 'Overdue', icon: Calendar, iconClass: 'text-destructive' },
    { key: 'today', label: 'Today', icon: Calendar, iconClass: 'text-orange-500' },
    { key: 'thisWeek', label: 'This week', icon: Calendar, iconClass: 'text-foreground-tertiary' },
    { key: 'thisMonth', label: 'This month', icon: Calendar, iconClass: 'text-foreground-tertiary' }
  ]

  const roleOptions: ChecklistOption[] = [
    { key: 'administrator', label: 'Administrator' },
    { key: 'merchant', label: 'Merchant' },
    { key: 'factory', label: 'Factory' }
  ]

  const customerOptions = computed<ChecklistOption[]>(() => {
    const counts = new Map<string, number>()
    for (const o of orders.value) {
      counts.set(o.customer, (counts.get(o.customer) ?? 0) + 1)
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ key: name, label: name, count }))
  })

  const merchantOptions = computed<ChecklistOption[]>(() => {
    const counts = new Map<string, number>()
    for (const o of orders.value) {
      counts.set(o.merchant, (counts.get(o.merchant) ?? 0) + 1)
    }
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ key: name, label: name, count }))
  })

  // Column visibility / ordering for ColumnPopover
  const columnItems: ColumnItem[] = [
    { id: 'orderId', label: 'Order ID' },
    { id: 'merchant', label: 'Merchant' },
    { id: 'customer', label: 'Customer' },
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
      cell: ({ row }) => h(CellAssignee, { name: row.getValue('customer') as string }),
      meta: { interactive: true }
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
        h(
          CellIconText,
          { color: 'tertiary' },
          {
            icon: () => h(Clock, { class: 'size-4 shrink-0' }),
            default: () => row.getValue('sinceAction') as string
          }
        ),
      size: 100
    },
    {
      accessorKey: 'factory',
      header: ({ column }) => h(DataTableColumnHeader as any, { column, title: 'Factory' }),
      cell: ({ row }) =>
        h(
          CellIconText,
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
    <div class="sticky top-0 z-10 bg-card">
      <!-- Page header -->
      <PageHeader title="Orders">
        <template #actions>
          <TextInput v-model="searchQuery" placeholder="Search" size="sm" class="w-56">
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
            indicator-color="indigo"
            @click="activeTab = 'invoice'"
          >
            Invoice dashboard
            <template #edit>
              <ViewPopover view-name="Invoice dashboard" color="indigo">
                <button type="button" class="cursor-pointer">
                  <PenLine class="size-3.5 text-foreground-tertiary hover:text-foreground" />
                </button>
              </ViewPopover>
            </template>
          </TabViewItem>
          <TabViewItem
            :active="activeTab === 'factory'"
            editable
            indicator-color="red"
            @click="activeTab = 'factory'"
          >
            Mark to factory
            <template #edit>
              <ViewPopover view-name="Mark to factory" color="red">
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
        <FilterBar
          :filters="filters"
          :active-filters="activeFilters"
          @filter-click="handleFilterClick"
          @filter-clear="handleFilterClear"
        >
          <template #filter-content="{ filterKey }">
            <GroupByPopover
              v-if="filterKey === 'group'"
              :options="groupByOptions"
              v-model="groupBy"
            />
            <ChecklistPopover
              v-else-if="filterKey === 'stage'"
              :options="stageOptions"
              v-model="selectedStages"
            >
              <template #leading="{ option }">
                <span
                  :class="[
                    'size-2.5 shrink-0 rounded-full',
                    stageDotColor[option.key as OrderStage]
                  ]"
                />
              </template>
            </ChecklistPopover>
            <ChecklistPopover
              v-else-if="filterKey === 'invoiceStatus'"
              :options="invoiceStatusOptions"
              v-model="selectedInvoiceStatuses"
            >
              <template #leading="{ option }">
                <span
                  :class="['size-2.5 shrink-0 rounded-full', invoiceStatusDotColor[option.key]]"
                />
              </template>
            </ChecklistPopover>
            <ChecklistPopover
              v-else-if="filterKey === 'orderType'"
              :options="orderTypeOptions"
              v-model="selectedOrderTypes"
            >
              <template #leading="{ option }">
                <span
                  :class="[
                    'size-2.5 shrink-0 rounded-full',
                    orderTypeDotColor[option.key as OrderType]
                  ]"
                />
              </template>
            </ChecklistPopover>
            <DatePresetPopover
              v-else-if="filterKey === 'orderCreation'"
              :options="orderCreationPresets"
              v-model="orderCreationPreset"
              show-date-range
            />
            <DatePresetPopover
              v-else-if="filterKey === 'dueDate'"
              :options="dueDatePresets"
              v-model="dueDatePreset"
              show-date-range
            />
            <ChecklistPopover
              v-else-if="filterKey === 'role'"
              :options="roleOptions"
              v-model="selectedRoles"
            />
            <ChecklistPopover
              v-else-if="filterKey === 'customer'"
              :options="customerOptions"
              v-model="selectedCustomers"
              searchable
            />
            <ChecklistPopover
              v-else-if="filterKey === 'merchant'"
              :options="merchantOptions"
              v-model="selectedMerchants"
              searchable
            />
            <ChecklistPopover
              v-else-if="filterKey === 'flag'"
              :options="flagOptions"
              v-model="selectedFlags"
            />
          </template>
        </FilterBar>
        <div class="flex shrink-0 items-center gap-3">
          <span class="text-sm text-foreground-tertiary">{{ filteredOrders.length }} orders</span>
          <ColumnPopover
            :columns="columnItems"
            v-model:visible-ids="visibleColumnIds"
            v-model:order="columnOrder"
            @restore-default="restoreDefaultColumns"
          >
            <FilterChip label="Columns" :icon="Columns3" />
          </ColumnPopover>
        </div>
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
