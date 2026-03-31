<script setup lang="ts">
  import { computed, inject, ref } from 'vue'
  import type { ComputedRef } from 'vue'
  import { useWindowSize } from '@vueuse/core'
  import type { Order } from '@/data/mock-orders'
  import {
    Bell,
    CalendarDays,
    ClipboardList,
    DollarSign,
    Ellipsis,
    Factory,
    Grid2x2,
    LayoutDashboard,
    Minus,
    Moon,
    Package,
    PenLine,
    ShoppingBag,
    Building2,
    Users
  } from 'lucide-vue-next'
  import {
    Layout,
    FloatingTab,
    FloatingTabList,
    FloatingTabBar,
    SheetContent,
    SheetHeader,
    SidebarNav,
    type NavSection
  } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Toaster } from '@/components/ui/sonner'
  import { useSheet } from '@/composables/useSheet'
  import type { SheetState } from '@/composables/useSheet'

  const { visibleSheets, minimizedSheets, canReorder, close, minimize, restore, reorderSheet } =
    useSheet()

  // Drag-and-drop reordering
  const draggingId = ref<string | null>(null)

  function onDragStart(e: DragEvent, id: string) {
    draggingId.value = id
    e.dataTransfer!.effectAllowed = 'move'
    e.dataTransfer!.setData('text/plain', id)
    // Hide default drag ghost
    const ghost = document.createElement('div')
    ghost.style.width = '1px'
    ghost.style.height = '1px'
    ghost.style.opacity = '0'
    document.body.appendChild(ghost)
    e.dataTransfer!.setDragImage(ghost, 0, 0)
    requestAnimationFrame(() => ghost.remove())
  }

  let lastReorderTime = 0
  const REORDER_COOLDOWN = 300

  function onDragOver(e: DragEvent, overId: string) {
    if (!draggingId.value || draggingId.value === overId) return
    const now = Date.now()
    if (now - lastReorderTime < REORDER_COOLDOWN) return
    lastReorderTime = now
    reorderSheet(draggingId.value, overId)
  }

  function onDragEnd() {
    draggingId.value = null
  }

  const isStackedSheets = inject<ComputedRef<boolean>>(
    'is-stacked-sheets',
    computed(() => false)
  )
  const sheetTransition = computed(() => (isStackedSheets.value ? 'sheet-swap' : 'sheet'))

  // Tab bar overflow: ensure min 480px between tab bar left edge and viewport left
  const { width: windowWidth } = useWindowSize()
  const TAB_WIDTH = 240
  const TAB_LIST_WIDTH = 160
  const MIN_LEFT_SPACE = 480
  const TAB_BAR_RIGHT_MARGIN = 8
  const TAB_GAP = 2

  const maxVisibleTabs = computed(() => {
    const available = windowWidth.value - MIN_LEFT_SPACE - TAB_LIST_WIDTH - TAB_BAR_RIGHT_MARGIN
    return Math.max(0, Math.floor(available / (TAB_WIDTH + TAB_GAP)))
  })

  // Tabs shown in the bar (newest first = leftmost); overflow hidden but in "All tabs"
  const barTabs = computed(() => {
    const tabs = minimizedSheets.value.slice(-maxVisibleTabs.value)
    return [...tabs].reverse()
  })

  // "All tabs" dropdown shows ALL minimized sheets
  const tabItems = computed(() =>
    minimizedSheets.value.map(s => {
      const order = s.data as Order
      return {
        id: order.orderId,
        label: `${order.merchant} - ${order.customer}`
      }
    })
  )

  function getSheetLabel(sheet: SheetState) {
    const order = sheet.data as Order
    return `${order.merchant} - ${order.customer}`
  }

  function getSheetId(sheet: SheetState) {
    const order = sheet.data as Order
    return order.orderId
  }

  function handleTabRestore(id: string) {
    restore(id)
  }

  const navSections: NavSection[] = [
    {
      items: [
        { label: 'Tasks', icon: ClipboardList, to: '/tasks' },
        { label: 'Orders', icon: Package, to: '/orders' },
        { label: 'Calendar', icon: CalendarDays, to: '/calendar' }
      ]
    },
    {
      label: 'Shop',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, to: '/shop/dashboard' },
        { label: 'Factory', icon: Factory, to: '/shop/factory' },
        { label: 'Products', icon: ShoppingBag, to: '/shop/products' }
      ]
    },
    {
      label: 'Tools',
      items: [{ label: 'Drawing sheet', icon: PenLine, to: '/tools/drawing-sheet' }]
    },
    {
      label: 'Admin',
      items: [
        { label: 'Access', icon: Users, to: '/admin/access' },
        { label: 'Categories', icon: Grid2x2, to: '/admin/categories' },
        { label: 'Companies', icon: Building2, to: '/admin/companies' },
        { label: 'Prices', icon: DollarSign, to: '/admin/prices' }
      ]
    }
  ]
