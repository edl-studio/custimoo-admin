<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    title: string
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <header
    :class="
      cn(
        'flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-4',
        props.class
      )
    "
  >
    <!-- Title -->
    <h1 class="min-w-0 truncate text-xl font-semibold text-foreground">
      {{ title }}
    </h1>

    <!-- Actions slot -->
    <div class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
