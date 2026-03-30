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
  import { useSheet } from '@/composables/useSheet'

  const { sheets, close } = useSheet()

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
      <SheetContent v-for="sheet in sheets" :key="sheet.id">
        <SheetHeader
          show-minimize
          show-fullscreen
          @minimize="close(sheet.id)"
          @close="close(sheet.id)"
        >
          <template #leading>
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
    </template>
  </AdminLayout>
  <Toaster />
</template>
