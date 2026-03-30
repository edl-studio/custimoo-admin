<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Hash, X } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    id: string
    label: string
    flagColor?: string
    class?: HTMLAttributes['class']
  }>()

  const emit = defineEmits<{
    click: []
    close: []
  }>()
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'group relative flex h-11 w-60 shrink-0 cursor-pointer items-center gap-1 overflow-hidden',
        'rounded-t-lg border border-b-0 border-border bg-muted',
        'shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.06),0_0_6px_rgba(0,0,0,0.02)]',
        'pl-2 pr-3 py-1 hover:bg-controls-hover hover:pr-1',
        'transition-colors duration-150',
        props.class
      )
    "
    @click="emit('click')"
  >
    <!-- Flag bar (optional, for orders) -->
    <div
      v-if="flagColor"
      class="absolute left-0 top-0 h-full w-1"
      :style="{ backgroundColor: flagColor }"
    />

    <!-- Icon slot -->
    <div class="flex size-6 shrink-0 items-center justify-center">
      <slot name="icon" />
    </div>

    <!-- Content -->
    <div class="flex min-w-0 flex-1 items-center gap-0.5">
      <div class="flex shrink-0 items-center gap-0.5">
        <Hash class="size-3 text-foreground-tertiary" />
        <span class="text-sm text-foreground-tertiary">{{ id }}</span>
      </div>
      <span class="truncate text-sm font-medium text-foreground">{{ label }}</span>
    </div>

    <!-- Close button (visible on hover) -->
    <div class="hidden shrink-0 group-hover:flex" @click.stop="emit('close')">
      <div class="flex size-8 items-center justify-center rounded-lg hover:bg-accent">
        <X class="size-4 text-foreground-tertiary" />
      </div>
    </div>
  </button>
</template>
