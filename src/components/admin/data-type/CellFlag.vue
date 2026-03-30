<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    flag: string
    colorMap?: Record<string, string>
    class?: HTMLAttributes['class']
  }>()

  const defaultColorMap: Record<string, string> = {
    M: 'bg-purple-100 text-purple-700',
    R: 'bg-rose-100 text-rose-700',
    S: 'bg-sky-100 text-sky-700'
  }

  const colorClass = computed(() => {
    const map = props.colorMap ?? defaultColorMap
    return map[props.flag] ?? 'bg-gray-100 text-gray-600'
  })
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold',
        colorClass,
        props.class
      )
    "
  >
    {{ flag }}
  </span>
</template>
