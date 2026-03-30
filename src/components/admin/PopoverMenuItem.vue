<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { Check, GripVertical } from 'lucide-vue-next'
  import { Checkbox } from '@/components/ui/checkbox'
  import { cn } from '@/lib/utils'

  interface Props {
    /** Text label */
    label: string
    /** Optional leading icon component */
    icon?: Component
    /** Custom classes for the leading icon (e.g. colored priority icons) */
    iconClass?: HTMLAttributes['class']
    /** Show drag grip handle */
    draggable?: boolean
    /** Show a checkbox on the trailing side — use with v-model:checked */
    checked?: boolean
    /** Show a checkmark on the trailing side (single-select indicator) */
    selected?: boolean
    /** Count badge displayed before trailing checkbox/checkmark */
    count?: number
    /** Disable interaction */
    disabled?: boolean
    /** Variant */
    variant?: 'default' | 'destructive'
    /** Additional CSS classes */
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    checked: undefined,
    selected: undefined,
    draggable: false,
    variant: 'default'
  })

  const emit = defineEmits<{
    click: []
    'update:checked': [value: boolean]
  }>()

  function onCheckToggle(val: boolean | 'indeterminate') {
    emit('update:checked', val === true)
  }
</script>

<template>
  <div
    :class="
      cn(
        'flex h-9 items-center gap-2 rounded-md px-3 text-sm',
        'transition-colors',
        variant === 'destructive'
          ? 'text-destructive hover:bg-secondary cursor-pointer'
          : 'text-foreground hover:bg-secondary',
        disabled && 'pointer-events-none opacity-50',
        !draggable && !disabled && 'cursor-pointer',
        props.class
      )
    "
    role="button"
    @click="emit('click')"
  >
    <!-- Drag handle -->
    <GripVertical
      v-if="draggable"
      class="size-3.5 shrink-0 cursor-grab text-foreground-tertiary active:cursor-grabbing"
    />

    <!-- Leading slot (for avatars or custom content) -->
    <slot name="leading">
      <!-- Leading icon (fallback when no leading slot) -->
      <component
        :is="icon"
        v-if="icon"
        :class="
          cn(
            'size-3.5 shrink-0',
            iconClass ??
              (variant === 'destructive' ? 'text-destructive' : 'text-foreground-tertiary')
          )
        "
      />
    </slot>

    <!-- Label -->
    <span class="flex-1 truncate">{{ label }}</span>

    <!-- Trailing slot (for custom content) -->
    <slot name="trailing" />

    <!-- Count -->
    <span v-if="count != null" class="shrink-0 text-xs tabular-nums text-foreground-tertiary">
      {{ count }}
    </span>

    <!-- Checkbox (multi-select) -->
    <Checkbox
      v-if="checked != null"
      :model-value="checked"
      @update:model-value="onCheckToggle"
      @click.stop
    />

    <!-- Checkmark (single-select) -->
    <Check
      v-else-if="selected != null"
      :class="cn('size-4 shrink-0', selected ? 'text-primary' : 'text-transparent')"
    />
  </div>
</template>
