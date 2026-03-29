<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed, provide, ref } from 'vue'
  import { useMediaQuery } from '@vueuse/core'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const collapsed = ref(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const sidebarCollapsed = computed(() => isMobile.value || collapsed.value)

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  provide('sidebar-collapsed', sidebarCollapsed)
  provide('toggle-collapsed', toggleCollapsed)
</script>

<template>
  <div :class="cn('flex h-screen overflow-hidden bg-background', props.class)">
    <!-- Sidebar -->
    <aside
      :class="
        cn(
          'flex shrink-0 flex-col bg-background transition-[width] duration-200 ease-in-out',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )
      "
    >
      <slot name="sidebar" />
    </aside>

    <!-- Main area -->
    <div class="flex flex-1 flex-col overflow-hidden pt-2 pr-2 pb-2">
      <!-- Content row: page + future sheets -->
      <div class="flex min-h-0 flex-1 gap-2">
        <main class="min-w-0 flex-1 overflow-y-auto rounded-xl border border-border bg-card shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.03)]">
          <slot />
        </main>
        <!-- Sheets slot: sheets stack horizontally as flex siblings -->
        <slot name="sheets" />
      </div>
    </div>
  </div>
</template>
