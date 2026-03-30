<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { computed } from 'vue'
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      name: string
      avatarUrl?: string
      showYouTag?: boolean
      class?: HTMLAttributes['class']
    }>(),
    {
      showYouTag: false
    }
  )

  const initials = computed(() =>
    props.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  )
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1.5', props.class)">
    <Avatar class="size-5">
      <AvatarImage v-if="avatarUrl" :src="avatarUrl" :alt="name" />
      <AvatarFallback class="text-[9px]">{{ initials }}</AvatarFallback>
    </Avatar>
    <span class="truncate text-sm text-foreground">{{ name }}</span>
    <span v-if="showYouTag" class="text-sm text-foreground-tertiary">(You)</span>
  </span>
</template>
