<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Minus, Maximize2, Minimize2, X } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    isFullscreen?: boolean
    showMinimize?: boolean
    showFullscreen?: boolean
    class?: HTMLAttributes['class']
  }>()

  const emit = defineEmits<{
    minimize: []
    'toggle-fullscreen': []
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

    <!-- Trailing actions: minimize, fullscreen, close -->
    <div class="flex items-center">
      <Button v-if="showMinimize" variant="ghost" size="icon" @click="emit('minimize')">
        <Minus />
      </Button>
      <Button v-if="showFullscreen" variant="ghost" size="icon" @click="emit('toggle-fullscreen')">
        <Maximize2 v-if="!isFullscreen" />
        <Minimize2 v-else />
      </Button>
      <Button variant="ghost" size="icon" @click="emit('close')">
        <X />
      </Button>
    </div>
  </div>
</template>
