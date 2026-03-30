<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      color?: 'primary' | 'secondary' | 'tertiary'
      weight?: 'regular' | 'medium'
      size?: 'sm' | 'base'
      mono?: boolean
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
        {
          'text-foreground': color === 'primary',
          'text-foreground-secondary': color === 'secondary',
          'text-foreground-tertiary': color === 'tertiary',
          'font-medium': weight === 'medium',
          'text-xs': size === 'sm',
          'text-sm': size === 'base',
          'font-mono': mono,
          truncate: truncate
        },
        props.class
      )
    "
  >
    <slot />
  </span>
</template>
