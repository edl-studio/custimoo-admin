<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    stage: string
    colorMap?: Record<string, string>
    class?: HTMLAttributes['class']
  }>()

  const defaultColorMap: Record<string, string> = {
    'Order approval': 'bg-teal-50 text-teal-700 border-teal-200',
    'Sample file': 'bg-teal-50 text-teal-700 border-teal-200',
    'Sample production': 'bg-orange-100 text-orange-700 border-orange-200',
    'Production files': 'bg-blue-100 text-blue-700 border-blue-200',
    'In production': 'bg-amber-100 text-amber-700 border-amber-200',
    'Quality control': 'bg-teal-50 text-teal-700 border-teal-200',
    Shipping: 'bg-green-100 text-green-700 border-green-200',
    Completed: 'bg-green-100 text-green-700 border-green-200'
  }

  const colorClass = computed(() => {
    const map = props.colorMap ?? defaultColorMap
    return map[props.stage] ?? ''
  })
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        colorClass,
        props.class
      )
    "
  >
    {{ stage }}
  </span>
</template>
