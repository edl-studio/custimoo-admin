<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { CircleAlert } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  defineProps<{
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <div
    :class="
      cn(
        'flex shrink-0 items-center gap-3 px-4 py-4',
        'bg-[hsl(var(--destructive)/0.06)]',
        $props.class
      )
    "
  >
    <CircleAlert class="size-[18px] shrink-0 text-destructive" />
    <div class="flex flex-1 items-center justify-between gap-3">
      <div class="min-w-0">
        <slot />
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
