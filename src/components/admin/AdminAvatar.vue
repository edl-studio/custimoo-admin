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

  const LETTER_CLASSES: Record<string, string> = {
    A: 'bg-avatar-a border-avatar-a',
    B: 'bg-avatar-b border-avatar-b',
    C: 'bg-avatar-c border-avatar-c',
    D: 'bg-avatar-d border-avatar-d',
    E: 'bg-avatar-e border-avatar-e',
    F: 'bg-avatar-f border-avatar-f',
    G: 'bg-avatar-g border-avatar-g',
    H: 'bg-avatar-h border-avatar-h',
    I: 'bg-avatar-i border-avatar-i',
    J: 'bg-avatar-j border-avatar-j',
    K: 'bg-avatar-k border-avatar-k',
    L: 'bg-avatar-l border-avatar-l',
    M: 'bg-avatar-m border-avatar-m',
    N: 'bg-avatar-n border-avatar-n',
    O: 'bg-avatar-o border-avatar-o',
    P: 'bg-avatar-p border-avatar-p',
    Q: 'bg-avatar-q border-avatar-q',
    R: 'bg-avatar-r border-avatar-r',
    S: 'bg-avatar-s border-avatar-s',
    T: 'bg-avatar-t border-avatar-t',
    U: 'bg-avatar-u border-avatar-u',
    V: 'bg-avatar-v border-avatar-v',
    W: 'bg-avatar-w border-avatar-w',
    X: 'bg-avatar-x border-avatar-x',
    Y: 'bg-avatar-y border-avatar-y',
    Z: 'bg-avatar-z border-avatar-z'
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

  const colorClass = computed(() => {
    if (props.icon || props.logoUrl) return 'bg-black border-black'
    const letter = initials.value?.[0] ?? 'A'
    return LETTER_CLASSES[letter] ?? LETTER_CLASSES.A
  })
</script>

<template>
  <div
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden border font-medium text-content-primary-inverse shadow-[inset_0_2px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.05)]',
        SIZE_CLASSES[size],
        colorClass,
        props.class
      )
    "
  >
    <img v-if="logoUrl" :src="logoUrl" :alt="name" class="size-full object-cover" />
    <component
      v-else-if="icon"
      :is="icon"
      :class="cn('text-content-primary-inverse', ICON_SIZES[size])"
    />
    <span v-else>{{ initials }}</span>
  </div>
</template>
