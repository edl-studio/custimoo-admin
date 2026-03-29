<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { PanelLeft } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  defineProps<{
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex size-7 items-center justify-center rounded-md text-foreground-tertiary transition-colors hover:bg-accent hover:text-foreground',
        $props.class
      )
    "
  >
    <PanelLeft class="size-4" />
  </button>
</template>
