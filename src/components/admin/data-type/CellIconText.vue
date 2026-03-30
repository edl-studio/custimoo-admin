<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      color?: 'primary' | 'secondary' | 'tertiary'
      weight?: 'regular' | 'medium'
      size?: 'sm' | 'base'
      truncate?: boolean
      class?: HTMLAttributes['class']
    }>(),
    {
      color: 'secondary',
      weight: 'regular',
      size: 'base',
      truncate: true
    }
  )
</script>

<template>
  <span
    :class="
      cn(
        'flex items-center gap-2',
        {
          'text-foreground': color === 'primary',
          'text-foreground-secondary': color === 'secondary',
          'text-foreground-tertiary': color === 'tertiary',
          'font-medium': weight === 'medium',
          'text-xs': size === 'sm',
          'text-sm': size === 'base'
        },
        props.class
      )
    "
  >
    <slot name="icon" />
    <span :class="{ truncate: truncate }">
      <slot />
    </span>
  </span>
</template>
