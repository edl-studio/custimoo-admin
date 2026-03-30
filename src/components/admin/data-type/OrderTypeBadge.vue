<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { Split, Repeat2 } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
  import AdminTooltip from '@/components/admin/AdminTooltip.vue'

  export type OrderType = 'split' | 'reorder' | 'sample' | 'manual' | 'remake'

  const props = defineProps<{
    type: OrderType
    class?: HTMLAttributes['class']
  }>()

  const config = computed(() => {
    switch (props.type) {
      case 'split':
        return {
          bg: 'bg-[#EDE7DE]',
          border: 'border-[#D8CCC0]',
          icon: Split,
          iconClass: 'text-[#725E59]',
          iconSize: 'size-3',
          tooltip: 'Split order'
        }
      case 'reorder':
        return {
          bg: 'bg-[#D1FAE5]',
          border: 'border-[#A7F3D0]',
          icon: Repeat2,
          iconClass: 'text-[#047857]',
          iconSize: 'size-4',
          tooltip: 'Reorder'
        }
      case 'sample':
        return {
          bg: 'bg-[#FFEDD5]',
          border: 'border-[#FED7AA]',
          label: 'S',
          textClass: 'text-[#C2410C]',
          tooltip: 'Sample order'
        }
      case 'manual':
        return {
          bg: 'bg-[#E0E7FF]',
          border: 'border-[#C7D2FE]',
          label: 'M',
          textClass: 'text-[#4338CA]',
          tooltip: 'Manual order'
        }
      case 'remake':
        return {
          bg: 'bg-[#FEE2E2]',
          border: 'border-[#FECACA]',
          label: 'R',
          textClass: 'text-[#B91C1C]',
          tooltip: 'Remake'
        }
      default:
        return {
          bg: 'bg-[#EDE7DE]',
          border: 'border-[#D8CCC0]',
          label: '?',
          textClass: 'text-[#725E59]',
          tooltip: 'Unknown'
        }
    }
  })
</script>

<template>
  <AdminTooltip :label="config.tooltip">
    <span
      :class="
        cn(
          'inline-flex size-[18px] select-none items-center justify-center rounded-[4px] border shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_1px_2px_rgba(0,0,0,0.05)]',
          config.bg,
          config.border,
          props.class
        )
      "
    >
      <component
        v-if="'icon' in config"
        :is="config.icon"
        :class="cn(config.iconSize, config.iconClass)"
        :stroke-width="2.5"
      />
      <span v-else :class="cn('text-xs leading-4 font-medium', config.textClass)">
        {{ config.label }}
      </span>
    </span>
  </AdminTooltip>
</template>
