<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      date: string
      highlightToday?: boolean
      class?: HTMLAttributes['class']
    }>(),
    {
      highlightToday: false
    }
  )

  const isToday = computed(() => {
    const d = new Date(props.date)
    const today = new Date()
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    )
  })

  const formatted = computed(() => {
    const d = new Date(props.date)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit'
    }).format(d)
  })
</script>

<template>
  <span
    v-if="highlightToday && isToday"
    :class="cn('text-sm font-medium text-destructive whitespace-nowrap', props.class)"
  >
    Today
  </span>
  <span v-else :class="cn('text-sm text-foreground-tertiary whitespace-nowrap', props.class)">
    {{ formatted }}
  </span>
</template>
