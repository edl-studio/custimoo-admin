<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { PenLine } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
  import { type ViewColor, VIEW_COLOR_BG, VIEW_COLOR_BORDER } from '@/lib/view-colors'

  const props = defineProps<{
    active?: boolean
    editable?: boolean
    indicatorColor?: ViewColor
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <div
    role="button"
    tabindex="0"
    :class="
      cn('relative flex h-12 cursor-pointer flex-col items-start justify-center py-2', props.class)
    "
  >
    <div
      :class="
        cn(
          'flex h-8 items-center gap-2 rounded-md px-3 transition-colors',
          active ? 'hover:bg-accent' : 'hover:bg-accent'
        )
      "
    >
      <!-- Color indicator dot -->
      <span
        v-if="indicatorColor"
        :class="
          cn(
            'size-2 shrink-0 rounded-full border',
            VIEW_COLOR_BG[indicatorColor],
            VIEW_COLOR_BORDER[indicatorColor]
          )
        "
      />

      <!-- Label -->
      <span
        :class="
          cn(
            'whitespace-nowrap text-sm font-medium',
            active ? 'text-foreground' : 'text-foreground-tertiary'
          )
        "
      >
        <slot />
      </span>

      <!-- Edit icon (active only) -->
      <span v-if="active && editable" class="shrink-0" @click.stop>
        <slot name="edit">
          <PenLine class="size-3.5 text-foreground-tertiary" />
        </slot>
      </span>
    </div>

    <!-- Active underline -->
    <span
      v-if="active"
      :class="
        cn(
          'absolute inset-x-3 bottom-0 h-0.5 rounded-full',
          indicatorColor ? VIEW_COLOR_BG[indicatorColor] : 'bg-primary'
        )
      "
    />
  </div>
</template>
