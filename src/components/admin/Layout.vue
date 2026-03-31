<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed, provide, ref, watch } from 'vue'
  import { useElementSize, useMediaQuery } from '@vueuse/core'
  import { cn } from '@/lib/utils'
  import { useSheet } from '@/composables/useSheet'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const collapsed = ref(false)
  const isCompact = useMediaQuery('(max-width: 1024px)')

  const sidebarCollapsed = computed(() => isCompact.value || collapsed.value)

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  const SHEET_WIDTH = 488 // 480px + 8px margin
  const MIN_MAIN_WIDTH = 480

  const contentRowRef = ref<HTMLElement | null>(null)
  const { width: contentRowWidth } = useElementSize(contentRowRef)

  const sheetsCapacity = computed(() => {
    if (contentRowWidth.value <= 0) return 4
    return Math.max(1, Math.floor((contentRowWidth.value - MIN_MAIN_WIDTH) / SHEET_WIDTH))
  })

  const isStackedSheets = computed(() => sheetsCapacity.value <= 1)

  const { setMaxVisible } = useSheet()
  watch(
    sheetsCapacity,
    cap => {
      setMaxVisible(cap)
    },
    { immediate: true }
  )

  provide('sidebar-collapsed', sidebarCollapsed)
  provide('toggle-collapsed', toggleCollapsed)
  provide('is-stacked-sheets', isStackedSheets)
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
      <!-- Content row: page + sheets -->
      <div ref="contentRowRef" class="flex min-h-0 flex-1">
        <main
          class="min-w-0 flex-1 overflow-y-auto rounded-xl border border-border bg-card shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.03)] transition-[flex-basis] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          <slot />
        </main>
        <!-- Sheets slot: sheets stack horizontally as flex siblings -->
        <slot name="sheets" />
      </div>
    </div>
  </div>
</template>
