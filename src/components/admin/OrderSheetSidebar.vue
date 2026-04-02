<script setup lang="ts">
  import type { Component } from 'vue'
  import { cn } from '@/lib/utils'

  export interface OrderSheetTab {
    id: string
    icon: Component
    label: string
  }

  const props = defineProps<{
    tabs: OrderSheetTab[]
    activeTab: string
  }>()

  const emit = defineEmits<{
    'update:activeTab': [id: string]
  }>()
</script>

<template>
  <nav class="flex w-8 shrink-0 flex-col items-center gap-1 py-1">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      :title="tab.label"
      :class="
        cn(
          'flex size-6 items-center justify-center rounded-lg transition-colors',
          activeTab === tab.id
            ? 'bg-muted text-foreground'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        )
      "
      @click="emit('update:activeTab', tab.id)"
    >
      <component :is="tab.icon" class="size-3.5" />
    </button>
  </nav>
</template>
