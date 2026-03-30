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
    Misc: 'bg-gray-100 text-gray-700 border-gray-200',
    Quote: 'bg-violet-100 text-violet-700 border-violet-200',
    'Order approval': 'bg-blue-100 text-blue-700 border-blue-200',
    'Sample production': 'bg-pink-100 text-pink-700 border-pink-200',
    'Sample file': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Production files': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'In production': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    'Quality control': 'bg-orange-100 text-orange-700 border-orange-200',
    Shipping: 'bg-amber-100 text-amber-700 border-amber-200',
    Completed: 'bg-teal-50 text-teal-700 border-teal-200'
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
        'inline-flex items-center h-6 rounded-[0.5rem] border px-2 text-sm leading-none font-normal whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_2px_white]',
        colorClass,
        props.class
      )
    "
  >
    {{ stage }}
  </span>
</template>
