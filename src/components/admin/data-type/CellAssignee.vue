<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import AdminAvatar from '../AdminAvatar.vue'
  import { cn } from '@/lib/utils'

  withDefaults(
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
</script>

<template>
  <span :class="cn('flex items-center gap-1.5', $props.class)">
    <AdminAvatar :name="name" size="sm" />
    <span class="truncate text-sm text-foreground">{{ name }}</span>
    <span v-if="showYouTag" class="text-sm text-foreground-tertiary">(You)</span>
  </span>
</template>
