<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { GripVertical } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    fullscreen?: boolean
    draggable?: boolean
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <aside
    :class="
      cn(
        'group/sheet relative flex shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card',
        'shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.03)]',
        'ml-2',
        fullscreen ? 'w-full' : 'w-[480px]',
        props.class
      )
    "
  >
    <GripVertical
      v-if="draggable"
      class="pointer-events-none absolute top-1 left-1/2 z-10 size-3 -translate-x-1/2 rotate-90 text-muted-foreground opacity-0 transition-opacity group-hover/sheet:opacity-100"
    />
    <slot />
  </aside>
</template>
