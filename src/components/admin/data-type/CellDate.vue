<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { CalendarDays } from 'lucide-vue-next'
  import CellIconText from './CellIconText.vue'

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
  <CellIconText
    v-if="highlightToday && isToday"
    color="primary"
    weight="medium"
    :class="['text-destructive whitespace-nowrap', $props.class]"
  >
    <template #icon>
      <CalendarDays class="size-4 shrink-0" />
    </template>
    Today
  </CellIconText>
  <CellIconText v-else color="tertiary" :class="['whitespace-nowrap', $props.class]">
    <template #icon>
      <CalendarDays class="size-4 shrink-0" />
    </template>
    {{ formatted }}
  </CellIconText>
</template>
