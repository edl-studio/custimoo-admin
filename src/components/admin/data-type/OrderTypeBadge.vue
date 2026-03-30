<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { Split, Repeat2 } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  export type OrderType = 'split' | 'reorder' | 'sample' | 'manual' | 'remake'

  const props = defineProps<{
    type: OrderType
    class?: HTMLAttributes['class']
  }>()

  const config = computed(() => {
    switch (props.type) {
      case 'split':
        return { bg: 'bg-[#EDE7DE]', icon: Split, iconClass: 'text-[#725E59]' }
      case 'reorder':
        return { bg: 'bg-[#D1FAE5]', icon: Repeat2, iconClass: 'text-[#047857]' }
      case 'sample':
        return { bg: 'bg-[#FFEDD5]', label: 'S', textClass: 'text-[#C2410C]' }
      case 'manual':
        return { bg: 'bg-[#E0E7FF]', label: 'M', textClass: 'text-[#4338CA]' }
      case 'remake':
        return { bg: 'bg-[#FEE2E2]', label: 'R', textClass: 'text-[#B91C1C]' }
      default:
        return { bg: 'bg-[#EDE7DE]', label: '?', textClass: 'text-[#725E59]' }
    }
  })
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex size-[18px] items-center justify-center rounded-[4px] p-px',
        config.bg,
        props.class
      )
    "
  >
    <component
      v-if="'icon' in config"
      :is="config.icon"
      :class="cn('size-4', config.iconClass)"
      :stroke-width="2.5"
    />
    <span v-else :class="cn('text-xs leading-4 font-medium', config.textClass)">
      {{ config.label }}
    </span>
  </span>
</template>
