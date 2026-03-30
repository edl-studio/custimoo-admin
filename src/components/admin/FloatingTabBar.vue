<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  defineProps<{
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <div :class="cn('fixed bottom-0 right-2 z-40 flex items-end gap-0.5', $attrs.class as string)">
    <slot />
  </div>
</template>
