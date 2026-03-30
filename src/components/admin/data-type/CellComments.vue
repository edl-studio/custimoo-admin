<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { MessageSquare } from 'lucide-vue-next'
  import CellText from './CellText.vue'
  import CellIconText from './CellIconText.vue'

  withDefaults(
    defineProps<{
      count: number
      emptyDisplay?: string
      class?: HTMLAttributes['class']
    }>(),
    {
      emptyDisplay: '-'
    }
  )
</script>

<template>
  <CellText v-if="count === 0" color="tertiary" :class="$props.class">
    {{ emptyDisplay }}
  </CellText>
  <CellIconText v-else color="secondary" weight="medium" :class="$props.class">
    <template #icon>
      <MessageSquare class="size-4" />
    </template>
    {{ count }}
  </CellIconText>
</template>
