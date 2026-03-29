<script lang="ts" setup>
  import type { HTMLAttributes } from 'vue'
  import type { ButtonGroupVariants } from '.'
  import { cn } from '@/lib/utils'
  import { buttonGroupVariants } from '.'

  const props = defineProps<{
    class?: HTMLAttributes['class']
    orientation?: ButtonGroupVariants['orientation']
  }>()

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
    (e: 'focusin', event: FocusEvent): void
    (e: 'focusout', event: FocusEvent): void
  }>()
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :class="cn(buttonGroupVariants({ orientation: props.orientation }), props.class)"
    @click="emit('click', $event)"
    @focusin="emit('focusin', $event)"
    @focusout="emit('focusout', $event)"
  >
    <slot />
  </div>
</template>
