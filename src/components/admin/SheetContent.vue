<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    fullscreen?: boolean
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <aside
    :class="
      cn(
        'flex shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card',
        'shadow-[0_1px_3px_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.03)]',
        'ml-2',
        fullscreen ? 'w-full' : 'w-[480px]',
        props.class
      )
    "
  >
    <slot />
  </aside>
</template>
