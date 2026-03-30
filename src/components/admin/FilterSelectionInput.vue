<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { ChevronDown, X } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  interface Props {
    /** Label text shown on the chip */
    label: string
    /** Optional selected value displayed after the label */
    value?: string
    /** Whether the filter is actively selected / has a value */
    selected?: boolean
    /**
     * Trailing element type:
     * - 'dropdown': chevron down (default for unselected)
     * - 'chip': × close button (default for selected)
     * - 'badge': count badge
     */
    type?: 'dropdown' | 'chip'
    /** Count badge number — overrides trailing to show a badge */
    count?: number
    /** Optional leading icon component */
    icon?: Component
    /** Additional CSS classes */
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    selected: false,
    type: 'dropdown'
  })

  const emit = defineEmits<{
    click: []
    clear: []
  }>()

  const displayText = computed(() => {
    if (props.value) {
      return `${props.label} (${props.value})`
    }
    return props.label
  })

  const showBadge = computed(() => props.count != null && props.count > 0)
  const showClose = computed(() => !showBadge.value && props.selected && props.type === 'chip')
  const showChevron = computed(
    () => !showBadge.value && !showClose.value && props.type === 'dropdown'
  )
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2.5 text-sm font-medium',
        'shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        selected ? 'bg-secondary text-foreground' : 'bg-card text-foreground hover:bg-secondary',
        props.class
      )
    "
    @click="emit('click')"
  >
    <component
      :is="icon"
      v-if="icon"
      :class="cn('size-3.5 shrink-0', selected ? 'text-primary' : 'text-foreground-secondary')"
    />

    <span>{{ displayText }}</span>

    <!-- Count badge -->
    <span
      v-if="showBadge"
      class="inline-flex min-w-4 items-center justify-center rounded-md bg-primary px-1 py-0.5 text-[10px] font-bold leading-[1.1] text-primary-foreground shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.05)]"
    >
      {{ count }}
    </span>

    <!-- Close button (chip type, selected) -->
    <X
      v-else-if="showClose"
      class="size-3.5 shrink-0 text-foreground-secondary"
      @click.stop="emit('clear')"
    />

    <!-- Chevron (dropdown type) -->
    <ChevronDown v-else-if="showChevron" class="size-3.5 shrink-0 text-foreground-secondary" />
  </button>
</template>
