<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      display?: string
      class?: HTMLAttributes['class']
    }>(),
    {
      display: '–'
    }
  )
</script>

<template>
  <span :class="cn('text-sm text-foreground-tertiary', props.class)">{{ display }}</span>
</template>
