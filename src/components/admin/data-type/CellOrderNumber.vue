<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Hash } from 'lucide-vue-next'
  import CellIconText from './CellIconText.vue'

  defineProps<{
    value: string | number
    color?: 'primary' | 'secondary' | 'tertiary'
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <CellIconText :color="color ?? 'secondary'" :class="$props.class">
    <template #icon>
      <Hash class="size-4 shrink-0 text-foreground-tertiary" />
    </template>
    {{ value }}
  </CellIconText>
</template>
