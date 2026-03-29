<script setup lang="ts">
  import {
    CalendarDays,
    ClipboardList,
    Factory,
    Grid2x2,
    LayoutDashboard,
    Package,
    PenLine,
    Settings,
    ShoppingBag,
    Tag,
    Building2,
    DollarSign,
    Users
  } from 'lucide-vue-next'
  import { AdminLayout, SidebarNav, type NavSection } from '@/components/admin'
  import { Toaster } from '@/components/ui/sonner'

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
      <SidebarNav
        :sections="navSections"
        user-name="Samar Muhammad"
        user-email="sm@custimoo.com"
      />
    </template>
    <RouterView />
  </AdminLayout>
  <Toaster />
</template>
