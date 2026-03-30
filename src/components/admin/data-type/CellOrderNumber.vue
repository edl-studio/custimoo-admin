<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Hash } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    value: string | number
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1 text-foreground-secondary', props.class)">
    <Hash class="size-4 text-foreground-tertiary" />
    <span class="text-sm">{{ value }}</span>
  </span>
</template>
