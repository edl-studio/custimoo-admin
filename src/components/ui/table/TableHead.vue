<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
    width?: number
  }>()
</script>

<template>
  <th
    :class="
      cn(
        'group/th h-10 border-b bg-white px-3 text-left align-middle text-xs font-semibold text-foreground-tertiary [&:has([role=checkbox])]:px-2 [&>[role=checkbox]]:translate-y-0.5',
        props.class
      )
    "
    :style="props.width ? { width: `${props.width}px` } : undefined"
  >
    <slot />
  </th>
</template>
