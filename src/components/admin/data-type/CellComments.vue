<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { MessageSquare } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      count: number
      emptyDisplay?: string
      class?: HTMLAttributes['class']
    }>(),
    {
      emptyDisplay: '-'
    }
  )
</script>

<template>
  <span v-if="count === 0" :class="cn('text-sm text-foreground-tertiary', props.class)">
    {{ emptyDisplay }}
  </span>
  <span v-else :class="cn('flex items-center gap-1.5 text-foreground-secondary', props.class)">
    <MessageSquare class="size-4" />
    <span class="text-sm font-medium">{{ count }}</span>
  </span>
</template>
