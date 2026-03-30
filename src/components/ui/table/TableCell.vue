<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      class?: HTMLAttributes['class']
      width?: 44 | 128 | 180
    }>(),
    {
      width: 180
    }
  )
</script>

<template>
  <td
    :class="
      cn(
        'relative border-b bg-white px-3 py-2 align-middle transition-colors group-hover/row:bg-background hover:bg-muted focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-ring focus-within:rounded-[var(--radius)] [&:has([role=checkbox])]:px-2 [&>[role=checkbox]]:translate-y-0.5',
        props.class
      )
    "
    :style="{ minWidth: `${props.width}px` }"
  >
    <slot />
  </td>
</template>