</script>

<template>
  <Layout>
    <template #sidebar>
      <SidebarNav :sections="navSections" user-name="Samar Muhammad" user-email="sm@custimoo.com" />
    </template>
    <RouterView />
    <template #sheets>
      <TransitionGroup :name="sheetTransition">
        <SheetContent
          v-for="sheet in visibleSheets"
          :key="sheet.id"
          :draggable="canReorder"
          :class="draggingId === sheet.id && 'opacity-50 scale-[0.98]'"
          class="transition-[opacity,transform] duration-200"
          @dragstart="onDragStart($event, sheet.id)"
          @dragover.prevent="onDragOver($event, sheet.id)"
          @dragend="onDragEnd"
          @drop.prevent="onDragEnd"
        >
          <SheetHeader :draggable="canReorder" @close="close(sheet.id)">
            <template #leading>
              <Button variant="default" size="icon">
                <Ellipsis />
              </Button>
              <Button variant="default" size="icon">
                <Bell />
              </Button>
            </template>
            <template #trailing>
              <Button variant="ghost" size="icon" @click="minimize(sheet.id)">
                <Minus />
              </Button>
            </template>
          </SheetHeader>

          <div class="flex-1 overflow-y-auto p-6">
            <h2 class="text-lg font-semibold text-foreground">
              Order {{ (sheet.data as Order).orderId }}
            </h2>
          </div>
        </SheetContent>
      </TransitionGroup>
    </template>
  </Layout>

  <!-- Floating tab bar (always visible, "All tabs" + minimized tabs) -->
  <FloatingTabBar>
    <TransitionGroup name="tab">
      <FloatingTab
        v-for="sheet in barTabs"
        :key="sheet.id"
        :id="getSheetId(sheet)"
        :label="getSheetLabel(sheet)"
        @click="restore(sheet.id)"
        @close="close(sheet.id)"
      >
        <template #icon>
          <Moon class="size-4 text-primary" />
        </template>
      </FloatingTab>
    </TransitionGroup>

    <FloatingTabList :items="tabItems" @restore="handleTabRestore" @close="close">
      <template #icon>
        <Moon class="size-4 text-primary" />
      </template>
    </FloatingTabList>
  </FloatingTabBar>

  <Toaster />
</template>

<style>
  /* Sheet enter: slide up with subtle scale */
  .sheet-enter-from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  .sheet-enter-active {
    transition:
      opacity 250ms ease,
      transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Sheet leave: slide out to the right */
  .sheet-leave-to {
    transform: translateX(calc(100% + 8px));
    opacity: 0;
  }

  .sheet-leave-active {
    position: absolute;
    z-index: -1;
    transition:
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 120ms ease;
  }

  /* Sibling sheets reposition smoothly */
  .sheet-move {
    transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Stacked mode: fade swap without width animation */
  .sheet-swap-enter-from,
  .sheet-swap-leave-to {
    opacity: 0;
  }

  .sheet-swap-enter-active {
    transition: opacity 200ms ease 40ms;
  }

  .sheet-swap-leave-active {
    transition: opacity 150ms ease;
    position: absolute;
  }

  /* Tab enter/leave animations */
  .tab-enter-from,
  .tab-leave-to {
    width: 0 !important;
    opacity: 0;
    transform: translateY(100%);
  }

  .tab-enter-active {
    transition:
      width 250ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 200ms ease 50ms,
      transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
  }

  .tab-leave-active {
    transition:
      width 200ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 150ms ease,
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .tab-move {
    transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>
