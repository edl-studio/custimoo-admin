<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ButtonVariants } from '@/components/ui/button'
  import { Button } from '@/components/ui/button'
  import AdminTooltip from '@/components/admin/AdminTooltip.vue'
  import { cn } from '@/lib/utils'

  const props = defineProps<{
    variant?: ButtonVariants['variant']
    label: string
    class?: HTMLAttributes['class']
  }>()
</script>

<template>
  <AdminTooltip :label="label">
    <Button :variant="variant" :class="cn('w-8 px-0 @xl:w-auto @xl:px-3', props.class)">
      <slot />
      <span class="sr-only @xl:not-sr-only">{{ label }}</span>
    </Button>
  </AdminTooltip>
</template>
