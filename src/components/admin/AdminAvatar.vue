<script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { cn } from '@/lib/utils'

  type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

  const props = withDefaults(
    defineProps<{
      name: string
      size?: AvatarSize
      icon?: Component
      logoUrl?: string
      class?: HTMLAttributes['class']
    }>(),
    {
      size: 'sm'
    }
  )

  const LETTER_COLORS: Record<string, string> = {
    A: '#14A892',
    B: '#E8632B',
    C: '#2ABFA4',
    D: '#6B7280',
    E: '#EAB308',
    F: '#22C55E',
    G: '#3B82F6',
    H: '#14B8A6',
    I: '#6366F1',
    J: '#F59E0B',
    K: '#8B5CF6',
    L: '#EC4899',
    M: '#F97316',
    N: '#64748B',
    O: '#A3A3A3',
    P: '#EF4444',
    Q: '#78716C',
    R: '#DC2626',
    S: '#0EA5E9',
    T: '#7C3AED',
    U: '#2563EB',
    V: '#E11D48',
    W: '#DB2777',
    X: '#CA8A04',
    Y: '#EA580C',
    Z: '#059669'
  }

  const SIZE_CLASSES: Record<AvatarSize, string> = {
    xs: 'size-4 rounded-[6px] text-[7px] leading-none',
    sm: 'size-5 rounded-[6px] text-[10px] leading-5',
    md: 'size-6 rounded-lg text-xs leading-5',
    lg: 'size-8 rounded-[10px] text-sm leading-5'
  }

  const ICON_SIZES: Record<AvatarSize, string> = {
    xs: 'size-2.5',
    sm: 'size-3',
    md: 'size-3.5',
    lg: 'size-4'
  }

  const initials = computed(() =>
    props.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  )

  const bgColor = computed(() => {
    if (props.icon || props.logoUrl) return '#000000'
    const letter = initials.value?.[0] ?? 'A'
    return LETTER_COLORS[letter] ?? LETTER_COLORS.A
  })
</script>

<template>
  <div
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden border font-medium text-white shadow-[inset_0_2px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.05)]',
        SIZE_CLASSES[size],
        props.class
      )
    "
    :style="{ backgroundColor: bgColor, borderColor: bgColor }"
  >
    <img v-if="logoUrl" :src="logoUrl" :alt="name" class="size-full object-cover" />
    <component v-else-if="icon" :is="icon" :class="cn('text-white', ICON_SIZES[size])" />
    <span v-else>{{ initials }}</span>
  </div>
</template>
