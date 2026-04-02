<script setup lang="ts">
  import { ref } from 'vue'
  import { ClipboardCheck, Files, LayoutList, Shirt } from 'lucide-vue-next'
  import OrderSheetSidebar from './OrderSheetSidebar.vue'
  import type { OrderSheetTab } from './OrderSheetSidebar.vue'

  const activeTab = ref('details')

  const tabs: OrderSheetTab[] = [
    { id: 'details', icon: LayoutList, label: 'Order details' },
    { id: 'products', icon: Shirt, label: 'Products' },
    { id: 'files', icon: Files, label: 'Files' },
    { id: 'tasks', icon: ClipboardCheck, label: 'Tasks' }
  ]
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <!-- Optional inline banner -->
    <slot name="banner" />

    <!-- Order header (factory, title, stage timeline) -->
    <slot name="header" />

    <!-- 2-column body: scrollable content + fixed sidebar -->
    <div class="flex min-h-0 flex-1">
      <div class="flex-1 overflow-y-auto">
        <slot :name="activeTab" />
        <slot name="content" :active-tab="activeTab" />
      </div>
      <OrderSheetSidebar v-model:active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>
</template>
