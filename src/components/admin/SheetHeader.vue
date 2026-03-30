<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { X } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const emit = defineEmits<{
    close: []
  }>()
</script>

<template>
  <div
    :class="
      cn('flex h-16 shrink-0 items-center justify-between border-b border-border px-4', props.class)
    "
  >
    <!-- Leading actions -->
    <div class="flex items-center gap-1.5">
      <slot name="leading" />
    </div>

    <!-- Trailing actions: custom slot + close -->
    <div class="flex items-center">
      <slot name="trailing" />
      <Button variant="ghost" size="icon" @click="emit('close')">
        <X />
      </Button>
    </div>
  </div>
</template>
