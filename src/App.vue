<script setup lang="ts">
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
    Package,
    PenLine,
    ShoppingBag,
    Building2,
    Users
  } from 'lucide-vue-next'
  import {
    AdminLayout,
    SheetContent,
    SheetHeader,
    SidebarNav,
    type NavSection
  } from '@/components/admin'
  import { Button } from '@/components/ui/button'
  import { Toaster } from '@/components/ui/sonner'
  import type { ComputedRef } from 'vue'
  import { inject, computed } from 'vue'
  import { useSheet } from '@/composables/useSheet'

  const { sheets, visibleSheets, hiddenCount, close } = useSheet()
  const isStackedSheets = inject<ComputedRef<boolean>>(
    'is-stacked-sheets',
    computed(() => false)
  )
  const sheetTransition = computed(() => (isStackedSheets.value ? 'sheet-swap' : 'sheet'))

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
  <AdminLayout>
    <template #sidebar>
      <SidebarNav :sections="navSections" user-name="Samar Muhammad" user-email="sm@custimoo.com" />
    </template>
    <RouterView />
    <template #sheets>
      <TransitionGroup :name="sheetTransition">
        <SheetContent v-for="(sheet, index) in visibleSheets" :key="sheet.id">
          <SheetHeader
            show-minimize
            show-fullscreen
            @minimize="close(sheet.id)"
            @close="close(sheet.id)"
          >
            <template #leading>
              <span
                v-if="hiddenCount > 0 && index === 0"
                class="mr-1 text-xs text-muted-foreground"
              >
                {{ sheets.length - hiddenCount }} of {{ sheets.length }}
              </span>
              <Button variant="default" size="icon">
                <Ellipsis />
              </Button>
              <Button variant="default" size="icon">
                <Bell />
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
  </AdminLayout>
  <Toaster />
</template>

<style>
  /* Sheet enter: slide in from right with width expansion */
  .sheet-enter-from,
  .sheet-leave-to {
    width: 0 !important;
    margin-left: 0 !important;
    opacity: 0;
    border-color: transparent !important;
  }

  .sheet-enter-active {
    transition:
      width 350ms cubic-bezier(0.16, 1, 0.3, 1),
      margin-left 350ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 250ms ease 80ms,
      border-color 200ms ease 80ms;
    overflow: hidden !important;
  }

  /* Sheet leave: quick fade then smooth collapse */
  .sheet-leave-active {
    transition:
      width 280ms cubic-bezier(0.4, 0, 0.2, 1) 40ms,
      margin-left 280ms cubic-bezier(0.4, 0, 0.2, 1) 40ms,
      opacity 140ms ease,
      border-color 140ms ease;
    overflow: hidden !important;
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
</style>
